# Next Features to Implement

## 1) Backend & Security
- Replace localStorage auth with real backend auth (hashed password + session/JWT refresh flow).
- Add role-based access (owner/admin/editor).
- Add rate limiting and login lockout.
- Add CSRF and strict security headers.

## 2) Data & Storage
- Move content to MongoDB with version history (undo/rollback).
- Add image upload to cloud storage (Cloudinary/S3) instead of URL-only input.
- Add backup/export scheduler for portfolio JSON and media metadata.

## 3) Content Editing UX
- Rich text editor for about/experience/project sections.
- Drag-and-drop reorder for photos, projects, and certificates.
- Inline add/remove controls for all lists (skills, achievements, project bullets).
- Draft mode + publish button.

## 4) Portfolio Features
- Dedicated project pages with architecture diagrams and metrics cards.
- Resume PDF upload with auto-preview.
- Contact form with email notifications and spam protection.
- Blog/notes section with markdown support.

## 5) Performance, SEO, Analytics
- Open Graph images per project and sitemap/robots generation.
- Core Web Vitals budget + Lighthouse CI.
- Privacy-friendly analytics dashboard for visitor insights.

## 6) DevOps
- Dockerfile + docker-compose for one-command local run.
- CI pipeline: lint, typecheck, tests, and build artifacts.
- Auto-generate downloadable ZIPs from CI release workflow.
