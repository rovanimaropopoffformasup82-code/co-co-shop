/* =============================================
   co&co shop — JavaScript
   ============================================= */

// ---- Navbar scroll shadow ----
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- Mobile nav toggle ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- Menu tabs ----
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach(p => {
      p.classList.remove('active');
      p.hidden = true;
    });

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const panel = document.getElementById(`tab-${target}`);
    if (panel) {
      panel.classList.add('active');
      panel.hidden = false;
    }
  });
});

// ---- Reservation form ----
const reserveForm = document.querySelector('.reserve-form');
if (reserveForm) {
  // Set min date to today
  const dateInput = reserveForm.querySelector('#date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  reserveForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = reserveForm.querySelector('button[type="submit"]');
    btn.textContent = 'Réservation confirmée ✓';
    btn.style.background = '#4A5D3C';
    btn.style.borderColor = '#4A5D3C';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Confirmer ma réservation';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      reserveForm.reset();
    }, 4000);
  });
}

// ---- Newsletter form ----
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    btn.textContent = 'Inscrit(e) ✓';
    btn.style.background = '#4A5D3C';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "S'inscrire";
      btn.style.background = '';
      btn.disabled = false;
      newsletterForm.reset();
    }, 3000);
  });
}

// ---- Scroll reveal (Intersection Observer) ----
const revealEls = document.querySelectorAll(
  '.menu-card, .value-item, .testimonial, .about-content, .about-visual, .reserve-form-wrap, .reserve-info'
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});
