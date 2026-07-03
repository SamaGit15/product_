# CET333 Report Information

This document extracts technical and project evidence from the AI-Solutions codebase at `C:\Users\Lenovo\Desktop\product_development_code`.

Important evidence notes:

- This document is based on the current repository state inspected on June 30, 2026.
- Assumptions are explicitly marked.
- Some project documentation is outdated. Where code and documentation conflict, the codebase has been treated as the primary evidence source.

## 1. Project Overview

- Project name:
  - AI-Solutions CET333 Product Development Prototype
  - Evidence: [README.md](C:/Users/Lenovo/Desktop/product_development_code/README.md), [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx), [server/src/data.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/data.js)

- Purpose of the system:
  - To provide a public-facing AI company website where visitors can explore services, past solutions, testimonials, articles, events, gallery content, and submit inquiries.
  - To provide a password-protected admin area where staff can log in, monitor inquiries, update statuses, add notes, manage content, upload images, and edit platform/site settings.

- Target users:
  - Public visitors / prospective clients
  - AI-Solutions administrators

- Client needs addressed:
  - Promotion of software/AI services
  - Display of past industry-style solutions
  - Display of customer feedback and ratings
  - Publishing of articles and company events
  - Visual promotion through gallery content
  - Contact/inquiry capture without requiring customer account creation
  - Secure admin-only management of business inquiries and site content

- How the system matches CET333 Computer Systems Engineering requirements:
  - Combines frontend, backend, database, authentication, validation, and deployment planning in one integrated system
  - Demonstrates full-stack product design and implementation
  - Includes evidence of iterative prototyping and redesign
  - Includes responsive UI, backend API, MongoDB persistence, admin security, and CRUD operations
  - Supports discussion of software engineering topics such as maintainability, usability, security, and deployment

## 2. Technologies Used

| Technology | Where it is used | Why it appears to have been selected | Evidence |
|---|---|---|---|
| React | All frontend UI components | Component-based UI, state management, reusable views | [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx), [client/src/components](C:/Users/Lenovo/Desktop/product_development_code/client/src/components), [client/package.json](C:/Users/Lenovo/Desktop/product_development_code/client/package.json) |
| Vite | Frontend build/dev server | Fast local development and bundling | [client/vite.config.ts](C:/Users/Lenovo/Desktop/product_development_code/client/vite.config.ts), [client/package.json](C:/Users/Lenovo/Desktop/product_development_code/client/package.json) |
| Tailwind CSS v4 | Frontend styling | Utility-first responsive styling | [client/vite.config.ts](C:/Users/Lenovo/Desktop/product_development_code/client/vite.config.ts), [client/src/index.css](C:/Users/Lenovo/Desktop/product_development_code/client/src/index.css), dependency `@tailwindcss/vite` in [client/package.json](C:/Users/Lenovo/Desktop/product_development_code/client/package.json) |
| TypeScript | Frontend typing | Better maintainability and safer refactoring | `.tsx` files in [client/src](C:/Users/Lenovo/Desktop/product_development_code/client/src), [client/tsconfig.json](C:/Users/Lenovo/Desktop/product_development_code/client/tsconfig.json) |
| Node.js | Backend runtime, scripts | Runs Express API and seed scripts | [server/package.json](C:/Users/Lenovo/Desktop/product_development_code/server/package.json), [package.json](C:/Users/Lenovo/Desktop/product_development_code/package.json) |
| Express.js | REST API server | Lightweight routing and middleware support | [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js), [server/package.json](C:/Users/Lenovo/Desktop/product_development_code/server/package.json) |
| MongoDB | Persistent data storage | Stores inquiries, admin user, content, and site settings | `mongoose.connect(process.env.MONGODB_URI)` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js), [server/src/models.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/models.js) |
| Mongoose | Schema modeling for MongoDB | Defines collections, validation, defaults, timestamps | [server/src/models.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/models.js) |
| JWT (`jsonwebtoken`) | Admin authentication | Stateless token-based authentication for admin API access | `jwt.sign` and `jwt.verify` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js), `admin_token` storage in [client/src/lib/api.ts](C:/Users/Lenovo/Desktop/product_development_code/client/src/lib/api.ts) |
| bcrypt (`bcryptjs`) | Password hashing and verification | Secure admin password storage and checking | [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js), [server/src/seed.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/seed.js) |
| Fetch API | Frontend API communication | Native HTTP calls without Axios dependency | [client/src/lib/api.ts](C:/Users/Lenovo/Desktop/product_development_code/client/src/lib/api.ts), [client/src/components/AIAssistant.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AIAssistant.tsx) |
| express-validator | Backend validation | Validates login, inquiry, password, and chat input payloads | `body(...)` validators in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) |
| Helmet | Security headers | Adds standard HTTP security headers | `app.use(helmet(...))` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) |
| CORS (`cors`) | Cross-origin request control | Allows frontend-backend communication while restricting origins | `app.use(cors(...))` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) |
| express-rate-limit | Login attack mitigation | Limits repeated login attempts | `rateLimit(...)` on `/api/auth/login` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) |
| Morgan | Request logging | Easier debugging and request monitoring | `app.use(morgan("dev"))` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) |
| Multer | Image upload handling | Handles uploaded branding/content images | `multer.diskStorage` and `/api/admin/uploads/image` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) |
| Lucide React | UI icons | Consistent icon set across public and admin UI | imports across [client/src/components](C:/Users/Lenovo/Desktop/product_development_code/client/src/components), dependency in [client/package.json](C:/Users/Lenovo/Desktop/product_development_code/client/package.json) |
| Motion (`motion/react`) | UI transitions and animations | Improves interface polish and perceived responsiveness | multiple components including [client/src/components/Navigation.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/Navigation.tsx), [client/src/components/AdminLoginView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminLoginView.tsx) |
| Gemini API | AI chatbot backend integration | Provides context-aware assistant for large prompts/site questions | `/api/assistant/chat` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js), [client/src/components/AIAssistant.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AIAssistant.tsx) |
| Deployment tooling via npm scripts + Render guide | Build/run/deploy workflow | Simple classroom deployment path | [package.json](C:/Users/Lenovo/Desktop/product_development_code/package.json), [DEPLOYMENT.md](C:/Users/Lenovo/Desktop/product_development_code/DEPLOYMENT.md) |

