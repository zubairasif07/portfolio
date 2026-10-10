import './style.css';
import emailjs from '@emailjs/browser';
import avatarImg from './assets/profile-picture.jpeg';
import cvPdf from './assets/MUHAMMAD ZUBAIR ASIF -WEB DEVELOPER.pdf';
import { projects } from './projects';

// ==========================================================================
// Initialization & Asset Setup
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (!initRoutes()) return;

  // Bind asset imports dynamically for robust Vite compilation
  const heroAvatar = document.querySelector<HTMLImageElement>('#hero-avatar');
  if (heroAvatar) {
    heroAvatar.src = avatarImg;
  }

  // Render projects dynamically
  renderProjects();

  initTheme();
  initMobileMenu();
  initTypingEffect();
  initStatsCounter();
  initPortfolioFilters();
  initContactForm();
  initScrollToTop();
  initCVDownload();
});

function initRoutes() {
  const pageSections: Record<string, string[]> = {
    '/': ['home', 'home-work', 'home-focus'],
    '/about': ['about-intro', 'about', 'skills', 'services', 'about-process'],
    '/projects': ['projects-intro', 'portfolio', 'projects-notes'],
    '/contact': ['contact-intro', 'contact', 'contact-next-steps']
  };
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  const descriptions: Record<string, string> = {
    '/': 'Explore selected full-stack and frontend projects by Muhammad Zubair Asif, a software engineer focused on thoughtful, responsive web experiences.',
    '/about': 'Learn about Muhammad Zubair Asif’s approach to frontend, backend, responsive UI, and practical web application development.',
    '/projects': 'Browse selected frontend and full-stack projects, technologies, and source repositories by Muhammad Zubair Asif.',
    '/contact': 'Discuss a web project with Muhammad Zubair Asif. Share your goals, scope, and context using the contact form or email.'
  };
  const titles: Record<string, string> = {
    '/': 'Muhammad Zubair Asif | Software Engineer',
    '/about': 'About | Muhammad Zubair Asif',
    '/projects': 'Projects | Muhammad Zubair Asif',
    '/contact': 'Contact | Muhammad Zubair Asif'
  };
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const visibleSections = pageSections[currentPath];

  if (!visibleSections) {
    window.location.replace('/');
    return false;
  }

  document.title = titles[currentPath];
  if (description) description.content = descriptions[currentPath];
  document.body.dataset.page = currentPath === '/' ? 'home' : currentPath.slice(1);

  document.querySelectorAll<HTMLElement>('main > section').forEach(section => {
    section.hidden = !visibleSections.includes(section.id);
    section.setAttribute('aria-hidden', String(section.hidden));
  });
  const hero = document.querySelector<HTMLElement>('#home');
  const homeSections = document.querySelectorAll<HTMLElement>('.home-overview');
  if (hero && currentPath === '/') {
    homeSections[0]?.before(hero);
  }

  document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach(link => {
    const linkPath = link.pathname.replace(/\/+$/, '') || '/';
    const isCurrentPage = linkPath === currentPath;
    link.classList.toggle('active', isCurrentPage);
    if (isCurrentPage) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  return true;
}

// ==========================================================================
// Dark / Light Theme Logic
// ==========================================================================
function initTheme() {
  const themeSwitcher = document.querySelector<HTMLButtonElement>('#theme-switcher');
  if (!themeSwitcher) return;

  const iconMoon = themeSwitcher.querySelector<SVGElement>('.icon-moon');
  const iconSun = themeSwitcher.querySelector<SVGElement>('.icon-sun');

  const updateThemeControl = (isLight: boolean) => {
    themeSwitcher.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
    themeSwitcher.setAttribute('aria-pressed', String(isLight));
    iconMoon?.classList.toggle('hidden', isLight);
    iconSun?.classList.toggle('hidden', !isLight);
  };

  // Check saved setting or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  const isLight = savedTheme === 'light' || (!savedTheme && systemPrefersLight);
  document.body.classList.toggle('light-theme', isLight);
  updateThemeControl(isLight);

  themeSwitcher.addEventListener('click', () => {
    const nextIsLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', nextIsLight ? 'light' : 'dark');
    updateThemeControl(nextIsLight);
  });
}

// ==========================================================================
// Mobile Menu Navigation Logic
// ==========================================================================
function initMobileMenu() {
  const mobileToggle = document.querySelector<HTMLButtonElement>('#mobile-toggle');
  const navMenu = document.querySelector<HTMLElement>('#navigation-menu');
  if (!mobileToggle || !navMenu) return;

  const mobileViewport = window.matchMedia('(max-width: 768px)');
  const hamburgerIcon = mobileToggle.querySelector<SVGElement>('.hamburger-icon');
  const closeIcon = mobileToggle.querySelector<SVGElement>('.close-icon');

  const toggleMenu = (open?: boolean) => {
    const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('open');
    mobileToggle.setAttribute('aria-expanded', String(shouldOpen));
    mobileToggle.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');
    if (mobileViewport.matches) {
      navMenu.inert = !shouldOpen;
      navMenu.setAttribute('aria-hidden', String(!shouldOpen));
    } else {
      navMenu.inert = false;
      navMenu.removeAttribute('aria-hidden');
    }
    
    if (shouldOpen) {
      navMenu.classList.add('open');
      hamburgerIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      navMenu.classList.remove('open');
      hamburgerIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  toggleMenu(false);

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking links
  const navLinks = navMenu.querySelectorAll<HTMLAnchorElement>('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
      mobileToggle.focus();
    }
  });

  mobileViewport.addEventListener('change', event => {
    toggleMenu(false);
    if (!event.matches) {
      navMenu.inert = false;
      navMenu.removeAttribute('aria-hidden');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (navMenu.classList.contains('open') && !navMenu.contains(target) && !mobileToggle.contains(target)) {
      toggleMenu(false);
    }
  });
}

// ==========================================================================
// Dynamic Roles Typing Effect
// ==========================================================================
function initTypingEffect() {
  const target = document.querySelector<HTMLSpanElement>('#typing-target');
  if (!target) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    target.textContent = 'Software Engineer';
    document.querySelector<HTMLElement>('#typing-cursor')?.setAttribute('hidden', '');
    return;
  }

  const roles = [
    'Full-Stack Developer',
    'Software Engineer',
    'Frontend Specialist',
    'UI/UX Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const type = () => {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deleting is faster
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Regular typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      isDeleting = true;
      typingSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Delay before starting next word
    }

    setTimeout(type, typingSpeed);
  };

  // Start the typing loop
  setTimeout(type, 1000);
}

// ==========================================================================
// Dynamic Stats Counter Logic
// ==========================================================================
function initStatsCounter() {
  const statsBar = document.querySelector<HTMLDivElement>('#stats-counter-bar');
  if (!statsBar) return;

  const numbers = statsBar.querySelectorAll<HTMLSpanElement>('.stat-number');
  
  const countUp = (el: HTMLSpanElement) => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    const duration = 1500; // 1.5 seconds animation
    const stepTime = Math.max(Math.floor(duration / target), 15);
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        el.textContent = target.toString();
        clearInterval(timer);
      } else {
        el.textContent = current.toString();
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        numbers.forEach(num => countUp(num));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsBar);
}

