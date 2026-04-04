

## AI-Powered Personal Brand Website — Full Build Plan

### Phase 1: Homepage & Brand Foundation
- **Hero section** with motivational tagline, mission statement, and animated CTA buttons ("Book a Session", "Get Resume Review", "Daily Motivation")
- **Services section** — 4 service cards: Resume Review, LinkedIn Optimization, Ghostwriting, Personal Mentorship (with icons, descriptions, pricing hints)
- **Testimonials section** with placeholder testimonials in a carousel
- **Footer** with social links and contact info
- Modern, mobile-first design with smooth scroll animations and a professional motivational theme (dark/gradient accents)

### Phase 2: Lead Capture System
- **Popup modal** that appears after 5 seconds on first visit (with localStorage to not re-show)
- Collects: Name, Email, Phone Number
- Stores leads in Supabase database with timestamp and source tracking
- **Automated welcome email** sent on registration (using Lovable's built-in email system) with services overview and booking link

### Phase 3: AI Content Generator (Admin)
- **Admin dashboard page** (protected route) with content generation controls:
  - Topic input / suggestions
  - Mood selector (Motivational, Strict, Storytelling)
  - Target audience selector (Freshers, IT Professionals, Students)
  - Content type selector (Motivation, IT Career Tips, Study Strategies, Job Search)
- AI generates: Caption (150-300 words with hook/value/CTA format), hashtags, image suggestion, optional video script
- **Content history** — view and manage past generated content
- "Copy to Clipboard" and placeholder "Post Now" / "Schedule Post" buttons

### Phase 4: Public Daily Motivation Page
- `/daily-motivation` page showing the latest AI-generated content
- Content feed with filtering by category
- Share buttons for social media

### Phase 5: Session Booking System
- **Service selection** page with detailed service descriptions and pricing
- **Time slot picker** (calendar-based, stored in Supabase)
- **Razorpay payment integration** via edge function for processing payments
- Booking confirmation stored in database + confirmation email sent

### Phase 6: Ghostwriting Service Flow
- **3 free sample works** displayed publicly
- Content lock after previewing — CTA "Get Premium Ghostwriting" triggers lead capture/booking
- Follow-up email with pricing, benefits, and before/after transformation examples

### Phase 7: Admin Dashboard
- **Metrics overview**: Total users, leads, bookings, payments
- **User management**: View leads, tag by service interest, filter by behavior
- **Content management**: Generate, edit, and manage AI content
- **Email template management**: View and customize email flows

### Phase 8: Email Automation Flows
- Separate email sequences for:
  - LinkedIn service inquirers (follow-ups + upsells)
  - Resume review users (reminders + results)
  - Ghostwriting users (pricing + benefits + transformation stories)

### Phase 9: Placeholder Integrations
- WhatsApp button (links to wa.me with pre-filled message)
- Instagram/LinkedIn posting — placeholder UI in admin with "Coming Soon" badges
- AI Chatbot — floating chat widget placeholder
- AI Calling — placeholder section in admin dashboard

### Database Schema
- `leads` — name, email, phone, source, created_at
- `bookings` — user_id, service_type, time_slot, payment_status, amount
- `payments` — booking_id, razorpay_payment_id, status, amount
- `ai_content` — type, mood, audience, caption, hashtags, image_suggestion, video_script, created_at
- `services` — name, description, price, duration
- `user_tags` — user_id, tag (for CRM-style segmentation)
- User roles table for admin access control