Notes on mismatches:

- README claims React Router, Recharts, and Axios are used, but no current dependency/evidence supports that in the codebase.
- Actual frontend routing is handled manually with `window.history` in [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx).
- Chart visuals are custom Tailwind/SVG/CSS implementations in [client/src/components/AdminDashboardView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminDashboardView.tsx) and [client/src/components/AdminAnalyticsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminAnalyticsView.tsx), not Recharts.

## 3. System Features

### Public Website

| Feature | Description | Related files/components | Related API endpoints | Screenshot needed | Suggested screenshot name |
|---|---|---|---|---|---|
| Home page | Landing page with hero, featured content, navigation to contact/portfolio/gallery/about, and AI assistant launcher | [client/src/components/HomeView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/HomeView.tsx), [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx) | Indirectly uses public content endpoints via app sync | Yes | `01-home-page-desktop` |
| About page | Company overview and CET333 context | [client/src/components/AboutView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AboutView.tsx) | None | Yes | `02-about-page` |
| Services page | Displays AI/software services with images, pricing, icons, and features | [client/src/components/ServicesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/ServicesView.tsx) | `GET /api/services` | Yes | `03-services-page` |
| Portfolio / past solutions page | Shows deployed projects with client, year, tags, rating, and benefits | [client/src/components/PortfolioView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/PortfolioView.tsx) | `GET /api/portfolio` | Yes | `04-portfolio-page` |
| Testimonials page | Displays customer feedback with rating values and avatars | [client/src/components/TestimonialsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/TestimonialsView.tsx) | `GET /api/testimonials` | Yes | `05-testimonials-page` |
| Articles / blog page | Shows technical/company articles and detail modal/view | [client/src/components/BlogsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/BlogsView.tsx) | `GET /api/blogs` | Yes | `06-articles-page` |
| Events page | Shows company events, dates, locations, and types | [client/src/components/EventsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/EventsView.tsx) | `GET /api/events` | Yes | `07-events-page` |
| Gallery page | Shows promotional images and event/lab content | [client/src/components/GalleryView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/GalleryView.tsx) | `GET /api/gallery` | Yes | `08-gallery-page` |
| Contact Us page | Inquiry form with name, email, phone, company, country, job title, job details; client validation and success/fallback notices | [client/src/components/ContactView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/ContactView.tsx) | `POST /api/inquiries`, `GET /api/site-settings` | Yes | `09-contact-form` |
| Public site settings usage | Public navbar/footer/contact panel use stored brand text/logo/contact details | [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx), [client/src/components/Navigation.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/Navigation.tsx) | `GET /api/site-settings` or `/api/settings/site` | Yes | `10-public-branding-settings` |
| AI assistant chatbot | Gemini-powered assistant on public site; supports long prompts and site-aware replies | [client/src/components/AIAssistant.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AIAssistant.tsx), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) | `POST /api/assistant/chat` | Optional | `11-ai-assistant` |

### Admin System

| Feature | Description | Related files/components | Related API endpoints | Screenshot needed | Suggested screenshot name |
|---|---|---|---|---|---|
| Admin login/logout | Login form stores JWT in localStorage; logout clears token | [client/src/components/AdminLoginView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminLoginView.tsx), [client/src/lib/api.ts](C:/Users/Lenovo/Desktop/product_development_code/client/src/lib/api.ts), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) | `POST /api/auth/login` | Yes | `12-admin-login` |
| Protected admin routes | Admin pages redirect to login when token missing; backend also protects `/api/admin/*` | [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) | All `/api/admin/*` routes | Optional | `13-protected-route-behaviour` |
| Dashboard | KPI cards, recent inquiries, bar chart, donut chart, line graph, quick actions | [client/src/components/AdminDashboardView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminDashboardView.tsx) | `GET /api/admin/dashboard`, `GET /api/admin/inquiries` | Yes | `14-admin-dashboard` |
| Inquiry management | Search/filter inquiries and list records | [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx) | `GET /api/admin/inquiries` | Yes | `15-inquiry-management-table` |
| Inquiry detail modal | Shows inquiry metadata and job details | [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx) | `GET /api/admin/inquiries` / `GET /api/admin/inquiries/:id` | Yes | `16-inquiry-detail-modal` |
| Status update | Admin can change inquiry status to New/In Progress/Closed | [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx) | `PATCH /api/admin/inquiries/:id/status` | Yes | `17-inquiry-status-update` |
| Admin notes | Admin can write/save notes on an inquiry | [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx) | `PATCH /api/admin/inquiries/:id/notes` | Yes | `18-admin-notes` |
| Delete inquiry | Admin can delete inquiry with confirmation modal | [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx) | `DELETE /api/admin/inquiries/:id` | Yes | `19-inquiry-delete-confirmation` |
| Analytics | Separate analytics view for service/country demand visualization | [client/src/components/AdminAnalyticsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminAnalyticsView.tsx) | Data sourced from inquiry collection through sync/API | Yes | `20-admin-analytics` |
| Content management | CRUD for blogs, events, services, portfolio, testimonials, gallery | [client/src/components/AdminContentView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminContentView.tsx), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) | `GET/POST/PUT/DELETE /api/admin/{services|portfolio|testimonials|blogs|events|gallery}` | Yes | `21-admin-content-manager` |
| Image upload | Uploads images to backend `/uploads/...` and stores path in database | [client/src/components/AdminContentView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminContentView.tsx), [client/src/components/AdminSettingsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminSettingsView.tsx), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) | `POST /api/admin/uploads/image` | Yes | `22-image-upload` |
| Platform settings | Edit brand name, tagline, logo, footer, contact content | [client/src/components/AdminSettingsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminSettingsView.tsx) | `GET /api/admin/site-settings`, `PUT /api/admin/site-settings` | Yes | `23-platform-settings` |
| Password change | Admin can update password from settings page | [client/src/components/AdminSettingsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminSettingsView.tsx), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) | `PATCH /api/admin/password` | Yes | `24-password-change` |

