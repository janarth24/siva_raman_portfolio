/**
 * S. Raman Portfolio - Interactive JavaScript Engine
 */

// PERSONAS DATA DICTIONARY (FOR S. RAMAN FRESHER PROFILE)
const personaData = {
  anchor: {
    img: 'assets/anchor.jpg',
    badge: '🎙️ Anchor Dimension',
    tag: '🎙️ Aspiring TV Host & Anchor',
    title: 'Anchor: Connecting People with Ideas',
    bio: 'An aspiring TV anchor and media personality ready to captivate viewers through spontaneous conversational flow, confident on-screen presence, and high-spirited charisma.',
    desc: 'Natural camera presence with strong bilingual articulation in Tamil and English. Eager to host television shows, digital interviews, college festivals, and live broadcasts with quick spontaneity.',
    color: '#38bdf8'
  },
  acting: {
    img: 'assets/acting.jpg',
    badge: '🎭 Acting Dimension',
    tag: '🎭 Aspiring Actor (Film & OTT)',
    title: 'Actor: Bringing Stories to Life',
    bio: 'A passionate new actor dedicated to deep character immersion, authentic emotional expression, and bringing stories to life across feature films, web series, and short films.',
    desc: 'Committed to character preparation and expressive nuance. Open for auditions and casting calls in feature films, digital series, commercial ads, and short film projects.',
    color: '#f59e0b'
  },
  entertainer: {
    img: 'assets/entertainer.jpg',
    badge: '⭐ Entertainer Dimension',
    tag: '⭐ Stage Host & Crowd Energizer',
    title: 'Entertainer: Spreading Joy & Positivity',
    bio: 'Bringing infectious youthful energy, natural comic timing, and high-voltage audience interaction to live stages, college events, and celebrations.',
    desc: 'A vibrant performer who engages audiences with spontaneous enthusiasm and positive vibes, making every live show or event unforgettable.',
    color: '#fbbf24'
  },
  speaking: {
    img: 'assets/public_speaking.jpg',
    badge: '🗣️ Speaking Dimension',
    tag: '🗣️ Youth & Motivational Speaker',
    title: 'Public Speaker: Inspiring Minds, Shaping Tomorrow',
    bio: 'Passionate about inspiring student minds and youth through empowering ideas, clear articulation, and dynamic motivational delivery.',
    desc: 'Clear vocal modulation and commanding podium delivery. Ready to speak at college orientations, youth conclaves, student seminars, and cultural forums.',
    color: '#34d399'
  },
  creative: {
    img: 'assets/creative_expression.jpg',
    badge: '📷 Creative Dimension',
    tag: '📷 Visual Model & Storyteller',
    title: 'Creative Vision: Ideas | Visuals | Stories',
    bio: 'Bringing fresh aesthetic vision to conceptual photoshoots, apparel modeling, lifestyle visuals, and creative brand storytelling.',
    desc: 'Camera-ready style and photogenic versatility. Open for fashion modeling, print ads, commercial brand shoots, and creative visual campaigns.',
    color: '#c084fc'
  },
  composite: {
    img: 'assets/raman_personas_collage.jpg',
    badge: '✨ Complete Persona Range',
    tag: '✨ 5 Creative Dimensions',
    title: 'The Full Creative Spectrum of S. Raman',
    bio: 'An aspiring media artist offering 5 distinct facets: Acting, Anchoring, Live Entertainment, Public Speaking, and Creative Modeling.',
    desc: 'Versatile and adaptable for multifaceted media requirements. Ready to audition and deliver 100% passion on screen and stage.',
    color: '#5b9bd5'
  }
};

let currentPersonaKey = 'anchor';

// SWITCH HERO PERSONA
function switchPersona(key) {
  const data = personaData[key];
  if (!data) return;
  currentPersonaKey = key;

  // Update active pill button
  document.querySelectorAll('.role-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-persona') === key);
  });

  // Fade image transition
  const heroImg = document.getElementById('heroPortraitImg');
  const heroBio = document.getElementById('heroBioText');
  const heroTag = document.getElementById('heroBadgeTag');

  if (heroImg) heroImg.classList.add('fading');
  if (heroBio) heroBio.style.opacity = '0';

  setTimeout(() => {
    if (heroImg) {
      heroImg.src = data.img;
      heroImg.alt = data.title;
      heroImg.classList.remove('fading');
    }
    if (heroBio) {
      heroBio.textContent = data.bio;
      heroBio.style.opacity = '1';
    }
    if (heroTag) {
      heroTag.textContent = data.tag;
      heroTag.style.borderColor = data.color;
    }
  }, 200);
}

// GALLERY FILTER
function filterGallery(cat, btnElement) {
  document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const cards = document.querySelectorAll('.gallery-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (cat === 'all' || cardCat === cat || cardCat === 'all') {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

// LIGHTBOX MODAL
function openLightbox(key) {
  const data = personaData[key];
  if (!data) return;

  const imgEl = document.getElementById('lightboxImg');
  const badgeEl = document.getElementById('lightboxBadge');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDesc');
  const modal = document.getElementById('lightboxModal');

  if (imgEl) {
    imgEl.src = data.img;
    imgEl.alt = data.title;
  }
  if (badgeEl) {
    badgeEl.textContent = data.badge;
    badgeEl.style.color = data.color;
  }
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;

  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
}

function handleLightboxBackdrop(e) {
  if (e.target && e.target.id === 'lightboxModal') {
    closeLightbox();
  }
}

// KEYBOARD SHORTCUTS
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// MOBILE MENU TOGGLES
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (navLinks) navLinks.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('open');
}

function closeMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (navLinks) navLinks.classList.remove('open');
  if (hamburger) hamburger.classList.remove('open');
}

// INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => obs.observe(el));

// FLOATING PARTICLES
function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 4 + 1;
  const left = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 5;
  const opacity = Math.random() * 0.25 + 0.05;

  p.style.cssText = `width:${size}px;height:${size}px;left:${left}vw;background:rgba(91,155,213,${opacity});animation-duration:${duration}s;animation-delay:${delay}s;`;
  document.body.appendChild(p);

  setTimeout(() => {
    p.remove();
  }, (duration + delay) * 1000);
}

for (let i = 0; i < 20; i++) {
  setTimeout(createParticle, i * 350);
}
setInterval(createParticle, 1500);
