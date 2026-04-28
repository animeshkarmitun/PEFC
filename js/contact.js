/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; });
function animateCursor() { cursorX += (mouseX - cursorX) * 0.15; cursorY += (mouseY - cursorY) * 0.15; cursor.style.left = cursorX + 'px'; cursor.style.top = cursorY + 'px'; requestAnimationFrame(animateCursor); }
animateCursor();
document.querySelectorAll('a, button, .info-card, .office-card, .faq-question, .form-group input, .form-group select, .form-group textarea').forEach(el => {
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

/* ─── HERO PARALLAX ─── */
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => { heroBg.style.transform = `translateY(${window.scrollY * 0.4}px) scale(1.1)`; });

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => revealObserver.observe(el));

/* ─── FORM HANDLING ─── */
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('consultForm');
  const success = document.getElementById('formSuccess');
  form.style.display = 'none';
  success.style.display = 'block';
  success.classList.add('reveal');
  setTimeout(() => success.classList.add('visible'), 50);
  return false;
}
function resetForm() {
  const form = document.getElementById('consultForm');
  const success = document.getElementById('formSuccess');
  form.reset();
  success.style.display = 'none';
  form.style.display = 'block';
  form.classList.add('reveal');
  setTimeout(() => form.classList.add('visible'), 50);
}

/* ─── FAQ ACCORDION ─── */
function toggleFaq(el) {
  const item = el.parentElement;
  const wasActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!wasActive) item.classList.add('active');
}

/* ─── MAGNETIC BUTTONS ─── */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => { const rect = btn.getBoundingClientRect(); btn.style.transform = `translate(${(e.clientX - rect.left - rect.width/2) * 0.3}px, ${(e.clientY - rect.top - rect.height/2) * 0.3}px)`; });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ─── SCROLL TO TOP ─── */
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => { scrollBtn.classList.toggle('show', window.scrollY > 600); });
scrollBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
