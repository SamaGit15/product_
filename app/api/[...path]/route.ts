import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import {
  INITIAL_BLOGS,
  INITIAL_EVENTS,
  INITIAL_GALLERY,
  INITIAL_PORTFOLIO,
  INITIAL_SERVICES,
  INITIAL_SITE_SETTINGS,
  INITIAL_TESTIMONIALS
} from '@/src/data';
import { dbConnect } from '@/src/server/db';
import {
  AdminUser,
  BlogArticle,
  Event,
  GalleryItem,
  Inquiry,
  PortfolioProject,
  Service,
  SiteSettings,
  Testimonial
} from '@/src/server/models';

export const runtime = 'nodejs';

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

type ContentKind =
  | 'service'
  | 'portfolio'
  | 'testimonial'
  | 'blog'
  | 'event'
  | 'gallery';

const sortByNewest = { createdAt: -1 };
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const MAX_CHAT_HISTORY = 12;

const contentConfigs: Record<
  string,
  { Model: any; type: ContentKind; fallback: unknown[] }
> = {
  services: { Model: Service, type: 'service', fallback: INITIAL_SERVICES },
  portfolio: { Model: PortfolioProject, type: 'portfolio', fallback: INITIAL_PORTFOLIO },
  testimonials: { Model: Testimonial, type: 'testimonial', fallback: INITIAL_TESTIMONIALS },
  blogs: { Model: BlogArticle, type: 'blog', fallback: INITIAL_BLOGS },
  events: { Model: Event, type: 'event', fallback: INITIAL_EVENTS },
  gallery: { Model: GalleryItem, type: 'gallery', fallback: INITIAL_GALLERY }
};

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const clean = (value = '') => String(value ?? '').replace(/[<>]/g, '').trim();

const sanitizeTextArray = (value: unknown) =>
  Array.isArray(value) ? value.map((item) => clean(String(item))).filter(Boolean) : [];

const truncate = (value = '', max = 320) => {
  const text = String(value ?? '').trim();
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
};

const getJwtSecret = () => process.env.JWT_SECRET || 'change-this-jwt-secret';

const getDefaultAdmin = () => ({
  name: process.env.DEFAULT_ADMIN_NAME || 'AI-Solutions Admin',
  email: (process.env.DEFAULT_ADMIN_EMAIL || 'admin@aisolutions.com').toLowerCase(),
  password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@12345'
});

const normalizeHistory = (history: unknown) =>
  Array.isArray(history)
    ? history
        .filter(
          (item): item is { role: 'user' | 'assistant'; content: string } =>
            !!item &&
            typeof item === 'object' &&
            'role' in item &&
            'content' in item &&
            (item.role === 'user' || item.role === 'assistant')
        )
        .slice(-MAX_CHAT_HISTORY)
        .map((item) => ({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: truncate(item.content, 4000) }]
        }))
    : [];

