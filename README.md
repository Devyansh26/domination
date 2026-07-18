# EmerGen — Health Emergency Response Portal

> **Problem Code: MED-02** · Built by Team EmerGen

A dark-themed, full-stack Next.js web application that provides rapid access to emergency contacts, nearby healthcare facilities, and critical medical information. Every section is designed for clarity and speed — because every second counts.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages & Sections](#pages--sections)
  - [Landing Page (`/`)](#landing-page-)
    - [Header & Navigation](#header--navigation)
    - [Hero Section](#hero-section)
    - [Value Section](#value-section)
    - [How It Works Section](#how-it-works-section)
    - [CTA Section](#cta-section)
    - [Footer](#footer)
  - [Emergency Contacts (`/emergency-contacts`)](#emergency-contacts-emergency-contacts)
  - [Healthcare Facilities (`/healthcare-facilities`)](#healthcare-facilities-healthcare-facilities)
  - [Medical Information (`/medical-info`)](#medical-information-medical-info)
- [Team](#team)
- [Disclaimer](#disclaimer)

---

## Overview

EmerGen is a health emergency response interface designed for speed and accessibility. It consolidates three critical emergency resources into a single, unified portal:

1. **Emergency Contacts** — one-tap calling, location detection, and a downloadable Medical ID card.
2. **Healthcare Facilities** — an interactive Leaflet map with real-time filtering of hospitals, urgent care, pharmacies, and more.
3. **Medical Information** — a searchable, evidence-based reference covering first aid, symptom checking, medications, conditions, and emergency procedures.

The interface is fully **mobile-responsive**, uses **scroll-driven animations** via Framer Motion, and is built with a dark glassmorphism design system.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| Map | Leaflet + React-Leaflet |
| Icons | Lucide React |
| Fonts | IBM Plex Serif (headings), Inter (body) via Google Fonts |
| Geocoding | Nominatim / OpenStreetMap Reverse Geocoding API |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

> **Build for production:**
> ```bash
> npm run build && npm start
> ```

---

## Project Structure

```
domination/
├── app/
│   ├── layout.tsx                  # Root layout (fonts, metadata, Header)
│   ├── globals.css                 # Global styles, design tokens, Tailwind theme
│   ├── page.tsx                    # Landing page (assembles all sections)
│   │
│   ├── components/
│   │   ├── Header.tsx              # Fixed nav with mobile slide-out menu
│   │   ├── HeroSection.tsx         # Scroll-driven body system animation
│   │   ├── ValueSection.tsx        # Core capabilities cards
│   │   ├── HowItWorksSection.tsx   # 3-step numbered timeline
│   │   ├── CTASection.tsx          # Call-to-action with navigation links
│   │   ├── Footer.tsx              # Team info, links, social icons
│   │   ├── EmergencyButton.tsx     # Animated emergency button with dropdown
│   │   └── emergency/
│   │       └── EmergencyContactCard.tsx  # Contact card grid component
│   │
│   ├── emergency-contacts/
│   │   └── page.tsx                # Emergency Contacts full page
│   │
│   ├── healthcare-facilities/
│   │   ├── page.tsx                # Healthcare Facilities full page
│   │   └── HealthcareFacilitiesMap.tsx  # Leaflet map component (SSR-disabled)
│   │
│   └── medical-info/
│       └── page.tsx                # Medical Information full page
│
├── public/
│   └── body/                       # Layered anatomical body system images
│       ├── 1.png  (Muscular)
│       ├── 2.png  (Circulatory)
│       ├── 3.png  (Skeletal)
│       ├── 4.png  (Lymphatic)
│       └── 5.png  (Nervous)
│
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Pages & Sections

### Landing Page (`/`)

The root page (`app/page.tsx`) composes five section components in sequence:

```
HeroSection → ValueSection → HowItWorksSection → CTASection → Footer
```

---

#### Header & Navigation

**File:** [`app/components/Header.tsx`](app/components/Header.tsx)

A fixed, scroll-aware header with a glassmorphism backdrop blur that activates on scroll.

**Features:**
- **Logo** — EmerGen brand mark with animated entry
- **Desktop nav** — links to Home, Emergency Contacts, Healthcare Facilities, Medical Info with an active underline indicator
- **Emergency Button** — animated pulsing button with a dropdown menu offering: View All Emergency Contacts, Find Nearest ER, Call 911 Now
- **Mobile hamburger** — opens a full-height slide-in drawer from the right with all nav links and an Emergency Now CTA button
- Scroll-driven `background`, `opacity`, and `blur` transitions via Framer Motion `useTransform`

---

#### Hero Section

**File:** [`app/components/HeroSection.tsx`](app/components/HeroSection.tsx)

A scroll-driven, split-layout experience showcasing five human body systems with stacked anatomical figures.

**Desktop layout (≥ md):**
- **Left column (sticky):** A full-viewport sticky panel with layered anatomical body images (muscular, circulatory, skeletal, lymphatic, nervous) that fade in progressively as the user scrolls. A backdrop video plays behind the figures on initial load. Progress dots track the active figure.
- **Right column (scrolling):** Title block + one info panel per body system, each 100vh tall so text and figures stay in sync.

**Mobile layout (< md):**
- A fixed-aspect-ratio figure panel (60vw, 260–420px) at the top showing all body layers.
- Below it, all system info panels stack naturally with subtle separator lines — no sticky positioning needed.

**Body systems covered:** Muscular · Circulatory · Skeletal · Lymphatic · Nervous

---

#### Value Section

**File:** [`app/components/ValueSection.tsx`](app/components/ValueSection.tsx)

A 3-column grid (stacks to 1 column on mobile) highlighting the platform's core capabilities.

| Card | Description |
|---|---|
| 🔵 Emergency Contacts | One-tap access to local emergency services, poison control, and crisis hotlines |
| 📍 Nearby Facilities | Real-time proximity search for hospitals, urgent care centers, and pharmacies |
| 📋 Critical Medical Info | Instant retrieval of allergies, medications, blood type, and conditions |

Cards animate in with staggered `whileInView` transitions.

---

#### How It Works Section

**File:** [`app/components/HowItWorksSection.tsx`](app/components/HowItWorksSection.tsx)

A vertical numbered timeline with a hairline decorative rule, explaining the platform in three steps.

| Step | Title | Description |
|---|---|---|
| 01 | Register | Create your secure health profile in under 60 seconds |
| 02 | Connect | Link to emergency services and nearby healthcare providers |
| 03 | Respond | Access critical information instantly when every second counts |

---

#### CTA Section

**File:** [`app/components/CTASection.tsx`](app/components/CTASection.tsx)

A full-width, centered call-to-action block.

- **Headline:** "Ready to prepare for what matters most?"
- **Navigation buttons** (full-width on mobile, inline on sm+): Emergency Contacts · Healthcare Facilities · Medical Info
- **Get Started** button — outlined, minimal style
- All buttons use blue gradient fills for visual hierarchy

---

#### Footer

**File:** [`app/components/Footer.tsx`](app/components/Footer.tsx)

A 3-column footer (stacks on mobile) with team attribution, quick links, and social connections.

| Column | Contents |
|---|---|
| Team EmerGen | Project description, Problem Code, team member list (Devyansh Aggarwal, Hritabrata Das, Abhinav) |
| Quick Links | Home, Emergency Contacts, Healthcare Facilities, Medical Information |
| Connect | GitHub, LinkedIn, X (Twitter), Email icons + emergency hotline numbers (911, 1-800-222-1222) |

Bottom bar shows copyright and a medical disclaimer note.

---

### Emergency Contacts (`/emergency-contacts`)

**File:** [`app/emergency-contacts/page.tsx`](app/emergency-contacts/page.tsx)

**Sections on this page:**

1. **Hero** — Page title ("Emergency Contacts") with animated entry
2. **Location Banner** — Uses browser Geolocation API + Nominatim reverse geocoding to detect the user's city/region. Shows real-time status (locating → detected → error). Includes an "Update Location" button.
3. **Quick Dial** — A 6-column grid (2-col on mobile) of tap-to-call emergency numbers:
   - 911 Emergency
   - Poison Control (1-800-222-1222)
   - Suicide & Crisis Lifeline (988)
   - Crisis Text Line (741741)
   - Veterans Crisis Line (988 → Press 1)
   - Disaster Distress Helpline (1-800-985-5990)
4. **All Emergency Contacts** — Full categorized contact directory rendered via `EmergencyContactsGrid` component.
5. **Medical ID Card** — A collapsible form to create and download a personal emergency medical card as a `.txt` file. Fields include: name, DOB, blood type, allergies, medications, conditions, primary physician, and emergency contact.
6. **Disclaimer** — Legal notice about the informational nature of the page.

---

### Healthcare Facilities (`/healthcare-facilities`)

**Files:** [`app/healthcare-facilities/page.tsx`](app/healthcare-facilities/page.tsx) · [`app/healthcare-facilities/HealthcareFacilitiesMap.tsx`](app/healthcare-facilities/HealthcareFacilitiesMap.tsx)

**Sections on this page:**

1. **Hero** — Page title ("Healthcare Facilities") with animated entry
2. **Location Banner** — Same geolocation detection as Emergency Contacts page
3. **Filter Bar** — Pill-button tabs to filter by facility type:
   - All Types · Hospitals · Urgent Care · Pharmacies · Clinics · Emergency Dept
   - Distance dropdown filter: Within 1 / 3 / 5 / 10 miles (or All)
4. **Interactive Map** — A full `react-leaflet` map (dynamically imported, SSR disabled) with:
   - Custom-colored markers per facility type
   - A sidebar overlay panel listing nearby facilities sorted by distance, with distance badges, wait time, and 24/7 indicators
   - Click-to-select facility with map pin highlight
   - Mock dataset of 8 NYC-area facilities covering all types
5. **Emergency Quick Access** — 4-button grid for immediate actions: Call 911, Poison Control, Crisis Lifeline, Find ER Near Me (GPS)
6. **Disclaimer** — Notice about facility data accuracy and real-time limitations

---

### Medical Information (`/medical-info`)

**File:** [`app/medical-info/page.tsx`](app/medical-info/page.tsx)

A comprehensive, searchable medical reference database organized by category tabs.

**Sections on this page:**

1. **Hero** — Page title ("Medical Information") with animated entry
2. **Category Tabs** — Switch between 6 content modules:

| Tab | Icon | Contents |
|---|---|---|
| First Aid Guides | 🛡️ | Step-by-step procedures for CPR, choking, bleeding, burns, seizures, anaphylaxis, fractures |
| Symptom Checker | 🩺 | Urgency-rated symptoms with possible conditions and red-flag warning signs |
| Medication Info | 💊 | Drug profiles (Aspirin, Epinephrine, Nitroglycerin, Insulin, Albuterol) with dosage, warnings, and interactions |
| Medical Conditions | ❤️ | Detailed references for Diabetes, Hypertension, Asthma, Stroke, MI, Sepsis |
| Emergency Procedures | ⚠️ | Stroke FAST protocol, Heart Attack response, Anaphylaxis management |
| Quick Reference | 📖 | Vital signs tables, pediatric vitals, unit conversions, GCS scale, APGAR score, emergency drug doses |

3. **Search Bar** — Filters all visible content in real-time across titles, keywords, uses, and conditions
4. **Content Area** — Expandable accordion cards with `ExpandableCard` component, difficulty/urgency badges, and color-coded severity indicators
5. **Disclaimer** — Medical advice disclaimer

---

## Team

| Name | Role |
|---|---|
| Devyansh Aggarwal | Developer |
| Hritabrata Das | Developer |
| Abhinav | Developer |

**Hackathon Problem Code:** `MED-02`

---

## Disclaimer

> This portal provides emergency contact information and medical reference material for **educational and reference purposes only**. It does not constitute medical advice, diagnosis, or treatment. Always call **911** (or your local emergency number) for life-threatening emergencies. This service does not replace professional medical advice. Location-based services depend on browser geolocation permissions. Emergency numbers may vary by country — for international emergencies, dial **112** (GSM standard).