## 4. Requirements Mapping

| Assignment/SRS requirement | Implemented feature | Evidence from code | Screenshot required | Status |
|---|---|---|---|---|
| Software solutions offered | Services page and seeded services content | [client/src/components/ServicesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/ServicesView.tsx), [server/src/data.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/data.js) | Yes | Complete |
| Past industry solutions | Portfolio page with project cards and ratings | [client/src/components/PortfolioView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/PortfolioView.tsx), [server/src/data.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/data.js) | Yes | Complete |
| Customer feedback with ratings | Testimonials page with `rating` field | [client/src/components/TestimonialsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/TestimonialsView.tsx), [server/src/models.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/models.js) | Yes | Complete |
| Articles promoting the company | Blog/articles page and blog CRUD | [client/src/components/BlogsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/BlogsView.tsx), [client/src/components/AdminContentView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminContentView.tsx) | Yes | Complete |
| Photo gallery/promotional events | Gallery page and gallery CRUD | [client/src/components/GalleryView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/GalleryView.tsx), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) | Yes | Complete |
| Upcoming events | Events page and events CRUD | [client/src/components/EventsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/EventsView.tsx), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) | Yes | Complete |
| Contact Us form with required fields | Contact form with validation and backend persistence | [client/src/components/ContactView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/ContactView.tsx), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js), [server/src/models.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/models.js) | Yes | Complete |
| No customer account required | Public content and contact form work without customer login | [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) | Optional | Complete |
| Password-protected admin area | JWT login and protected admin routes | [client/src/components/AdminLoginView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminLoginView.tsx), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) | Yes | Complete |
| Admin access to inquiry data | Inquiry table, modal, notes, status updates | [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx) | Yes | Complete |
| Responsive design | Mobile/desktop layouts in navbar, pages, tables, dashboard | [client/src/components/Navigation.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/Navigation.tsx), [client/src/components/ContactView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/ContactView.tsx), [TESTING.md](C:/Users/Lenovo/Desktop/product_development_code/TESTING.md) | Yes | Complete |
| Basic security | Helmet, CORS, rate limiting, JWT, bcrypt, validation, sanitisation | [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js) | Optional | Complete |

## 5. Functional Requirements Evidence

- FR1: The system allows visitors to view AI-Solutions company information.
  - Evidence: [client/src/components/HomeView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/HomeView.tsx), [client/src/components/AboutView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AboutView.tsx)
  - Screenshot placeholder: `[Insert screenshot: Home Page]`

- FR2: The system allows visitors to browse AI service offerings.
  - Evidence: [client/src/components/ServicesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/ServicesView.tsx), `GET /api/services` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js)
  - Screenshot placeholder: `[Insert screenshot: Services Page]`

- FR3: The system allows visitors to view past solutions/portfolio work.
  - Evidence: [client/src/components/PortfolioView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/PortfolioView.tsx), `GET /api/portfolio`
  - Screenshot placeholder: `[Insert screenshot: Portfolio Page]`

- FR4: The system allows visitors to read customer testimonials with ratings.
  - Evidence: [client/src/components/TestimonialsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/TestimonialsView.tsx), testimonial model in [server/src/models.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/models.js)
  - Screenshot placeholder: `[Insert screenshot: Testimonials Page]`

- FR5: The system allows visitors to view articles/blog posts.
  - Evidence: [client/src/components/BlogsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/BlogsView.tsx), `GET /api/blogs`
  - Screenshot placeholder: `[Insert screenshot: Articles Page]`

- FR6: The system allows visitors to browse events.
  - Evidence: [client/src/components/EventsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/EventsView.tsx), `GET /api/events`
  - Screenshot placeholder: `[Insert screenshot: Events Page]`

- FR7: The system allows visitors to browse gallery content.
  - Evidence: [client/src/components/GalleryView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/GalleryView.tsx), `GET /api/gallery`
  - Screenshot placeholder: `[Insert screenshot: Gallery Page]`

- FR8: The system allows visitors to submit a business inquiry through a contact form.
  - Evidence: [client/src/components/ContactView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/ContactView.tsx), `POST /api/inquiries` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js)
  - Screenshot placeholder: `[Insert screenshot: Contact Form Submission]`

- FR9: The system validates inquiry input on the client side.
  - Evidence: `validateForm()` in [client/src/components/ContactView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/ContactView.tsx)
  - Screenshot placeholder: `[Insert screenshot: Contact Form Validation]`

- FR10: The system validates and sanitises inquiry input on the server side.
  - Evidence: `body("fullName")`, `body("email")`, `body("phone")`, `body("country")`, `body("jobDetails")`, `clean()` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js)
  - Screenshot placeholder: `[Insert screenshot: Postman Inquiry Validation]`

- FR11: The system allows an administrator to log in securely.
  - Evidence: [client/src/components/AdminLoginView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminLoginView.tsx), `POST /api/auth/login`
  - Screenshot placeholder: `[Insert screenshot: Admin Login]`

- FR12: The system restricts admin routes to authenticated users.
  - Evidence: `protect` middleware in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js), `isAdminPage` guard in [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx)
  - Screenshot placeholder: `[Insert screenshot: Protected Route Redirect]`

- FR13: The system allows administrators to view dashboard metrics.
  - Evidence: [client/src/components/AdminDashboardView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminDashboardView.tsx), `GET /api/admin/dashboard`
  - Screenshot placeholder: `[Insert screenshot: Admin Dashboard]`

- FR14: The system allows administrators to search and filter inquiries.
  - Evidence: `searchTerm`, `statusFilter`, `filteredInquiries` in [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx)
  - Screenshot placeholder: `[Insert screenshot: Inquiry Search/Filter]`

- FR15: The system allows administrators to view inquiry details.
  - Evidence: selected inquiry modal in [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx)
  - Screenshot placeholder: `[Insert screenshot: Inquiry Detail Modal]`