const buildInquiryReference = () =>
  `AIS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

async function getPath(context: RouteContext) {
  const params = await context.params;
  return params.path || [];
}

async function ensureDefaultAdmin() {
  await dbConnect();
  const existingAdmin = await AdminUser.findOne().lean();

  if (existingAdmin) {
    return;
  }

  const admin = getDefaultAdmin();
  await AdminUser.create({
    name: admin.name,
    email: admin.email,
    password: await bcrypt.hash(admin.password, 12)
  });
}

function getAdminFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, getJwtSecret()) as { id: string; email: string; name: string };
  } catch {
    return null;
  }
}

function unauthorized(message = 'Authentication required') {
  return json({ message }, 401);
}

function notFound() {
  return json({ message: 'API route not found' }, 404);
}

function validationError(message: string, status = 422) {
  return json({ message }, status);
}

function toContentPayload(body: any, type: ContentKind) {
  switch (type) {
    case 'service':
      return {
        title: clean(body.title),
        description: clean(body.description),
        image: clean(body.image),
        icon: clean(body.icon),
        features: sanitizeTextArray(body.features),
        pricing: clean(body.pricing),
        category: clean(body.category)
      };
    case 'portfolio':
      return {
        title: clean(body.title),
        description: clean(body.description),
        image: clean(body.image),
        tags: sanitizeTextArray(body.tags),
        features: sanitizeTextArray(body.features),
        rating: Number(body.rating) || 0,
        client: clean(body.client),
        year: clean(body.year)
      };
    case 'testimonial':
      return {
        name: clean(body.name),
        role: clean(body.role),
        company: clean(body.company),
        content: clean(body.content),
        rating: Number(body.rating) || 0,
        avatar: clean(body.avatar)
      };
    case 'blog':
      return {
        title: clean(body.title),
        excerpt: clean(body.excerpt),
        content: clean(body.content),
        category: clean(body.category),
        readTime: clean(body.readTime),
        date: clean(body.date),
        author: clean(body.author),
        image: clean(body.image),
        description: clean(body.excerpt || body.description)
      };
    case 'event':
      return {
        title: clean(body.title),
        description: clean(body.description),
        date: clean(body.date),
        time: clean(body.time),
        location: clean(body.location),
        type: clean(body.type),
        image: clean(body.image)
      };
    case 'gallery':
      return {
        title: clean(body.title),
        category: clean(body.category),
        description: clean(body.description),
        date: clean(body.date),
        location: clean(body.location),
        image: clean(body.image)
      };
  }
}

async function getSiteSettingsRecord() {
  await dbConnect();
  const existing = await SiteSettings.findOne().sort(sortByNewest);
  if (existing) {
    return existing;
  }

  return SiteSettings.create({
    ...INITIAL_SITE_SETTINGS,
    footerCopyright:
      INITIAL_SITE_SETTINGS.footerCopyright?.replace('Â©', '(c)') ||
      '(c) 2026 AI-Solutions. Built as a polished AI SaaS demonstration experience.'
  });
}

function dashboardFromInquiries(inquiries: any[]) {
  const statusCounts = { New: 0, 'In Progress': 0, Closed: 0 };
  const countries: Record<string, number> = {};
  const services: Record<string, number> = {};

  inquiries.forEach((inquiry) => {
    statusCounts[inquiry.status as keyof typeof statusCounts] =
      (statusCounts[inquiry.status as keyof typeof statusCounts] || 0) + 1;
    countries[inquiry.country] = (countries[inquiry.country] || 0) + 1;
    if (inquiry.interestedService) {
      services[inquiry.interestedService] = (services[inquiry.interestedService] || 0) + 1;
    }
  });

  return {
    totalInquiries: inquiries.length,
    newInquiries: statusCounts.New || 0,
    inProgressInquiries: statusCounts['In Progress'] || 0,
    closedInquiries: statusCounts.Closed || 0,
    topCountry: Object.entries(countries).sort((a, b) => b[1] - a[1])[0]?.[0] || 'United States',
    mostRequestedService:
      Object.entries(services).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Not captured'
  };
}

async function getSiteCollections() {
  await dbConnect();

  const [services, portfolio, blogs, events, settings] = await Promise.all([
    Service.find().sort(sortByNewest).lean(),
    PortfolioProject.find().sort(sortByNewest).lean(),
    BlogArticle.find().sort(sortByNewest).lean(),
    Event.find().sort(sortByNewest).lean(),
    SiteSettings.findOne().sort(sortByNewest).lean()
  ]);

  return {
    services: services.length ? services : INITIAL_SERVICES,
    portfolio: portfolio.length ? portfolio : INITIAL_PORTFOLIO,
    blogs: blogs.length ? blogs : INITIAL_BLOGS,
    events: events.length ? events : INITIAL_EVENTS,
    settings:
      settings || {
        ...INITIAL_SITE_SETTINGS,
        footerCopyright:
          INITIAL_SITE_SETTINGS.footerCopyright?.replace('Â©', '(c)') ||
          '(c) 2026 AI-Solutions. Built as a polished AI SaaS demonstration experience.'
      }
  };
}

async function buildAssistantInstruction(currentPage = 'home') {
  const { services, portfolio, blogs, events, settings } = await getSiteCollections();

  const serviceSection = services
    .slice(0, 8)
    .map(
      (service: any) => `- ${service.title}
  Category: ${service.category || 'AI Solution'}
  Description: ${truncate(service.description, 240)}
  Pricing: ${service.pricing || 'Contact for pricing'}
  Features: ${(service.features || []).slice(0, 4).join('; ') || 'No feature list available'}`
    )
    .join('\n');

  const portfolioSection = portfolio
    .slice(0, 8)
    .map(
      (project: any) => `- ${project.title}
  Client: ${project.client || 'AI-Solutions Client'}
  Year: ${project.year || 'Recent'}
  Description: ${truncate(project.description, 240)}
  Tags: ${(project.tags || []).join(', ') || 'AI Solution'}
  Benefits: ${(project.features || []).slice(0, 3).join('; ') || 'Business-ready implementation'}`
    )
    .join('\n');

  const blogSection = blogs
    .slice(0, 6)
    .map(
      (blog: any) => `- ${blog.title}
  Category: ${blog.category || 'Insights'}
  Date: ${blog.date || 'Recent'}
  Read time: ${blog.readTime || '5 min read'}
  Author: ${blog.author || 'AI-Solutions Team'}
  Summary: ${truncate(blog.excerpt || blog.description || blog.content, 240)}`
    )
    .join('\n');

  const eventSection = events
    .slice(0, 6)
    .map(
      (event: any) => `- ${event.title}
  Type: ${event.type || 'Event'}
  Date: ${event.date || 'TBA'}
  Time: ${event.time || 'TBA'}
  Location: ${event.location || 'TBA'}
  Summary: ${truncate(event.description, 220)}`
    )
    .join('\n');

  return `You are the AI-Solutions virtual assistant for the public website.

