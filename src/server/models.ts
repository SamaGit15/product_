import mongoose, { Schema } from 'mongoose';

const existingModels = mongoose.models as Record<string, any>;

const options = { timestamps: true };
const contentFields = {
  title: { type: String, required: true },
  description: String
};

const inquirySchema = new Schema(
  {
    referenceId: { type: String, unique: true, required: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    country: { type: String, required: true, trim: true },
    jobTitle: { type: String, trim: true },
    jobDetails: { type: String, required: true, trim: true },
    interestedService: { type: String, trim: true, default: '' },
    status: { type: String, enum: ['New', 'In Progress', 'Closed'], default: 'New' },
    adminNotes: { type: String, default: '' }
  },
  options
);

const adminSchema = new Schema(
  {
    name: { type: String, default: 'Administrator' },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true }
  },
  options
);

const gallerySchema = new Schema(
  {
    title: { type: String, required: true },
    category: String,
    description: String,
    date: String,
    location: String,
    image: String
  },
  options
);

const siteSettingsSchema = new Schema(
  {
    brandName: { type: String, default: 'AI-Solutions' },
    brandTagline: { type: String, default: 'Applied Intelligence' },
    logoInitials: { type: String, default: 'AI' },
    logoImage: { type: String, default: '' },
    footerDescription: {
      type: String,
      default:
        'AI-Solutions creates intelligent products, automation workflows, analytics experiences, and custom software designed to help organizations modernize with confidence.'
    },
    contactHeading: { type: String, default: 'AI-Solutions at the University of Sunderland' },
    contactAddress: {
      type: String,
      default:
        "David Goldman Informatics Centre, University of Sunderland, St Peter's Campus, Sunderland SR6 0DD, United Kingdom."
    },
    contactEmail: { type: String, default: 'integrations@ai-solutions.co.uk' },
    contactPhone: { type: String, default: '+44 (0)191 515 2000' },
    primaryTimezone: { type: String, default: 'UK Time' },
    contactTimezone: { type: String, default: 'Mon - Fri: 09:00 - 17:00 UK Time' },
    footerCopyright: {
      type: String,
      default: '(c) 2026 AI-Solutions. Built as a polished AI SaaS demonstration experience.'
    },
    footerCtaLabel: { type: String, default: 'Start a conversation' }
  },
  options
);

export const Inquiry: any = existingModels.Inquiry || mongoose.model('Inquiry', inquirySchema);
export const AdminUser: any = existingModels.AdminUser || mongoose.model('AdminUser', adminSchema);
export const Service: any =
  existingModels.Service ||
  mongoose.model(
    'Service',
    new Schema(
      {
        ...contentFields,
        image: String,
        icon: String,
        features: [String],
        pricing: String,
        category: String
      },
      options
    )
  );
export const Event: any =
  existingModels.Event ||
  mongoose.model(
    'Event',
    new Schema(
      {
        ...contentFields,
        date: String,
        time: String,
        location: String,
        type: String,
        image: String
      },
      options
    )
  );
export const BlogArticle: any =
  existingModels.BlogArticle ||
  mongoose.model(
    'BlogArticle',
    new Schema(
      {
        ...contentFields,
        category: String,
        excerpt: String,
        content: String,
        date: String,
        readTime: String,
        author: String,
        image: String
      },
      options
    )
  );
export const Testimonial: any =
  existingModels.Testimonial ||
  mongoose.model(
    'Testimonial',
    new Schema(
      {
        name: String,
        role: String,
        company: String,
        content: String,
        rating: Number,
        avatar: String
      },
      options
    )
  );
export const PortfolioProject: any =
  existingModels.PortfolioProject ||
  mongoose.model(
    'PortfolioProject',
    new Schema(
      {
        ...contentFields,
        image: String,
        tags: [String],
        features: [String],
        rating: Number,
        client: String,
        year: String
      },
      options
    )
  );
export const GalleryItem: any =
  existingModels.GalleryItem || mongoose.model('GalleryItem', gallerySchema);
export const SiteSettings: any =
  existingModels.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