- FR16: The system allows administrators to update inquiry status.
  - Evidence: `PATCH /api/admin/inquiries/:id/status`, UI controls in [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx)
  - Screenshot placeholder: `[Insert screenshot: Inquiry Status Update]`

- FR17: The system allows administrators to store inquiry notes.
  - Evidence: `PATCH /api/admin/inquiries/:id/notes`, notes textarea in [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx)
  - Screenshot placeholder: `[Insert screenshot: Admin Notes]`

- FR18: The system allows administrators to delete inquiries.
  - Evidence: `DELETE /api/admin/inquiries/:id`, confirm modal in [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx)
  - Screenshot placeholder: `[Insert screenshot: Inquiry Delete]`

- FR19: The system allows administrators to manage public content.
  - Evidence: [client/src/components/AdminContentView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminContentView.tsx), CRUD routes in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js)
  - Screenshot placeholder: `[Insert screenshot: Admin Content Manager]`

- FR20: The system allows administrators to upload images for content and branding.
  - Evidence: [client/src/components/AdminContentView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminContentView.tsx), [client/src/components/AdminSettingsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminSettingsView.tsx), `POST /api/admin/uploads/image`
  - Screenshot placeholder: `[Insert screenshot: Image Upload]`

- FR21: The system allows administrators to update global site settings.
  - Evidence: [client/src/components/AdminSettingsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminSettingsView.tsx), `PUT /api/admin/site-settings`
  - Screenshot placeholder: `[Insert screenshot: Platform Settings]`

- FR22: The system provides an AI assistant for public user guidance.
  - Evidence: [client/src/components/AIAssistant.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AIAssistant.tsx), `/api/assistant/chat`
  - Screenshot placeholder: `[Insert screenshot: AI Assistant]`

## 6. Non-Functional Requirements Evidence

- Responsiveness
  - Supported by Tailwind utility classes, mobile menu in [client/src/components/Navigation.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/Navigation.tsx), responsive grids in page components, and manual testing guidance in [TESTING.md](C:/Users/Lenovo/Desktop/product_development_code/TESTING.md)
  - Suggested evidence:
    - desktop and mobile screenshots of home page
    - mobile admin menu screenshot

- Usability
  - Clear page sections, reusable UI components, validation messages, success/error notices, searchable inquiry table
  - Evidence: [client/src/components/UIElements.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/UIElements.tsx), [client/src/components/ContactView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/ContactView.tsx), [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx)
  - Suggested evidence:
    - contact validation screenshot
    - inquiry detail modal screenshot

- Performance
  - Vite for fast frontend build/dev
  - Concurrent content fetching in `syncRepository()` with `Promise.all`
  - Lightweight server routes and lean Mongo usage for some assistant context loads
  - Evidence: [client/vite.config.ts](C:/Users/Lenovo/Desktop/product_development_code/client/vite.config.ts), [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx), [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js)
  - Limitation:
    - No formal performance benchmarks or lazy loading evidence found

- Security
  - Helmet headers, CORS restrictions, JWT auth, bcrypt password hashing, login rate limiting, server validation, simple sanitisation
  - Evidence: [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js), [server/src/seed.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/seed.js)
  - Suggested evidence:
    - Postman 401 screenshot
    - response headers screenshot

- Browser compatibility
  - No automated compatibility framework found
  - Manual compatibility testing is proposed in [TESTING.md](C:/Users/Lenovo/Desktop/product_development_code/TESTING.md)
  - Status:
    - Partial evidence only

- Maintainability
  - Separation of concerns between components, API client, models, routes, seed data, docs
  - Shared type definitions and reusable components
  - Evidence: [client/src/types.ts](C:/Users/Lenovo/Desktop/product_development_code/client/src/types.ts), [client/src/lib/api.ts](C:/Users/Lenovo/Desktop/product_development_code/client/src/lib/api.ts), [server/src/models.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/models.js)

- Scalability
  - Modular CRUD route generator (`createCrudRoutes`) supports repeated content types
  - Database-backed content and settings can grow beyond hardcoded UI
  - Evidence: `createCrudRoutes(...)` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js)
  - Limitation:
    - No pagination, indexing evidence, caching layer, or role-based access control found

## 7. Database Design

### Mongoose Models / Collections

1. `Inquiry`
   - File: [server/src/models.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/models.js)
   - Fields:
     - `referenceId: String`, required, unique
     - `fullName: String`, required, trimmed
     - `email: String`, required, lowercase, trimmed
     - `phone: String`, required, trimmed
     - `company: String`, optional, trimmed
     - `country: String`, required, trimmed
     - `jobTitle: String`, optional, trimmed
     - `jobDetails: String`, required, trimmed
     - `interestedService: String`, optional, default `""`
     - `status: String`, enum `["New","In Progress","Closed"]`, default `"New"`
     - `adminNotes: String`, default `""`
   - Timestamps:
     - yes, via shared `{ timestamps: true }`

2. `AdminUser`
   - Fields:
     - `name: String`, default `"Administrator"`
     - `email: String`, required, unique, lowercase
     - `password: String`, required
   - Timestamps:
     - yes

3. `Service`
   - Fields:
     - `title: String`, required
     - `description: String`
     - `image: String`
     - `icon: String`
     - `features: [String]`
     - `pricing: String`
     - `category: String`

4. `Event`
   - Fields:
     - `title`, `description`, `date`, `time`, `location`, `type`, `image`

5. `BlogArticle`
   - Fields:
     - `title`, `description`, `category`, `excerpt`, `content`, `date`, `readTime`, `author`, `image`

6. `Testimonial`
   - Fields:
     - `name`, `role`, `company`, `content`, `rating`, `avatar`

7. `PortfolioProject`
   - Fields:
     - `title`, `description`, `image`, `tags`, `features`, `rating`, `client`, `year`

8. `GalleryItem`
   - Fields:
     - `title`, `category`, `description`, `date`, `location`, `image`

9. `SiteSettings`
   - Fields:
     - `brandName`, `brandTagline`, `logoInitials`, `logoImage`, `footerDescription`, `contactHeading`, `contactAddress`, `contactEmail`, `contactPhone`, `primaryTimezone`, `contactTimezone`, `footerCopyright`, `footerCtaLabel`