Your job:
- Answer only using the site context provided here and the ongoing conversation.
- Be genuinely helpful for long user paragraphs. First understand the full scenario, then respond with a grounded answer.
- If the user sends a large paragraph, begin with a one-sentence summary of what they need, then give a practical answer.
- When useful, organize the answer with short sections such as "What fits best", "Why", and "Best next step".
- Recommend relevant pages when appropriate: Services, Portfolio, Articles, Events, or Contact.
- If the user's request sounds ready for a project discussion, encourage the Contact page.
- Do not invent capabilities, prices, team details, guarantees, project outcomes, or policies that are not in the provided context.
- If something is outside the known context, say so clearly and offer the closest helpful direction.

Tone:
- Professional, clear, grounded, and conversational.
- Concise, but strong enough to handle detailed business prompts.

Current page: ${currentPage}

Brand:
- Brand name: ${settings.brandName || 'AI-Solutions'}
- Tagline: ${settings.brandTagline || 'Applied Intelligence'}

Contact:
- Headquarters: ${settings.contactAddress || "David Goldman Informatics Centre, University of Sunderland, St Peter's Campus, Sunderland SR6 0DD, United Kingdom."}
- Email: ${settings.contactEmail || 'integrations@ai-solutions.co.uk'}
- Phone: ${settings.contactPhone || '+44 (0)191 515 2000'}
- Contact page office hours label: ${settings.contactTimezone || 'Mon - Fri: 09:00 - 17:00 UK Time'}

Services:
${serviceSection || '- No services available.'}

Portfolio:
${portfolioSection || '- No portfolio projects available.'}

Articles:
${blogSection || '- No articles available.'}

