/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; });
function animateCursor() { cursorX += (mouseX - cursorX) * 0.15; cursorY += (mouseY - cursorY) * 0.15; cursor.style.left = cursorX + 'px'; cursor.style.top = cursorY + 'px'; requestAnimationFrame(animateCursor); }
animateCursor();
document.querySelectorAll('a, button, .timeline-card, .team-card, .value-card, .mv-card, .presence-office, .trust-card, .testimonial-card, .award-wall-card, .map-marker').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

/* ─── SCROLL PROGRESS ─── */
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (window.scrollY / docHeight * 100) + '%';
});

/* ─── HEADER SCROLL ─── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => { header.classList.toggle('scrolled', window.scrollY > 50); });

/* ─── SECTION INDICATOR ─── */
const indicator = document.getElementById('sectionIndicator');
const indicatorLinks = indicator.querySelectorAll('a');
const sections = ['story','timeline','mission','values','team','presence','awards','testimonials'];
window.addEventListener('scroll', () => {
  indicator.classList.toggle('visible', window.scrollY > 400);
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 300) current = id;
  });
  indicatorLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* ─── HERO PARALLAX ─── */
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => { heroBg.style.transform = `translateY(${window.scrollY * 0.4}px) scale(1.1)`; });

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .clip-reveal, .clip-reveal-left').forEach(el => revealObserver.observe(el));

/* ─── TEXT REVEAL ON HEADINGS ─── */
document.querySelectorAll('.has-reveal').forEach(h => {
  const text = h.textContent;
  h.innerHTML = '';
  const words = text.split(' ');
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'text-reveal';
    span.style.display = 'inline-block';
    span.style.marginRight = '0.3em';
    span.innerHTML = `<span class="text-reveal-inner">${word}</span>`;
    h.appendChild(span);
  });
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        h.querySelectorAll('.text-reveal').forEach((span, i) => {
          setTimeout(() => span.classList.add('visible'), i * 80);
        });
        textObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  textObserver.observe(h);
});

/* ─── PHOTO REVEAL ─── */
document.querySelectorAll('.reveal-photo').forEach(photo => revealObserver.observe(photo));

/* ─── COUNTER + FILL ANIMATION ─── */
function animateCounter(el) {
  if (el.dataset.animated) return; el.dataset.animated = 'true';
  const target = parseFloat(el.dataset.target), suffix = el.dataset.suffix || '';
  const isDecimal = target % 1 !== 0, duration = 2000, start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.trust-number').forEach(c => animateCounter(c));
      entry.target.querySelectorAll('.trust-card').forEach(card => card.classList.add('fill'));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.trust-section').forEach(s => counterObserver.observe(s));

/* ─── TIMELINE EXPAND ─── */
function toggleTimeline(item) {
  const card = item.querySelector('.timeline-card');
  const wasExpanded = card.classList.contains('expanded');
  document.querySelectorAll('.timeline-card').forEach(c => c.classList.remove('expanded'));
  if (!wasExpanded) card.classList.add('expanded');
}

/* ─── MAP TOOLTIPS ─── */
const tooltip = document.getElementById('mapTooltip');
const tooltipTitle = document.getElementById('tooltipTitle');
const tooltipAddr = document.getElementById('tooltipAddr');
const tooltipPhone = document.getElementById('tooltipPhone');
const officeData = {
  bd: { title: 'Bangladesh HQ', addr: '4 Offices: Dhanmondi, Banani, Chattogram, Uttara', phone: '+880 9609 80 03 00' },
  au: { title: 'Australia', addr: '6 Offices: Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra', phone: '+61 2 8005 7000' },
  in: { title: 'India', addr: '2 Offices: New Delhi, Mumbai', phone: '+91 11 4000 8000' },
  lk: { title: 'Sri Lanka', addr: 'Colombo', phone: '+94 11 2000 800' }
};
document.querySelectorAll('.map-marker').forEach(marker => {
  marker.addEventListener('mouseenter', () => {
    const key = marker.dataset.office;
    const data = officeData[key];
    tooltipTitle.textContent = data.title;
    tooltipAddr.textContent = data.addr;
    tooltipPhone.textContent = data.phone;
    const rect = marker.getBoundingClientRect();
    const mapRect = document.getElementById('presenceMap').getBoundingClientRect();
    tooltip.style.left = (rect.left - mapRect.left + 20) + 'px';
    tooltip.style.top = (rect.top - mapRect.top - 10) + 'px';
    tooltip.classList.add('active');
  });
  marker.addEventListener('mouseleave', () => { tooltip.classList.remove('active'); });
});

/* ─── MAGNETIC BUTTONS ─── */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => { const rect = btn.getBoundingClientRect(); btn.style.transform = `translate(${(e.clientX - rect.left - rect.width/2) * 0.3}px, ${(e.clientY - rect.top - rect.height/2) * 0.3}px)`; });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ─── CTA PARTICLES ─── */
const ctaParticles = document.getElementById('ctaParticles');
for (let i = 0; i < 15; i++) {
  const p = document.createElement('div');
  p.className = 'cta-particle';
  p.style.width = Math.random() * 6 + 2 + 'px';
  p.style.height = p.style.width;
  p.style.left = Math.random() * 100 + '%';
  p.style.top = Math.random() * 100 + '%';
  p.style.animationDelay = Math.random() * 10 + 's';
  p.style.animationDuration = (Math.random() * 6 + 8) + 's';
  ctaParticles.appendChild(p);
}

/* ─── SCROLL TO TOP ─── */
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => { scrollBtn.classList.toggle('show', window.scrollY > 600); });
scrollBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