### Relationships

- No explicit Mongoose `ref` relationships are defined.
- The design is largely document-oriented and independent by collection.
- Practical relationship:
  - `Inquiry` records are managed by `AdminUser` through protected routes, but not linked by foreign key.

### Collection descriptions

| Collection | Purpose |
|---|---|
| `adminusers` | Stores admin login credentials |
| `inquiries` | Stores visitor contact requests and admin workflow data |
| `services` | Stores public service offerings |
| `portfolioprojects` | Stores case studies/past solutions |
| `testimonials` | Stores feedback and ratings |
| `blogarticles` | Stores article content |
| `events` | Stores event content |
| `galleryitems` | Stores gallery images/content |
| `sitesettings` | Stores editable branding/contact/footer content |

### Suggested ERD / database diagram content

- Entity: AdminUser
  - email, password, name, timestamps
- Entity: Inquiry
  - referenceId, fullName, email, phone, company, country, jobTitle, jobDetails, status, adminNotes, timestamps
- Entity: Service
  - title, description, image, category, pricing
- Entity: PortfolioProject
  - title, client, year, rating, tags, features
- Entity: Testimonial
  - name, role, company, rating, avatar
- Entity: BlogArticle
  - title, excerpt, content, author, category, readTime, date
- Entity: Event
  - title, date, time, location, type
- Entity: GalleryItem
  - title, category, description, image, date, location
- Entity: SiteSettings
  - brandName, logoImage, contact info, footer fields

Suggested screenshot placeholders:

- `[Insert screenshot: MongoDB inquiries collection]`
- `[Insert screenshot: MongoDB services collection]`
- `[Insert screenshot: MongoDB siteSettings collection]`

## 8. API Documentation

### Public / Utility Endpoints

| Method | URL | Purpose | Request body | Response data | Auth required | Related frontend file |
|---|---|---|---|---|---|---|
| GET | `/api/health` | Health check | None | `{ ok: true }` | No | None directly |
| GET | `/uploads/:folder/:filename` | Serve uploaded media | None | File response | No | Resolved by [client/src/lib/api.ts](C:/Users/Lenovo/Desktop/product_development_code/client/src/lib/api.ts) |
| GET | `/api/site-settings` and `/api/settings/site` | Get site branding/contact/footer settings | None | Site settings object | No | [client/src/lib/api.ts](C:/Users/Lenovo/Desktop/product_development_code/client/src/lib/api.ts), [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx) |
| POST | `/api/inquiries` | Submit visitor inquiry | `fullName, email, phone, company, country, jobTitle, jobDetails, interestedService` | `{ id, referenceId, message }` | No | [client/src/components/ContactView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/ContactView.tsx), [client/src/lib/api.ts](C:/Users/Lenovo/Desktop/product_development_code/client/src/lib/api.ts) |
| POST | `/api/auth/login` | Admin authentication | `email, password` | `{ token, admin, expiresIn }` | No | [client/src/components/AdminLoginView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminLoginView.tsx), [client/src/lib/api.ts](C:/Users/Lenovo/Desktop/product_development_code/client/src/lib/api.ts) |
| POST | `/api/assistant/chat` | AI assistant chat endpoint | `message, currentPage?, history?` | `{ reply, model }` | No | [client/src/components/AIAssistant.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AIAssistant.tsx) |

### Public Content Endpoints

| Method | URL | Purpose | Request body | Response data | Auth required | Related frontend file |
|---|---|---|---|---|---|---|
| GET | `/api/services` | Get services | None | Array of services | No | [client/src/components/ServicesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/ServicesView.tsx) |
| GET | `/api/portfolio` | Get portfolio projects | None | Array of portfolio items | No | [client/src/components/PortfolioView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/PortfolioView.tsx) |
| GET | `/api/testimonials` | Get testimonials | None | Array of testimonials | No | [client/src/components/TestimonialsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/TestimonialsView.tsx) |
| GET | `/api/blogs` | Get blogs | None | Array of blogs | No | [client/src/components/BlogsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/BlogsView.tsx) |
| GET | `/api/events` | Get events | None | Array of events | No | [client/src/components/EventsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/EventsView.tsx) |
| GET | `/api/gallery` | Get gallery items | None | Array of gallery items | No | [client/src/components/GalleryView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/GalleryView.tsx) |

### Admin Endpoints

| Method | URL | Purpose | Request body | Response data | Auth required | Related frontend file |
|---|---|---|---|---|---|---|
| GET | `/api/admin/dashboard` | Get KPI metrics | None | `DashboardStats` object | Yes | [client/src/components/AdminDashboardView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminDashboardView.tsx) |
| GET | `/api/admin/inquiries` | Get all inquiries, optional filtering | Query params: `status`, `country`, `service`, `search` | Array of inquiry documents | Yes | [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx) |
| GET | `/api/admin/inquiries/:id` | Get one inquiry | None | Single inquiry | Yes | Not directly called in current UI |
| PATCH | `/api/admin/inquiries/:id/status` | Update inquiry status | `{ status }` | Updated inquiry | Yes | [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx) |
| PATCH | `/api/admin/inquiries/:id/notes` | Update admin notes | `{ adminNotes }` | Updated inquiry | Yes | [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx) |
| DELETE | `/api/admin/inquiries/:id` | Delete inquiry | None | `{ message }` | Yes | [client/src/components/AdminInquiriesView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminInquiriesView.tsx) |
| GET | `/api/admin/site-settings` and `/api/admin/settings/site` | Fetch admin settings | None | Site settings object | Yes | [client/src/components/AdminSettingsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminSettingsView.tsx) through API client |
| PUT | `/api/admin/site-settings` and `/api/admin/settings/site` | Save settings | branding/contact/footer fields | Updated settings object | Yes | [client/src/components/AdminSettingsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminSettingsView.tsx) |
| POST | `/api/admin/uploads/image` | Upload image | multipart form-data: `folder`, `image` | `{ path, filename, originalName, message }` | Yes | [client/src/components/AdminContentView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminContentView.tsx), [client/src/components/AdminSettingsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminSettingsView.tsx) |
| PATCH | `/api/admin/password` | Change admin password | `{ currentPassword, newPassword }` | `{ message }` | Yes | [client/src/components/AdminSettingsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminSettingsView.tsx) |