// ==========================================================================
// Render Portfolio Projects Dynamically
// ==========================================================================
function renderProjects() {
  const grids = document.querySelectorAll<HTMLDivElement>('#project-grid, #featured-grid');

  grids.forEach(grid => {
    const visibleProjects = grid.id === 'featured-grid' ? projects.slice(0, 3) : projects;
    grid.innerHTML = visibleProjects
    .map(project => {
      const techBadges = project.technologies
        .map(tech => `<span>${tech}</span>`)
        .join('');

      return `
        <article class="portfolio-item glass-card" data-category="${project.category}">
          <div class="portfolio-image-wrapper">
            <img src="${project.image}" alt="${project.title} project preview" loading="lazy" decoding="async" />
            <div class="portfolio-overlay">
              <div class="overlay-buttons">
                ${project.githubUrl ? `
                <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="View ${project.title} source code">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>` : ''}
                ${project.liveUrl ? `
                <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Open ${project.title} live demo">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>` : ''}
              </div>
            </div>
          </div>
          <div class="portfolio-info">
            <span class="project-tag">${project.tag}</span>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech-badges">
              ${techBadges}
            </div>
            <div class="project-actions">
              ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">View source <span aria-hidden="true">&rarr;</span></a>` : ''}
              ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">&rarr;</span></a>` : ''}
            </div>
          </div>
        </article>
      `;
    })
    .join('');
  });
}

// ==========================================================================
// Portfolio Filter Logic
// ==========================================================================
function initPortfolioFilters() {
  const filtersContainer = document.querySelector<HTMLDivElement>('#project-filters');
  const grid = document.querySelector<HTMLDivElement>('#project-grid');
  if (!filtersContainer || !grid) return;

  const filterBtns = filtersContainer.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const items = grid.querySelectorAll<HTMLDivElement>('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filterVal = btn.getAttribute('data-filter') || 'all';

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterVal === 'all' || itemCategory === filterVal) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ==========================================================================
// Interactive Contact Form Handling & Validation
// ==========================================================================
function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  const toast = document.querySelector<HTMLDivElement>('#submit-toast');
  if (!form || !toast) return;

  const nameInput    = form.querySelector<HTMLInputElement>('#contact-name');
  const emailInput   = form.querySelector<HTMLInputElement>('#contact-email');
  const phoneInput   = form.querySelector<HTMLInputElement>('#contact-phone');
  const subjectInput = form.querySelector<HTMLInputElement>('#contact-subject');
  const messageInput = form.querySelector<HTMLTextAreaElement>('#contact-message');
  const submitBtn    = form.querySelector<HTMLButtonElement>('#form-submit-btn');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const setValidationState = (el: HTMLElement | null, isValid: boolean) => {
    if (!el) return;
    el.setAttribute('aria-invalid', String(!isValid));
    const group = el.closest('.form-group');
    if (group) {
      if (isValid) {
        group.classList.remove('invalid');
      } else {
        group.classList.add('invalid');
      }
    }
  };

  // Add validation on input events for fluid feel
  nameInput?.addEventListener('input', () => setValidationState(nameInput, nameInput.value.trim() !== ''));
  subjectInput?.addEventListener('input', () => setValidationState(subjectInput, subjectInput.value.trim() !== ''));
  messageInput?.addEventListener('input', () => setValidationState(messageInput, messageInput.value.trim() !== ''));
  emailInput?.addEventListener('input', () => {
    setValidationState(emailInput, validateEmail(emailInput.value.trim()));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal    = nameInput?.value.trim() || '';
    const emailVal   = emailInput?.value.trim() || '';
    const phoneVal   = phoneInput?.value.trim() || 'Not provided';
    const subjectVal = subjectInput?.value.trim() || '';
    const messageVal = messageInput?.value.trim() || '';

    let isFormValid = true;

    if (nameVal === '') {
      setValidationState(nameInput, false);
      isFormValid = false;
    }
    if (!validateEmail(emailVal)) {
      setValidationState(emailInput, false);
      isFormValid = false;
    }
    if (subjectVal === '') {
      setValidationState(subjectInput, false);
      isFormValid = false;
    }
    if (messageVal === '') {
      setValidationState(messageInput, false);
      isFormValid = false;
    }

    if (!isFormValid) {
      form.querySelector<HTMLElement>('.form-group.invalid input, .form-group.invalid textarea')?.focus();
      return;
    }

    // Disable button and show sending state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <span class="spinner"></span>`;
    }

    // EmailJS credentials
    const SERVICE_ID  = 'service_jb5uo9s';
    const TEMPLATE_ID = 'template_1b7n43n';
    const PUBLIC_KEY  = '8IK6b1hCVTZtxj8Yu';

    const templateParams = {
      from_name:  nameVal,
      name:       nameVal,
      email:      emailVal,
      from_email: emailVal,
      phone:      phoneVal,
      subject:    subjectVal,
      message:    messageVal,
      time:       new Date().toLocaleString(),
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        // Show success toast
        toast.classList.add('show');

        // Reset form and validation styles
        form.reset();
        form.querySelectorAll('.form-group').forEach(group => group.classList.remove('invalid'));
        form.querySelectorAll('[aria-invalid="true"]').forEach(field => field.setAttribute('aria-invalid', 'false'));

        // Hide toast after 4 seconds
        setTimeout(() => toast.classList.remove('show'), 4000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        // Show error toast
        const toastTitle = toast.querySelector<HTMLHeadingElement>('h4');
        const toastMsg   = toast.querySelector<HTMLParagraphElement>('p');
        if (toastTitle) toastTitle.textContent = 'Failed to send!';
        if (toastMsg)   toastMsg.textContent   = 'Something went wrong. Please try again or email directly.';
        toast.classList.add('show', 'error');
        setTimeout(() => {
          toast.classList.remove('show', 'error');
          if (toastTitle) toastTitle.textContent = 'Thank you!';
          if (toastMsg)   toastMsg.textContent   = "Your message has been sent successfully. I'll get back to you shortly.";
        }, 5000);
      })
      .finally(() => {
        // Restore submit button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Send Message <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
        }
      });
  });
}

// ==========================================================================
// Scroll to Top Button Behaviour
// ==========================================================================
function initScrollToTop() {
  const scrollTopBtn = document.querySelector<HTMLAnchorElement>('#scroll-top-btn');
  if (!scrollTopBtn) return;

  scrollTopBtn.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
}

// ==========================================================================
// Dynamic CV PDF Generator / Download
// ==========================================================================
function initCVDownload() {
  const cvBtn = document.querySelector<HTMLButtonElement>('#cv-download');
  if (!cvBtn) return;

  cvBtn.addEventListener('click', () => {
    const anchor = document.createElement('a');
    anchor.href = cvPdf;
    anchor.download = 'MUHAMMAD ZUBAIR ASIF -WEB DEVELOPER.pdf';
    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  });
}
