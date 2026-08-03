/* ================================================
   CHÂTEAU BLANC — JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ——— Navbar Scroll Effect ———
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Check initial state

  // ——— Mobile Menu Toggle ———
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');

  if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
      navbarToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navbarMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
      });
    });
  }

  // ——— Smooth Scroll for Anchor Links ———
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    });
  });

  // ——— Scroll Animations (Intersection Observer) ———
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animations for elements in grid layouts
        const delay = entry.target.closest('.rooms-grid, .services-grid, .testimonials-grid, .gallery-grid')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100
          : 0;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // ——— Set Minimum Date for Check-in/out ———
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');

  if (checkinInput && checkoutInput) {
    const today = new Date().toISOString().split('T')[0];
    checkinInput.setAttribute('min', today);
    checkoutInput.setAttribute('min', today);

    checkinInput.addEventListener('change', () => {
      const checkinDate = new Date(checkinInput.value);
      checkinDate.setDate(checkinDate.getDate() + 1);
      const minCheckout = checkinDate.toISOString().split('T')[0];
      checkoutInput.setAttribute('min', minCheckout);

      if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
        checkoutInput.value = minCheckout;
      }
    });
  }

  // ——— Parallax-like effect for hero ———
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(${1 + scrolled * 0.0003}) translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // ——— Active Navigation Link Highlight ———
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-menu a');

  const highlightNav = () => {
    const scrollPos = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            if (navbar.classList.contains('scrolled')) {
              link.style.color = '#B88A3C';
            } else {
              link.style.color = '#F4D27B';
            }
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // ——— Counter Animation for About Badge ———
  const aboutBadge = document.querySelector('.about-image-badge');
  if (aboutBadge) {
    const badgeObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        aboutBadge.style.animation = 'badgePulse 0.6s ease';
        badgeObserver.unobserve(aboutBadge);
      }
    }, { threshold: 0.5 });

    badgeObserver.observe(aboutBadge);
  }

});

// ——— Lightbox Functions (Global) ———
function openLightbox(element) {
  const img = element.querySelector('img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  if (img && lightbox && lightboxImg) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// ——— Form Submission Handler ———
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Simple validation
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;

  if (!firstName || !lastName || !email || !checkin || !checkout) {
    showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
    return;
  }

  // Simulate sending
  submitBtn.textContent = 'Envoi en cours...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  setTimeout(() => {
    showNotification('Merci ! Votre demande de réservation a été envoyée avec succès. Notre équipe vous contactera sous 24h.', 'success');
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }, 1500);
}

// ——— Notification System ———
function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        ${type === 'success'
          ? '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
          : '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'
        }
      </svg>
      <span>${message}</span>
    </div>
  `;

  // Styles for notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '100px',
    right: '30px',
    zIndex: '10000',
    maxWidth: '420px',
    padding: '18px 24px',
    borderRadius: '12px',
    background: type === 'success' ? '#182345' : '#c0392b',
    color: '#fff',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.9rem',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    animation: 'notificationSlideIn 0.4s ease',
    cursor: 'pointer'
  });

  const content = notification.querySelector('.notification-content');
  Object.assign(content.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  });

  // Add animation keyframes
  if (!document.getElementById('notificationStyles')) {
    const style = document.createElement('style');
    style.id = 'notificationStyles';
    style.textContent = `
      @keyframes notificationSlideIn {
        from { opacity: 0; transform: translateX(60px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes notificationSlideOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(60px); }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Click to dismiss
  notification.addEventListener('click', () => {
    notification.style.animation = 'notificationSlideOut 0.3s ease forwards';
    setTimeout(() => notification.remove(), 300);
  });

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'notificationSlideOut 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}