### Admin CRUD Endpoints Generated by `createCrudRoutes`

For each of the following content groups, the server exposes:

- `GET /api/{path}` public read
- `GET /api/admin/{path}` admin read
- `POST /api/admin/{path}` admin create
- `PUT /api/admin/{path}/:id` admin update
- `DELETE /api/admin/{path}/:id` admin delete

Supported paths:

- `services`
- `portfolio`
- `testimonials`
- `blogs`
- `events`
- `gallery`

Evidence: `createCrudRoutes(...)` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js)

## 9. Authentication and Security

- Admin login flow
  - Admin submits email/password on [client/src/components/AdminLoginView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminLoginView.tsx)
  - Frontend calls `ApiClient.login()` in [client/src/lib/api.ts](C:/Users/Lenovo/Desktop/product_development_code/client/src/lib/api.ts)
  - Backend checks credentials in `POST /api/auth/login` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js)
  - On success, frontend stores `admin_token` in localStorage

- JWT creation and storage
  - JWT created with `jwt.sign(...)` and `expiresIn: "2h"`
  - Token stored in browser localStorage as `admin_token`
  - Token attached automatically through `authHeaders()`

- Password hashing
  - Seed admin password hashed using `bcrypt.hash(..., 12)` in [server/src/seed.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/seed.js)
  - Login uses `bcrypt.compare(...)`
  - Password changes also re-hash password

- Protected middleware
  - `protect` middleware verifies `Authorization: Bearer <token>`
  - Rejects missing/invalid token with `401`

- Route protection
  - Frontend:
    - `isAdminPage` guard in [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx)
    - URL `/admin/...` redirects to admin login if not logged in
  - Backend:
    - `app.use("/api/admin", protect)` plus content-specific protect calls

- CORS
  - Allowed origins derive from `CLIENT_URL` plus localhost pattern
  - Evidence: `configuredOrigins`, `isAllowedOrigin` in [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js)

- Helmet / rate limiting
  - Helmet enabled globally
  - Rate limit on login: 10 attempts per 15 minutes

- Validation / sanitisation
  - `express-validator` checks for inquiries, login, chat, password
  - `clean()` removes angle brackets
  - `sanitizeTextArray()` normalises list inputs

### Missing security improvements suitable for critical reflection

- Tokens are stored in localStorage rather than HTTP-only cookies
- No CSRF protection mechanism visible
- No role-based access control beyond single admin model
- No audit log for admin actions
- No file type deep-inspection beyond MIME prefix
- No automated security tests found
- Seeded default admin credentials are weak for real deployment and must be changed

## 10. Admin Dashboard Analytics

- KPI cards
  - Total inquiries
  - New inquiries
  - In progress inquiries
  - Closed inquiries
  - Evidence: [client/src/components/AdminDashboardView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminDashboardView.tsx)

- Chart types currently implemented
  - Bar chart style: inquiry status breakdown
  - Donut/pie style chart: country distribution
  - Line graph: last 7 days inquiry activity
  - Additional analytics page:
    - service demand bar visualization
    - country distribution visualization
  - Evidence:
    - [client/src/components/AdminDashboardView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminDashboardView.tsx)
    - [client/src/components/AdminAnalyticsView.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/components/AdminAnalyticsView.tsx)

- Data source / API endpoint
  - Dashboard metrics: `GET /api/admin/dashboard`
  - Inquiry list data: `GET /api/admin/inquiries`
  - Analytics components derive counts from `inquiries` array in frontend state

- How analytics support client requirements
  - Help admin identify workload and pending inquiries
  - Show demand distribution by status and geography
  - Support business decision-making and response prioritization
  - Demonstrate added value beyond static content site

- Screenshot placeholders
  - `[Insert screenshot: Admin dashboard KPI cards]`
  - `[Insert screenshot: Admin dashboard charts]`
  - `[Insert screenshot: Analytics page charts]`

Important limitation:

- Service-demand analytics are now weaker because the public contact form currently sends `service: ''`. This means service-based charts may show blank or limited values for newer inquiries.

## 11. Testing Information

### Existing testing evidence

- No automated unit/integration/end-to-end test files were found.
- No Jest, Vitest, Cypress, Playwright, or React Testing Library dependencies were found.
- Manual testing guidance exists in [TESTING.md](C:/Users/Lenovo/Desktop/product_development_code/TESTING.md).

### Proposed testing table for final report

| Test ID | Feature | Test Scenario | Expected Result | Actual Result | Status | Screenshot placeholder |
|---|---|---|---|---|---|---|
| T01 | Contact form validation | Submit empty form | Required field errors shown | ___ | ___ | `[Insert screenshot: Empty contact form validation]` |
| T02 | Contact form validation | Submit invalid email/phone | Validation rejects input / API returns 422 | ___ | ___ | `[Insert screenshot: Invalid inquiry payload]` |
| T03 | Inquiry submission | Submit valid contact form | Success notice appears and inquiry stored | ___ | ___ | `[Insert screenshot: Successful inquiry submission]` |
| T04 | Admin login success | Enter seeded valid credentials | Dashboard loads and JWT stored | ___ | ___ | `[Insert screenshot: Admin login success]` |
| T05 | Admin login failure | Enter invalid password | Error message shown | ___ | ___ | `[Insert screenshot: Admin login failure]` |
| T06 | Protected route access | Open admin API without token | `401 Authentication required` | ___ | ___ | `[Insert screenshot: Protected API 401]` |
| T07 | Inquiry view | Open inquiry list and detail modal | Inquiry data visible in admin | ___ | ___ | `[Insert screenshot: Inquiry detail modal]` |
| T08 | Inquiry status update | Change status to In Progress | Status persists and UI updates | ___ | ___ | `[Insert screenshot: Status updated]` |
| T09 | Admin notes | Add notes to inquiry | Notes saved and persist after refresh | ___ | ___ | `[Insert screenshot: Admin notes saved]` |
| T10 | Analytics display | Open dashboard and analytics page | Charts render without errors | ___ | ___ | `[Insert screenshot: Analytics charts]` |
| T11 | Responsive layout | Test mobile/tablet/desktop widths | Navigation and forms remain usable | ___ | ___ | `[Insert screenshot: Responsive mobile view]` |
| T12 | Browser compatibility | Test Chrome/Edge/Firefox | Core workflows behave correctly | ___ | ___ | `[Insert screenshot: Browser compatibility evidence]` |
| T13 | Security headers | Inspect response headers | Helmet headers present | ___ | ___ | `[Insert screenshot: Security headers]` |
| T14 | Image upload | Upload branding/content image | File stored and visible in frontend/admin | ___ | ___ | `[Insert screenshot: Uploaded image working]` |

