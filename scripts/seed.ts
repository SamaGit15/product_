import bcrypt from 'bcryptjs';

import {
  INITIAL_BLOGS,
  INITIAL_EVENTS,
  INITIAL_GALLERY,
  INITIAL_INQUIRIES,
  INITIAL_PORTFOLIO,
  INITIAL_SERVICES,
  INITIAL_SITE_SETTINGS,
  INITIAL_TESTIMONIALS
} from '../src/data';
import { dbConnect } from '../src/server/db';
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
} from '../src/server/models';

async function seed() {
  await dbConnect();

  await Promise.all([
    AdminUser.deleteMany({}),
    Service.deleteMany({}),
    Event.deleteMany({}),
    BlogArticle.deleteMany({}),
    Testimonial.deleteMany({}),
    PortfolioProject.deleteMany({}),
    GalleryItem.deleteMany({}),
    SiteSettings.deleteMany({}),
    Inquiry.deleteMany({})
  ]);

  await AdminUser.create({
    name: process.env.DEFAULT_ADMIN_NAME || 'AI-Solutions Admin',
    email: (process.env.DEFAULT_ADMIN_EMAIL || 'admin@aisolutions.com').toLowerCase(),
    password: await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@12345', 12)
  });

  await Promise.all([
    Service.insertMany(INITIAL_SERVICES),
    Event.insertMany(INITIAL_EVENTS),
    BlogArticle.insertMany(INITIAL_BLOGS),
    Testimonial.insertMany(INITIAL_TESTIMONIALS),
    PortfolioProject.insertMany(INITIAL_PORTFOLIO),
    GalleryItem.insertMany(INITIAL_GALLERY),
    SiteSettings.create({
      ...INITIAL_SITE_SETTINGS,
      footerCopyright:
        INITIAL_SITE_SETTINGS.footerCopyright?.replace('Â©', '(c)') ||
        '(c) 2026 AI-Solutions. Built as a polished AI SaaS demonstration experience.'
    }),
    Inquiry.insertMany(INITIAL_INQUIRIES.map((inquiry, index) => ({
      referenceId: inquiry.referenceId || `AIS-SEED-${index + 1}`,
      fullName: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      company: inquiry.company,
      country: inquiry.country,
      jobTitle: inquiry.jobTitle || '',
      jobDetails: inquiry.message,
      interestedService: inquiry.service,
      status: inquiry.status,
      adminNotes: inquiry.adminNotes || '',
      createdAt: inquiry.createdAt,
      updatedAt: inquiry.createdAt
    })))
  ]);

  console.log(
    `Seed complete. Admin: ${(process.env.DEFAULT_ADMIN_EMAIL || 'admin@aisolutions.com')} / ${
      process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@12345'
    }`
  );
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