Events:
${eventSection || '- No events available.'}`;
}

async function uploadToCloudinary(file: File, folder: string) {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;

  if (!cloudinaryUrl) {
    throw new Error('CLOUDINARY_URL is not configured.');
  }

  const parsed = new URL(cloudinaryUrl);
  const cloudName = parsed.hostname;
  const apiKey = decodeURIComponent(parsed.username);
  const apiSecret = decodeURIComponent(parsed.password);

  if (parsed.protocol !== 'cloudinary:' || !cloudName || !apiKey || !apiSecret) {
    throw new Error('CLOUDINARY_URL must use the format cloudinary://API_KEY:API_SECRET@CLOUD_NAME');
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const dataUri = `data:${file.type};base64,${base64}`;

  return cloudinary.uploader.upload(dataUri, {
    folder: `ai-solutions/${folder}`,
    resource_type: 'image'
  });
}

async function handlePublicGet(path: string[]) {
  if (path.length === 1 && path[0] === 'health') {
    return json({ ok: true });
  }

  if (
    (path.length === 1 && path[0] === 'site-settings') ||
    (path.length === 2 && path[0] === 'settings' && path[1] === 'site')
  ) {
    return json(await getSiteSettingsRecord());
  }

  const config = path.length === 1 ? contentConfigs[path[0]] : null;
  if (config) {
    await dbConnect();
    const documents = await config.Model.find().sort(sortByNewest).lean();
    return json(documents.length ? documents : config.fallback);
  }

  return notFound();
}

async function handlePublicPost(request: NextRequest, path: string[]) {
  if (path.length === 1 && path[0] === 'inquiries') {
    const body = await request.json();

    if (clean(body.fullName).length < 2) {
      return validationError('Please enter your full name');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(body.email))) {
      return validationError('Please enter a valid email address');
    }
    if (!/^[+\d][\d\s()-]{6,19}$/.test(clean(body.phone))) {
      return validationError('Please enter a valid phone number');
    }
    if (!clean(body.country)) {
      return validationError('Country is required');
    }
    if (clean(body.jobDetails).length < 10) {
      return validationError('Please provide at least 10 characters of job details');
    }

    await dbConnect();
    const inquiry = await Inquiry.create({
      referenceId: buildInquiryReference(),
      fullName: clean(body.fullName),
      email: clean(body.email).toLowerCase(),
      phone: clean(body.phone),
      company: clean(body.company),
      country: clean(body.country),
      jobTitle: clean(body.jobTitle),
      jobDetails: clean(body.jobDetails),
      interestedService: clean(body.interestedService)
    });

    return json(
      {
        id: inquiry._id,
        referenceId: inquiry.referenceId,
        message: 'Your inquiry has been received'
      },
      201
    );
  }

  if (path.length === 2 && path[0] === 'auth' && path[1] === 'login') {
    const body = await request.json();

    if (!clean(body.email) || !clean(body.password)) {
      return validationError('Valid email and password are required');
    }

    await ensureDefaultAdmin();
    const admin = await AdminUser.findOne({ email: clean(body.email).toLowerCase() });
    if (!admin || !(await bcrypt.compare(body.password, admin.password))) {
      return json({ message: 'Invalid email or password' }, 401);
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name },
      getJwtSecret(),
      { expiresIn: '2h' }
    );

    return json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
      expiresIn: 7200
    });
  }

  if (path.length === 2 && path[0] === 'assistant' && path[1] === 'chat') {
    const body = await request.json();
    const message = truncate(clean(body.message), 12000);

    if (!message) {
      return validationError('Message is required');
    }

    if (!process.env.GEMINI_API_KEY) {
      return json({ message: 'Gemini API key is not configured.' }, 503);
    }

    const instruction = await buildAssistantInstruction(clean(body.currentPage || 'home'));
    const contents = [
      ...normalizeHistory(body.history),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        GEMINI_MODEL
      )}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: instruction }]
          },
          contents,
          generationConfig: {
            temperature: 0.35,
            topP: 0.9,
            maxOutputTokens: 900
          }
        })
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API request failed:', errorText);
      return json({ message: 'Gemini API request failed.' }, 502);
    }

    const payload = await geminiResponse.json();
    const reply =
      payload?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part?.text || '')
        .join('')
        .trim() || '';

    if (!reply) {
      return json({ message: 'Gemini did not return a response.' }, 502);
    }

    return json({ reply, model: GEMINI_MODEL });
  }

  return notFound();
}

async function handleAdminGet(request: NextRequest, path: string[]) {
  if (!getAdminFromRequest(request)) {
    return unauthorized();
  }

  await dbConnect();

  if (path.length === 1 && path[0] === 'dashboard') {
    const inquiries = await Inquiry.find().sort(sortByNewest).lean();
    return json(dashboardFromInquiries(inquiries));
  }

  if (path.length === 1 && path[0] === 'inquiries') {
    const filter: Record<string, any> = {};
    const status = request.nextUrl.searchParams.get('status');
    const country = request.nextUrl.searchParams.get('country');
    const service = request.nextUrl.searchParams.get('service');
    const search = request.nextUrl.searchParams.get('search');

    if (status) filter.status = clean(status);
    if (country) filter.country = clean(country);
    if (service) filter.interestedService = clean(service);
    if (search) {
      const term = clean(search);
      filter.$or = ['fullName', 'email', 'company', 'referenceId', 'jobDetails'].map((key) => ({
        [key]: { $regex: term, $options: 'i' }
      }));
    }

    return json(await Inquiry.find(filter).sort(sortByNewest).lean());
  }

  if (
    (path.length === 1 && path[0] === 'site-settings') ||
    (path.length === 2 && path[0] === 'settings' && path[1] === 'site')
  ) {
    return json(await getSiteSettingsRecord());
  }

  const config = path.length === 1 ? contentConfigs[path[0]] : null;
  if (config) {
    return json(await config.Model.find().sort(sortByNewest).lean());
  }

  return notFound();
}

async function handleAdminPost(request: NextRequest, path: string[]) {
  if (!getAdminFromRequest(request)) {
    return unauthorized();
  }

  if (path.length === 2 && path[0] === 'uploads' && path[1] === 'image') {
    const formData = await request.formData();
    const file = formData.get('image');
    const folder = clean(String(formData.get('folder') || 'general')).toLowerCase() || 'general';

    if (!(file instanceof File)) {
      return json({ message: 'Image file is required.' }, 400);
    }

    if (!file.type.startsWith('image/')) {
      return json({ message: 'Only image uploads are allowed.' }, 400);
    }

    if (file.size > 8 * 1024 * 1024) {
      return json({ message: 'Image uploads must be 8MB or smaller.' }, 400);
    }

    const uploaded = await uploadToCloudinary(file, folder);
    return json(
      {
        message: 'Image uploaded successfully.',
        path: uploaded.secure_url,
        filename: uploaded.public_id,
        originalName: file.name
      },
      201
    );
  }

  const config = path.length === 1 ? contentConfigs[path[0]] : null;
  if (config) {
    await dbConnect();
    const body = await request.json();
    const document = await config.Model.create(toContentPayload(body, config.type));
    return json(document, 201);
  }

  return notFound();
}

async function handleAdminPut(request: NextRequest, path: string[]) {
  if (!getAdminFromRequest(request)) {
    return unauthorized();
  }

  await dbConnect();

  if (
    (path.length === 1 && path[0] === 'site-settings') ||
    (path.length === 2 && path[0] === 'settings' && path[1] === 'site')
  ) {
    const body = await request.json();
    const payload = {
      brandName: clean(body.brandName),
      brandTagline: clean(body.brandTagline),
      logoInitials: clean(body.logoInitials).slice(0, 3).toUpperCase(),
      logoImage: clean(body.logoImage),
      footerDescription: clean(body.footerDescription),
      contactHeading: clean(body.contactHeading),
      contactAddress: clean(body.contactAddress),
      contactEmail: clean(body.contactEmail),
      contactPhone: clean(body.contactPhone),
      primaryTimezone: clean(body.primaryTimezone),
      contactTimezone: clean(body.contactTimezone),
      footerCopyright: clean(body.footerCopyright),
      footerCtaLabel: clean(body.footerCtaLabel)
    };

    const existing = await SiteSettings.findOne().sort(sortByNewest);
    const settings = existing
      ? await SiteSettings.findByIdAndUpdate(existing._id, payload, {
          new: true,
          runValidators: true
        })
      : await SiteSettings.create(payload);

    return json(settings);
  }

  const config = path.length === 2 ? contentConfigs[path[0]] : null;
  if (config) {
    const body = await request.json();
    const document = await config.Model.findByIdAndUpdate(
      path[1],
      toContentPayload(body, config.type),
      { new: true, runValidators: true }
    );

    if (!document) {
      return json({ message: `${config.type} item not found` }, 404);
    }

    return json(document);
  }

  return notFound();
}

async function handleAdminPatch(request: NextRequest, path: string[]) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return unauthorized();
  }

  await dbConnect();

  if (path.length === 1 && path[0] === 'password') {
    const body = await request.json();

    if (!clean(body.currentPassword)) {
      return validationError('Current password is required');
    }
    if (clean(body.newPassword).length < 8) {
      return validationError('New password must be at least 8 characters');
    }

    const existingAdmin = await AdminUser.findById(admin.id);
    if (!existingAdmin) {
      return json({ message: 'Admin account not found' }, 404);
    }

    const validPassword = await bcrypt.compare(body.currentPassword, existingAdmin.password);
    if (!validPassword) {
      return json({ message: 'Current password is incorrect' }, 401);
    }

    existingAdmin.password = await bcrypt.hash(body.newPassword, 12);
    await existingAdmin.save();
    return json({ message: 'Password updated successfully.' });
  }

  if (path.length === 3 && path[0] === 'inquiries' && path[2] === 'status') {
    const body = await request.json();
    if (!['New', 'In Progress', 'Closed'].includes(body.status)) {
      return validationError('Invalid inquiry status');
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      path[1],
      { status: body.status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return json({ message: 'Inquiry not found' }, 404);
    }

    return json(inquiry);
  }

  if (path.length === 3 && path[0] === 'inquiries' && path[2] === 'notes') {
    const body = await request.json();
    const inquiry = await Inquiry.findByIdAndUpdate(
      path[1],
      { adminNotes: clean(body.adminNotes) },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return json({ message: 'Inquiry not found' }, 404);
    }

    return json(inquiry);
  }

  return notFound();
}

async function handleAdminDelete(request: NextRequest, path: string[]) {
  if (!getAdminFromRequest(request)) {
    return unauthorized();
  }

  await dbConnect();

  if (path.length === 2 && path[0] === 'inquiries') {
    const inquiry = await Inquiry.findByIdAndDelete(path[1]);
    if (!inquiry) {
      return json({ message: 'Inquiry not found' }, 404);
    }

    return json({ message: 'Inquiry deleted' });
  }

  const config = path.length === 2 ? contentConfigs[path[0]] : null;
  if (config) {
    const document = await config.Model.findByIdAndDelete(path[1]);
    if (!document) {
      return json({ message: `${config.type} item not found` }, 404);
    }

    return json({ message: `${config.type} item deleted` });
  }

  return notFound();
}

async function dispatch(method: string, request: NextRequest, context: RouteContext) {
  try {
    const fullPath = await getPath(context);

    if (!fullPath.length) {
      return notFound();
    }

    if (fullPath[0] === 'admin') {
      const adminPath = fullPath.slice(1);

      if (method === 'GET') return await handleAdminGet(request, adminPath);
      if (method === 'POST') return await handleAdminPost(request, adminPath);
      if (method === 'PUT') return await handleAdminPut(request, adminPath);
      if (method === 'PATCH') return await handleAdminPatch(request, adminPath);
      if (method === 'DELETE') return await handleAdminDelete(request, adminPath);
      return notFound();
    }

    if (method === 'GET') return await handlePublicGet(fullPath);
    if (method === 'POST') return await handlePublicPost(request, fullPath);
    return notFound();
  } catch (error) {
    console.error(error);
    return json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.'
      },
      500
    );
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  return dispatch('GET', request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return dispatch('POST', request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return dispatch('PUT', request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return dispatch('PATCH', request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return dispatch('DELETE', request, context);
}