## 12. Deployment Information

- Frontend start command
  - `npm run dev --prefix client`
  - or root: `npm run dev`
  - Evidence: [package.json](C:/Users/Lenovo/Desktop/product_development_code/package.json), [client/package.json](C:/Users/Lenovo/Desktop/product_development_code/client/package.json)

- Backend start command
  - Development: `npm run dev --prefix server`
  - Production: `npm start --prefix server`
  - Evidence: [server/package.json](C:/Users/Lenovo/Desktop/product_development_code/server/package.json)

- Build command
  - Frontend: `npm run build --prefix client`
  - Root shortcut: `npm run build`

- Database connection method
  - `mongoose.connect(process.env.MONGODB_URI)`
  - Evidence: [server/src/server.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/server.js)

- Environment variables found / implied
  - Backend from docs/code:
    - `MONGODB_URI`
    - `JWT_SECRET`
    - `PORT`
    - `CLIENT_URL`
    - `GEMINI_API_KEY`
    - `GEMINI_MODEL` optional
  - Frontend from example/code:
    - `APP_URL`
    - `VITE_API_BASE_URL`
    - `DISABLE_HMR` optional in Vite config

- Deployment platform assumptions
  - `DEPLOYMENT.md` assumes Render for frontend and backend
  - MongoDB Atlas assumed for hosted database

- Production setup steps
  1. Configure backend env variables
  2. Configure frontend env variable for API base if needed
  3. Deploy backend from `server/`
  4. Deploy frontend from `client/`
  5. Configure rewrite of `/*` to `/index.html`
  6. Seed database if demo content required

- Deployment-related files
  - [DEPLOYMENT.md](C:/Users/Lenovo/Desktop/product_development_code/DEPLOYMENT.md)
  - [client/vite.config.ts](C:/Users/Lenovo/Desktop/product_development_code/client/vite.config.ts)
  - [package.json](C:/Users/Lenovo/Desktop/product_development_code/package.json)

- Missing deployment config evidence
  - No Dockerfile
  - No docker-compose
  - No GitHub Actions / CI pipeline
  - No Render YAML / Procfile / nginx config
  - No `server/.env.example` file was found in the repository listing

- Screenshot placeholders
  - `[Insert screenshot: Frontend running locally]`
  - `[Insert screenshot: Backend running locally]`
  - `[Insert screenshot: MongoDB connected]`
  - `[Insert screenshot: Deployed site]`

## 13. Suggested Screenshots for Final Report

1. Home page
   - Placement: Introduction / public interface section
   - Proof: overall landing page and branding

2. Services page
   - Placement: Functional requirements / services
   - Proof: software solutions offered

3. Portfolio page
   - Placement: Functional requirements / past solutions
   - Proof: industry-style case studies

4. Testimonials page
   - Placement: Functional requirements / customer feedback
   - Proof: ratings and testimonials

5. Events page
   - Placement: Functional requirements / events
   - Proof: upcoming/promotional event support

6. Gallery page
   - Placement: Functional requirements / gallery
   - Proof: promotional imagery and event media

7. Articles page
   - Placement: Functional requirements / company promotion
   - Proof: article publishing

8. Contact form empty validation
   - Placement: Testing / validation
   - Proof: client-side validation

9. Contact form successful submission
   - Placement: Functional requirements / inquiry capture
   - Proof: successful inquiry workflow

10. MongoDB inquiry record
    - Placement: Database design
    - Proof: persistence of form submission

11. Admin login
    - Placement: Authentication section
    - Proof: secured admin entry point

12. Admin dashboard
    - Placement: Admin features section
    - Proof: KPI overview

13. Inquiry management table
    - Placement: Admin features / inquiry management
    - Proof: admin access to inquiry data

14. Inquiry detail/status update
    - Placement: Admin features / status workflow
    - Proof: notes and status update capability

15. Analytics charts
    - Placement: Analytics section
    - Proof: charts and management insights

16. Platform settings / uploaded logo
    - Placement: Content management / admin configuration
    - Proof: editable branding and logo upload

17. Responsive mobile view
    - Placement: Non-functional requirements
    - Proof: responsive design

18. Backend API test in Postman
    - Placement: API/testing section
    - Proof: route operation and security

19. Running backend/frontend terminals
    - Placement: Deployment / setup
    - Proof: local execution

20. Optional AI assistant
    - Placement: Additional features / innovation
    - Proof: Gemini integration and enhanced UX

## 14. Suggested Diagrams

- System architecture diagram
  - User browser
  - React/Vite frontend
  - API client (`client/src/lib/api.ts`)
  - Express backend
  - Authentication middleware
  - MongoDB database
  - Uploads folder/static file service
  - Gemini API external service

- Use case diagram
  - Actors:
    - Visitor
    - Admin
    - External Gemini API
  - Visitor use cases:
    - View pages
    - View services/portfolio/blogs/events/gallery/testimonials
    - Submit contact form
    - Ask AI assistant
  - Admin use cases:
    - Log in
    - View dashboard
    - View inquiries
    - Update inquiry status
    - Add notes
    - Delete inquiry
    - Manage content
    - Upload images
    - Update site settings
    - Change password

