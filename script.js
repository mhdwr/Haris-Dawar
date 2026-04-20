// ── Typing Effect ──
const taglineEl = document.getElementById('tagline');
const phrases = [
  'Turning Ideas Into Digital Experiences',
  'Building Apps That Matter',
  'Crafting Visual Stories',
  'Launching Startups 🚀'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    taglineEl.textContent = current.substring(0, charIndex--);
  } else {
    taglineEl.textContent = current.substring(0, charIndex++);
  }

  let speed = isDeleting ? 40 : 70;

  if (!isDeleting && charIndex === current.length + 1) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeLoop, speed);
}

window.addEventListener('load', () => {
  setTimeout(typeLoop, 500);
});


// ── Particles ──
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('particles');
container.appendChild(canvas);

canvas.style.cssText = 'width:100%;height:100%;position:absolute;top:0;left:0;';

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.5 + 0.3,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.4 + 0.1
  };
}

for (let i = 0; i < 80; i++) {
  particles.push(createParticle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(102, 126, 234, ${p.opacity})`;
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();


// ── Navbar Scroll ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10,10,15,0.92)';
    navbar.style.borderBottom = '1px solid rgba(255,255,255,0.12)';
  } else {
    navbar.style.background = 'rgba(10,10,15,0.7)';
    navbar.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
  }
});


// ── Active Nav Link ──
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#ffffff';
    }
  });
});


// ── Reveal on Scroll ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));


// ── Cursor Glow ──
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(102,126,234,0.07) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  top: 0; left: 0;
  transition: transform 0.15s ease;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.transform = `translate(${e.clientX - 175}px, ${e.clientY - 175}px)`;
});