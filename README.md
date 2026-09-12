# Dr. Shashank Agrawal — Urology &amp; Uro-Oncology Website

A modern, responsive personal website for **Dr. Shashank Agrawal**, Consultant Urologist &amp; Uro-Oncologist at Sindhu Hospitals, Hyderabad.

## Tech stack

- HTML5 (semantic, accessible markup)
- CSS3 with custom properties (design tokens) — `assets/css/style.css`
- Bootstrap 5.3 (via CDN) for grid, navbar, dropdown, accordion and form components
- Vanilla JavaScript + jQuery — `assets/js/main.js`
- Font Awesome 6 (via CDN) for icons
- Google Fonts — Roboto

No build step is required — everything runs directly in the browser.

## Structure

```
/urology-website
├── index.html                 Home (hero, stats, about, treatments, why-us,
│                               procedures, patient journey, testimonials, FAQ, CTA)
├── about.html                  Full doctor biography and credentials
├── treatments.html             Grid of all 12 treatments + procedures + FAQ
├── blog.html                   Health articles listing
├── book-appointment.html       Dedicated booking page (instant link + callback form)
├── contact.html                Contact info, map embed, "send a message" form
│
├── /treatments                 One detail page per treatment (12 pages)
├── /blog                       3 article detail pages
│
├── /assets
│   ├── /css/style.css          Design tokens, layout, components, animations
│   ├── /js/main.js             Nav, dropdown, reveal animations, counters, validation
│   └── /images/dr-shashank-agrawal.png   Doctor photo (used in hero + about)
│
└── README.md
```

Pages are produced from small Python generator scripts in this session (`gen*.py`) that share one `header()` / `footer()` / `head()` template, so branding, the nav, the dropdown and the sticky social bar stay identical on every page. You don't need Python to run the site — it's plain static HTML — the scripts just kept ~20 pages consistent while building.

## Brand

| Token | Value |
|---|---|
| Primary (deep blue) | `#004890` |
| Secondary (teal) | `#0098A8` |
| Background | `#F5FAFA` |
| Text | `#1F2933` |
| Muted text | `#6B7280` |

Primary and secondary are sampled directly from the real logo (`assets/images/logo-icon-512.png`), so the site's colour scheme matches the logo exactly. All tokens live at the top of `assets/css/style.css` as CSS custom properties — change them there and the whole site updates.

## Logo

- `assets/images/logo-full.png` — full lockup (icon + name + tagline), extracted from the provided logo sheet
- `assets/images/logo-icon-100.png` / `logo-icon-512.png` — icon mark only (no text), genuinely transparent
- `favicon.ico` — multi-resolution (16/32/48/64px) favicon generated from the icon mark

The header and footer show the icon mark **only** — no adjacent "Dr. Shashank Agrawal" text label, per request. The doctor's name still appears in page titles, the hero, and the About page.

## Features

- Sticky header — transparent over the hero, solid white on scroll; native Bootstrap 5 dropdown for Treatments (click/keyboard on all screen sizes, hover-to-open added on desktop via Bootstrap's own `Dropdown` API)
- Mobile menu renders as a solid, self-contained white card below the header (no more content bleeding through behind it), with the header itself going solid while the menu is open
- **Sticky social icon bar** (WhatsApp, Instagram, Facebook) fixed on the right edge on every page — WhatsApp opens a chat pre-filled with a booking message; Instagram/Facebook are placeholder links (see below)
- **Dedicated Book Appointment page** (`book-appointment.html`) — real instant-booking link to the Sindhu Hospitals system, plus a callback-request form; the header's "Book Appointment" button and all on-page CTAs now point here
- **Treatments are uro-oncology-focused**: Robotic Surgery, Kidney Cancer, Bladder Cancer, Prostate Cancer, Penile Cancer, Testicular Cancer, Ureteral Cancer (UTUC), and Second Opinions — replacing the earlier general-urology list, in line with Dr. Agrawal's actual specialty. Each of the 8 treatment pages includes approach-highlight cards, a signs/diagnosis/options breakdown, a Recovery & Outlook section, a "Why Choose Dr. Agrawal" list, 3 FAQs, and a doctor snippet + related-treatments sidebar.
- Scroll-reveal animations via `IntersectionObserver`, animated stat counters, filling patient-journey timeline, back-to-top button — all respecting `prefers-reduced-motion`
- FAQ accordions on the Home, Treatments, and every individual treatment page
- Bootstrap client-side form validation on both appointment forms, with a friendly success message on submit (no backend wired up)
- Basic SEO: unique title/description per page, canonical tags, Open Graph tags, semantic heading hierarchy, descriptive alt text, and `Physician` schema.org structured data on the home page

## Before going live

1. **Add real social links.** Instagram and Facebook in the sticky bar and footer currently point to `#` placeholders — I couldn't verify Sindhu Hospitals' actual social handles, so I left them inert rather than guess. Swap in the real profile URLs.
2. **Confirm the WhatsApp number.** The sticky WhatsApp button currently uses the hospital's landline (`+91 40 4545 4545`) — WhatsApp only works with a mobile number, so replace `WHATSAPP_TEL` with a real WhatsApp-enabled number.
3. **Wire up both appointment forms** (`contact.html` and `book-appointment.html`) to a real backend, booking system, or email service — they currently only validate client-side.
4. **Verify all clinic facts** (address, phone, email, hours, credentials, bio) against the official source before publishing — these were sourced from the doctor's public hospital profile page but should be re-confirmed.
5. **Update the canonical/OG URLs** in each page's `<head>` to your real domain.
6. **Testimonials are paraphrased from two real Google reviews** for Dr. Agrawal (full names shortened to first name + last initial for privacy) — copyright rules mean the on-page text is a paraphrase rather than a verbatim quote. Add more as new reviews come in, and link out to the real Google listing if you'd like visitors to read them in full.
7. **Each treatment page has a "sample patient feedback" quote** in the Advanced Treatment section — these are clearly labeled as placeholders (dashed border, explicit caption) so the doctor can see how a testimonial slot looks on the page. Replace with a real, verified quote per treatment before launch, or remove the block if you'd rather not show one until you have one.
8. **Every treatment page's Advanced Treatment section image** is a text-labeled placeholder (e.g. "Kidney Cancer Treatment") rather than a stock photo — swap in a real procedure, technology, or facility photo for each treatment.
9. **Add Google Analytics / Search Console**, a real `robots.txt` and `sitemap.xml` once the domain is live.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses `IntersectionObserver` and CSS custom properties, both broadly supported; no polyfills are included.