- Activity diagram for inquiry submission
  - Open contact page
  - Enter form details
  - Client validation
  - Submit to API
  - Server validation and sanitisation
  - Save inquiry to MongoDB
  - Return reference ID/success message
  - If API unavailable, local fallback cache path

- Sequence diagram for admin login
  - Admin -> frontend login form
  - Frontend -> `/api/auth/login`
  - Backend -> MongoDB admin user lookup
  - Backend -> bcrypt password compare
  - Backend -> JWT generation
  - Backend -> frontend token response
  - Frontend -> localStorage token save
  - Frontend -> protected admin page

- ER / database diagram
  - Include all nine collections listed in section 7
  - Show admin managing inquiries/content/settings
  - Note document-oriented design with no explicit foreign keys

- Deployment diagram
  - Local/dev:
    - Browser -> Vite frontend on 5173
    - Vite proxy or direct backend calls -> Express API on 5000
    - Express -> MongoDB
    - Express -> Gemini API
  - Hosted assumption:
    - Render Static Site -> Render Web Service -> MongoDB Atlas

## 15. Methodology Evidence

Agile / iterative prototyping can be justified from the repository state and change patterns:

- Requirements gathering
  - Public and admin features directly match a business-style requirements list: services, portfolio, testimonials, blogs, events, gallery, contact form, admin management.

- Prototype development
  - Seeded demo content exists in [server/src/data.js](C:/Users/Lenovo/Desktop/product_development_code/server/src/data.js) and fallback frontend data in [client/src/data.ts](C:/Users/Lenovo/Desktop/product_development_code/client/src/data.ts).
  - This suggests rapid prototyping before or alongside full API persistence.

- Client feedback / iteration evidence
  - Code now includes public route fixes, gallery/testimonials expansion, uploaded-image support, editable branding, admin dashboard redesign, and URL-based admin routing.
  - This strongly supports an iterative improvement story.

- Frontend redesign
  - Home page, dashboard charts, and admin branding show redesign/refinement evidence.
  - Manual history-based route handling in [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx) also suggests iterative adaptation rather than a single initial implementation.

- Testing
  - Manual test plan exists in [TESTING.md](C:/Users/Lenovo/Desktop/product_development_code/TESTING.md), which fits a prototype/project workflow even though automated tests are absent.

- Final deployment
  - [DEPLOYMENT.md](C:/Users/Lenovo/Desktop/product_development_code/DEPLOYMENT.md) shows a documented path to local and hosted deployment.

Suggested report wording:

- Initial prototype built with seeded/static content
- Backend API then integrated for live persistence
- Admin capabilities expanded iteratively
- Public UI redesigned to better match client-facing presentation needs
- Final version prepared with deployment and manual testing guidance

## 16. Critical Reflection Notes

### What went well

- Strong full-stack integration across frontend, backend, and MongoDB
- Good feature coverage for a CET333 portfolio submission
- Public and admin systems are clearly separated
- Site settings and image upload features improve realism
- Inquiry management workflow is practical and demonstrable
- AI assistant adds innovation/value beyond core requirements

### Challenges

- Frontend redesign and route alignment likely required reworking navigation logic
- Public/admin API alignment required repeated endpoint corrections
- Handling uploaded image paths and static serving added backend complexity
- Manual history-based routing is more fragile than using a mature routing library

### Frontend redesign issue

- Evidence suggests redesign happened after initial implementation
- Good reflection point:
  - redesign improved visual quality but increased integration/debugging work

### Documentation challenge

- README is partly outdated and claims libraries not currently used
- Good reflection point:
  - keeping documentation synchronized with code is difficult during fast iteration

### Testing limitations

- No automated tests were found
- Only manual testing guidance exists
- Good reflection point:
  - time constraints likely pushed testing toward manual verification

### Security improvements

- JWT in localStorage
- no RBAC
- no CSRF protection
- no audit trail
- default seeded credentials

### Future enhancements

- automated testing
- proper React Router integration or equivalent
- cookie-based auth
- pagination/filtering improvements
- stronger analytics and reporting
- role-based admin permissions
- richer deployment automation

## 17. Missing or Weak Areas

| Missing / weak area | Evidence | Recommendation |
|---|---|---|
| No automated tests | No test framework/dependencies found | Mention as limitation and future work |
| Outdated README | Claims React Router, Recharts, Axios though code does not currently use them | Fix quickly if time; otherwise mention documentation drift |
| No server `.env.example` found | Repository listing did not show one | Fix quickly if time |
| No Docker / CI / infrastructure config | No Dockerfile, compose, CI pipeline, Render YAML | Mention as limitation/future work |
| Security could be stronger | localStorage tokens, no CSRF, no RBAC | Mention in critical reflection/future work |
| Service analytics weakened | Contact form now submits blank service field; newer service charts may be incomplete | Fix quickly if service selection is still a requirement, otherwise mention as scope change |
| Analytics page visuals are partially decorative | `AdminAnalyticsView` includes stylized charts rather than data-rich chart library | Mention as partial analytics implementation if needed |
| No pagination / sorting for large datasets | Inquiry/content views are manageable now but may not scale well | Mention as future enhancement |
| Manual routing instead of router library | [client/src/App.tsx](C:/Users/Lenovo/Desktop/product_development_code/client/src/App.tsx) handles history manually | Mention as design tradeoff |
| Some strings/docs still reflect academic/demo context | Example: seeded credentials displayed in login, demo wording in docs | Acceptable for coursework, but mention as prototype characteristic |

### Strongest evidence summary

- Full MERN structure is present and working:
  - React/Vite frontend
  - Express/MongoDB backend
  - Mongoose models
  - JWT/bcrypt authentication
  - inquiry submission and admin management
  - content CRUD
  - image upload
  - editable site settings
- There is strong report evidence for functional requirements, database design, API design, and admin security.

### Weakest gaps summary

- No automated tests
- Documentation drift between README and actual code
- Deployment setup is documented but not infrastructure-as-code
- Security is acceptable for coursework but not production-grade
- Some analytics evidence is more presentational than enterprise-level
