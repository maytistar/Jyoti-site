/* ============================================================
   SEO.JS — Jyoti Portfolio Website
   ============================================================ */

/* ── INJECT PAGE-SPECIFIC SCHEMA ────────────────────────────── */
(function injectSchema() {
  const page = window.location.pathname;

  const schemas = {
    'bridal-makeup-artist-delhi': {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness","BeautySalon"],
      "name": "Jyoti – Professional Makeup Artist",
      "description": "Professional Makeup Artist based in Patel Nagar, Delhi. Bridal, HD, Party & Engagement Makeup.",
      "url": "https://jyoti-makeup.netlify.app/bridal-makeup-artist-delhi.html",
      "telephone": "+919999405631",
      "email": "Jyotikush87@gmail.com",
      "image": "https://res.cloudinary.com/dsggh3fcj/image/upload/v1779093592/makeup1_osncqr.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Patel Nagar",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110008",
        "addressCountry": "IN"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 28.6428, "longitude": 77.1735 },
      "openingHours": "Mo-Su 08:00-20:00",
      "priceRange": "₹₹",
      "areaServed": ["New Delhi","Delhi NCR","Patel Nagar"],
      "sameAs": ["https://instagram.com/glossupgirl._"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Makeup Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bridal Makeup" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HD Makeup" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Party Makeup" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Engagement Makeup" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hair Styling" } }
        ]
      }
    },
    'model-in-delhi': {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jyoti",
      "jobTitle": "Professional Model",
      "description": "Professional fashion and lifestyle model based in Delhi. Available for brand campaigns, fashion editorials, lookbooks and beauty shoots.",
      "url": "https://jyoti-makeup.netlify.app/model-in-delhi.html",
      "telephone": "+919999405631",
      "email": "Jyotikush87@gmail.com",
      "image": "https://res.cloudinary.com/dsggh3fcj/image/upload/v1779096512/model2_hsahq3.jpg",
      "address": { "@type": "PostalAddress", "addressLocality": "New Delhi", "addressCountry": "IN" },
      "knowsAbout": ["Fashion Modeling","Brand Campaigns","Lookbook Shoots","Beauty Photography","Lifestyle Modeling","Catalogue Shoots"],
      "sameAs": ["https://instagram.com/cielo_.lia97"]
    },
    'index': {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Jyoti – Makeup Artist & Model, Delhi",
      "url": "https://jyoti-makeup.netlify.app/",
      "description": "Official portfolio of Jyoti – professional makeup artist in Patel Nagar, Delhi and professional model in Delhi.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://jyoti-makeup.netlify.app/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  };

  // Match current page to schema
  let key = 'index';
  for (const k of Object.keys(schemas)) {
    if (page.includes(k)) { key = k; break; }
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schemas[key], null, 2);
  document.head.appendChild(script);
})();

/* ── BREADCRUMB SCHEMA ──────────────────────────────────────── */
(function injectBreadcrumb() {
  const breadcrumbEl = document.querySelector('.breadcrumb');
  if (!breadcrumbEl) return;

  const items = [];
  const links = breadcrumbEl.querySelectorAll('a');
  links.forEach((a, i) => {
    items.push({
      "@type": "ListItem",
      "position": i + 1,
      "name": a.textContent.trim(),
      "item": a.href
    });
  });
  const currentText = breadcrumbEl.querySelector('strong');
  if (currentText) {
    items.push({
      "@type": "ListItem",
      "position": items.length + 1,
      "name": currentText.textContent.trim()
    });
  }

  if (items.length === 0) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
})();

/* ── OPEN GRAPH META UPDATER (for SPAs / dynamic content) ───── */
window.updateOGMeta = function(title, description, imageUrl) {
  const setMeta = (prop, content) => {
    let el = document.querySelector(`meta[property="${prop}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el); }
    el.setAttribute('content', content);
  };
  setMeta('og:title', title);
  setMeta('og:description', description);
  if (imageUrl) setMeta('og:image', imageUrl);
  document.title = title;
};
