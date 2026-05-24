/* ============================================================
   GALLERY.JS — Jyoti Portfolio Website
   ============================================================ */

/* ── PORTFOLIO FILTER (Makeup Page) ────────────────────────── */
window.filterPortfolio = function(cat, btn) {
  document.querySelectorAll('.portfolio-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('#makeupGrid .makeup-card');
  cards.forEach((card, i) => {
    const show = cat === 'all' || card.dataset.cat === cat;
    card.style.display = show ? '' : 'none';
    if (show) {
      card.style.transitionDelay = (i * 0.05) + 's';
      card.classList.add('visible');
    }
  });
};

/* ── MODEL PORTFOLIO FILTER ─────────────────────────────────── */
window.filterModel = function(cat, btn) {
  document.querySelectorAll('.portfolio-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('#modelGrid .model-card');
  cards.forEach((card, i) => {
    const show = cat === 'all' || card.dataset.mcat === cat;
    card.style.display = show ? '' : 'none';
    if (show) {
      card.style.transitionDelay = (i * 0.05) + 's';
      card.classList.add('visible');
    }
  });
};

/* ── GALLERY PAGE FILTER ────────────────────────────────────── */
window.filterGallery = function(cat, btn) {
  document.querySelectorAll('.gallery-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const items = document.querySelectorAll('.gallery-item');
  items.forEach((item, i) => {
    const show = cat === 'all' || item.dataset.gcat === cat;
    item.style.display = show ? '' : 'none';
    if (show) {
      item.style.opacity     = '0';
      item.style.transform   = 'scale(.96)';
      setTimeout(() => {
        item.style.transition = 'opacity .4s ease, transform .4s ease';
        item.style.opacity    = '1';
        item.style.transform  = 'scale(1)';
      }, i * 40);
    }
  });
};

/* ── ENHANCED LIGHTBOX with navigation ─────────────────────── */
(function initLightbox() {
  let allImages = [];
  let currentIndex = 0;

  function buildImageList() {
    allImages = [...document.querySelectorAll(
      '.makeup-card img, .model-card img, .gallery-item img'
    )];
  }

  window.openLightboxWithNav = function(card) {
    buildImageList();
    const img = card.querySelector('img');
    if (!img) return;
    currentIndex = allImages.indexOf(img);
    showLightboxImage(currentIndex);
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function showLightboxImage(index) {
    if (!allImages[index]) return;
    const lbImg = document.getElementById('lightboxImg');
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src     = allImages[index].src;
      lbImg.alt     = allImages[index].alt;
      lbImg.style.opacity = '1';
      lbImg.style.transition = 'opacity .3s';
    }, 150);

    // counter
    const counter = document.getElementById('lightboxCounter');
    if (counter) counter.textContent = `${index + 1} / ${allImages.length}`;
  }

  window.lightboxNext = function() {
    if (allImages.length === 0) return;
    currentIndex = (currentIndex + 1) % allImages.length;
    showLightboxImage(currentIndex);
  };

  window.lightboxPrev = function() {
    if (allImages.length === 0) return;
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    showLightboxImage(currentIndex);
  };

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'ArrowLeft')  lightboxPrev();
  });
})();

/* ── LAZY LOAD IMAGES ───────────────────────────────────────── */
(function initLazyLoad() {
  if (!('IntersectionObserver' in window)) return;
  const lazyObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        lazyObs.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => lazyObs.observe(img));
})();
