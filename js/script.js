/* ============================================================
   SCRIPT.JS — Jyoti Portfolio Website
   ============================================================ */

/* ── LOADER ─────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 800);
});

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverTargets = 'a, button, .makeup-card, .model-card, .service-card, .identity-card';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => { follower.style.width = '52px'; follower.style.height = '52px'; });
    el.addEventListener('mouseleave', () => { follower.style.width = '32px'; follower.style.height = '32px'; });
  });
})();

/* ── NAVBAR SCROLL ──────────────────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Active link highlight based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) link.classList.add('active');
  });
})();

/* ── MOBILE MENU ────────────────────────────────────────────── */
window.toggleMenu = function() {
  const nav  = document.getElementById('mobileNav');
  const ham  = document.getElementById('hamburger');
  const open = nav.classList.toggle('open');
  ham.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
};

// Close on nav link click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#mobileNav a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('mobileNav').classList.remove('open');
      document.getElementById('hamburger').classList.remove('open');
      document.body.style.overflow = '';
    });
  });
});

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
})();

/* ── STAGGER CARDS ──────────────────────────────────────────── */
(function initStagger() {
  const staggerObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const children = e.target.querySelectorAll(
          '.makeup-card, .model-card, .service-card, .specialty-card, .identity-card, .stat-card'
        );
        children.forEach((c, i) => {
          c.style.transitionDelay = (i * 0.07) + 's';
          c.classList.add('visible');
        });
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll(
    '.makeup-grid, .model-grid, .services-grid, .specialties-grid, .identity-cards'
  ).forEach(el => staggerObs.observe(el));
})();

/* ── LIGHTBOX ───────────────────────────────────────────────── */
window.openLightbox = function(card) {
  const img = card.querySelector('img');
  if (!img) return;
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxImg').alt = img.alt;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ── SUPABASE FORMS ─────────────────────────────────────────── */
const SUPABASE_URL  = 'https://lrlxdhoithuodjtekvlc.supabase.co';
const SUPABASE_ANON = 'sb_publishable_M_Hu6DdgPKu7qMU4PeJ-Kw_gxHOl6S-';

function getSupabase() {
  return supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
}

function showSuccess(id, formEl) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.cssText = '';
  el.innerHTML = '<i class="fas fa-check-circle" style="margin-right:.5rem;"></i>Received! Jyoti will contact you within 24 hours.';
  el.classList.add('show');
  if (formEl) formEl.reset();
  setTimeout(() => el.classList.remove('show'), 7000);
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.background    = 'rgba(200,60,60,.12)';
  el.style.borderColor   = '#c83c3c';
  el.style.color         = '#e08080';
  el.innerHTML = `<i class="fas fa-exclamation-circle" style="margin-right:.5rem;"></i>${msg}`;
  el.classList.add('show');
  setTimeout(() => { el.classList.remove('show'); el.style.cssText = ''; }, 8000);
}

function setLoading(btn, loading) {
  if (!btn.dataset.label) btn.dataset.label = btn.textContent;
  btn.disabled    = loading;
  btn.textContent = loading ? 'Sending…' : btn.dataset.label;
}

/* Makeup booking form */
window.handleMakeupBooking = async function(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  setLoading(btn, true);
  const f = e.target.querySelectorAll('input, select, textarea');
  const [full_name, phone, event_type, event_date, location, makeup_type, message] = [...f].map(x => x.value);
  const { error } = await getSupabase().from('makeup_bookings').insert([{ full_name, phone, event_type, event_date, location, makeup_type, message }]);
  setLoading(btn, false);
  error ? showError('makeupSuccess', 'Something went wrong. Please WhatsApp directly!') : showSuccess('makeupSuccess', e.target);
};

/* Model booking form */
window.handleModelBooking = async function(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  setLoading(btn, true);
  const f = e.target.querySelectorAll('input, select, textarea');
  const [brand_name, photographer, shoot_type, budget, shoot_date, location, message] = [...f].map(x => x.value);
  const { error } = await getSupabase().from('model_bookings').insert([{ brand_name, photographer, shoot_type, budget, shoot_date, location, message }]);
  setLoading(btn, false);
  error ? showError('modelSuccess', 'Something went wrong. Please WhatsApp directly!') : showSuccess('modelSuccess', e.target);
};

/* General contact form */
window.handleContact = async function(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  setLoading(btn, true);
  const f = e.target.querySelectorAll('input, select, textarea');
  const [name, phone, email, subject, message] = [...f].map(x => x.value);
  const { error } = await getSupabase().from('contact_messages').insert([{ name, phone, email, subject, message }]);
  setLoading(btn, false);
  error ? showError('contactSuccess', 'Something went wrong. Please WhatsApp directly!') : showSuccess('contactSuccess', e.target);
};

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });
});
