/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .service-card, .dest-card, .arrow-btn, .office-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

/* ─── SCROLL PROGRESS ─── */
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (scrollTop / docHeight * 100) + '%';
});

/* ─── HEADER SCROLL EFFECT ─── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

/* ─── SCROLL REVEAL (Intersection Observer) ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.querySelector('.stat-number')) {
        entry.target.querySelectorAll('.stat-number').forEach(counter => animateCounter(counter));
      }
      if (entry.target.id === 'stepsLine') {
        entry.target.classList.add('animate');
      }
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => revealObserver.observe(el));

/* ─── COUNTER ANIMATION ─── */
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ─── PARALLAX HERO ─── */
const monuments = document.querySelectorAll('.monument');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  monuments.forEach(m => {
    const speed = parseFloat(m.dataset.speed);
    m.style.transform = `translateY(${scrollY * speed * 0.3}px)`;
  });
});

/* ─── FLOATING PARTICLES ─── */
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 20; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.width = Math.random() * 4 + 2 + 'px';
  p.style.height = p.style.width;
  p.style.left = Math.random() * 100 + '%';
  p.style.top = Math.random() * 100 + '%';
  p.style.animationDelay = Math.random() * 8 + 's';
  p.style.animationDuration = (Math.random() * 4 + 6) + 's';
  particlesContainer.appendChild(p);
}

/* ─── 3D TILT CARDS ─── */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    if (card.classList.contains('service-card')) {
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    }
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── BLUR-LOAD IMAGES ─── */
document.querySelectorAll('.blur-load img').forEach(img => {
  if (img.complete) {
    img.parentElement.classList.remove('blur-load');
    img.parentElement.classList.add('loaded');
  } else {
    img.addEventListener('load', () => {
      img.parentElement.classList.remove('blur-load');
      img.parentElement.classList.add('loaded');
    });
  }
});


/* ─── DESTINATIONS CAROUSEL ─── */
const destScroll = document.getElementById('destScroll');
const destPrev = document.getElementById('destPrev');
const destNext = document.getElementById('destNext');
const destDots = document.querySelectorAll('#destinations .dot');
let destAutoScroll;

function scrollDest(dir) {
  const cardWidth = destScroll.querySelector('.dest-card').offsetWidth + 24;
  destScroll.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
}

destPrev.addEventListener('click', () => {
  scrollDest(-1);
  resetDestAuto();
});

destNext.addEventListener('click', () => {
  const isEnd = destScroll.scrollLeft + destScroll.offsetWidth >= destScroll.scrollWidth - 10;
  if (isEnd) destScroll.scrollTo({ left: 0, behavior: 'smooth' });
  else scrollDest(1);
  resetDestAuto();
});

function startDestAuto() {
  destAutoScroll = setInterval(() => {
    const isEnd = destScroll.scrollLeft + destScroll.offsetWidth >= destScroll.scrollWidth - 10;
    if (isEnd) destScroll.scrollTo({ left: 0, behavior: 'smooth' });
    else scrollDest(1);
  }, 4000);
}

function resetDestAuto() {
  clearInterval(destAutoScroll);
  startDestAuto();
}

destScroll.addEventListener('mouseenter', () => clearInterval(destAutoScroll));
destScroll.addEventListener('mouseleave', () => startDestAuto());

// Sync Dots with Scroll
destScroll.addEventListener('scroll', () => {
  const cardWidth = destScroll.querySelector('.dest-card').offsetWidth + 24;
  const index = Math.round(destScroll.scrollLeft / cardWidth);
  destDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index % destDots.length);
  });
});

destDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    const cardWidth = destScroll.querySelector('.dest-card').offsetWidth + 24;
    destScroll.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
    resetDestAuto();
  });
});

// Start auto-scroll when section is visible
const destObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) startDestAuto();
  else clearInterval(destAutoScroll);
}, { threshold: 0.2 });
destObserver.observe(destScroll);

/* ─── AWARDS SLIDER ─── */
const awardsSlider = document.getElementById('awardsSlider');
document.getElementById('awardPrev').addEventListener('click', () => {
  awardsSlider.scrollBy({ left: -340, behavior: 'smooth' });
});
document.getElementById('awardNext').addEventListener('click', () => {
  awardsSlider.scrollBy({ left: 340, behavior: 'smooth' });
});

/* ─── SCROLL TO TOP ─── */
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) scrollBtn.classList.add('show');
  else scrollBtn.classList.remove('show');
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── MAGNETIC BUTTONS ─── */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ─── DOTS INTERACTION ─── */
document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});

// FAQ Accordion Toggle
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(otherItem => otherItem.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});
