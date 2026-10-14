/**
 * ==========================================================================
 * PORTFOLIO SOKHNA MAÏ SYLLA — SCRIPT JAVASCRIPT
 * Fonctionnalités : Menu Mobile Hamburger, ScrollSpy, Bouton Langue,
 * Animations au Défilement (Reveal), Barres de Compétences, Formulaire Contact
 * Design : Vert Forêt · Blanc · Noir — Minimaliste & Premium
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. MENU NAVIGATION MOBILE (HAMBURGER)
       -------------------------------------------------------------------------- */
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu   = document.getElementById('navbarMenu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            const isOpen = navbarMenu.classList.contains('active');
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
            navbarToggle.setAttribute('aria-expanded', String(!isOpen));
            document.body.style.overflow = !isOpen ? 'hidden' : '';
        });

        // Fermer le menu lors du clic sur un lien
        const navLinks = navbarMenu.querySelectorAll('.nav-link, .nav-sublink, .nav-cta-mobile a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Fermer en cliquant en dehors
        document.addEventListener('click', (e) => {
            if (navbarMenu.classList.contains('active') &&
                !navbarMenu.contains(e.target) &&
                !navbarToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
                closeMobileMenu();
                navbarToggle.focus();
            }
        });
    }

    function closeMobileMenu() {
        if (navbarMenu) navbarMenu.classList.remove('active');
        if (navbarToggle) {
            navbarToggle.classList.remove('active');
            navbarToggle.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
    }

    /* --------------------------------------------------------------------------
       2. SCROLLSPY — MISE EN VALEUR DU LIEN ACTIF AU SCROLL
       -------------------------------------------------------------------------- */
    const sections  = document.querySelectorAll('section[id]');
    const navItems  = document.querySelectorAll('.nav-links .nav-link');
    const siteHeader = document.getElementById('siteHeader');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        const offset  = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) + 20 || 100;

        sections.forEach(section => {
            const top    = section.offsetTop - offset;
            const bottom = top + section.offsetHeight;
            const id     = section.getAttribute('id');

            if (scrollY >= top && scrollY < bottom) {
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('data-section') === id || item.getAttribute('href') === `#${id}`);
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    /* --------------------------------------------------------------------------
       3. ANIMATIONS D'ENTRÉE AU DÉFILEMENT (REVEAL + INTERSECTION OBSERVER)
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback : afficher tout sans animation
        revealElements.forEach(el => el.classList.add('visible'));
    }

    /* --------------------------------------------------------------------------
       4. ANIMATION DES BARRES DE COMPÉTENCES AU DÉFILEMENT
       -------------------------------------------------------------------------- */
    const skillBars = document.querySelectorAll('.skill-bar');

    if ('IntersectionObserver' in window && skillBars.length > 0) {
        const barObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar        = entry.target;
                    const targetWidth = bar.style.width;
                    bar.style.width = '0%';
                    // Petit délai pour que l'animation soit visible
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            bar.style.width = targetWidth;
                        });
                    });
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });

        skillBars.forEach(bar => barObserver.observe(bar));
    }

    /* --------------------------------------------------------------------------
       5. BOUTON CHANGEMENT DE LANGUE (FR ↔ EN)
       -------------------------------------------------------------------------- */
    const langToggle = document.getElementById('langToggle');
    const langLabel  = document.getElementById('langLabel');
    let   currentLang = 'fr';

    // Traductions minimales (vous pouvez enrichir ce dictionnaire)
    const translations = {
        fr: {
            'hero-badge-label':  'Profil Académique & Professionnel',
            'hero-name-label':   'SOKHNA MAÏ SYLLA',
            'hero-title':        'Étudiante en <span class="gradient-text">Informatique & Développement d\'Applications</span>',
            'hero-desc':         '« Passionnée par l\'informatique et le développement d\'applications, je construis progressivement mon parcours à travers ma formation universitaire, mes expériences, mes formations complémentaires et mes projets. »',
            'hero-btn-about':    '<span>Découvrir mon profil</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
            'hero-btn-cv':       '<i class="fa-solid fa-download" aria-hidden="true"></i><span>Télécharger mon CV</span>',
        },
        en: {
            'hero-badge-label':  'Academic & Professional Profile',
            'hero-name-label':   'SOKHNA MAÏ SYLLA',
            'hero-title':        'Student in <span class="gradient-text">Computer Science & Application Development</span>',
            'hero-desc':         '« Passionate about computer science and application development, I am progressively building my career through university training, hands-on experiences, additional courses, and real-world projects. »',
            'hero-btn-about':    '<span>Discover my profile</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
            'hero-btn-cv':       '<i class="fa-solid fa-download" aria-hidden="true"></i><span>Download my CV</span>',
        }
    };

    if (langToggle && langLabel) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            langLabel.textContent = currentLang.toUpperCase();
            langToggle.setAttribute('title', currentLang === 'fr' ? 'Switch to English' : 'Passer en français');
            document.documentElement.setAttribute('lang', currentLang);

            // Appliquer les traductions disponibles
            const t = translations[currentLang];
            Object.keys(t).forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = t[id];
            });

            // Animation de feedback discrète
            langToggle.style.transform = 'scale(0.9)';
            setTimeout(() => { langToggle.style.transform = ''; }, 180);
        });
    }

    /* --------------------------------------------------------------------------
       6. VALIDATION ET GESTION DU FORMULAIRE DE CONTACT
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput    = document.getElementById('contactName');
            const emailInput   = document.getElementById('contactEmail');
            const subjectInput = document.getElementById('contactSubject');
            const messageInput = document.getElementById('contactMessage');
            const feedbackBox  = document.getElementById('formFeedback');

            let isValid = true;

            function checkField(input, errorId, condition, errorMsg) {
                const errorSpan = document.getElementById(errorId);
                if (!condition) {
                    input.style.borderColor = 'var(--color-danger)';
                    if (errorSpan) {
                        errorSpan.textContent = errorMsg;
                        errorSpan.classList.add('active');
                    }
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                    if (errorSpan) {
                        errorSpan.textContent = '';
                        errorSpan.classList.remove('active');
                    }
                }
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            checkField(nameInput,    'nameError',    nameInput    && nameInput.value.trim().length >= 2,       'Veuillez saisir votre nom (au moins 2 caractères).');
            checkField(emailInput,   'emailError',   emailInput   && emailRegex.test(emailInput.value.trim()), 'Veuillez entrer une adresse email valide.');
            checkField(subjectInput, 'subjectError', subjectInput && subjectInput.value.trim().length >= 3,    'Veuillez indiquer un objet pour votre message.');
            checkField(messageInput, 'messageError', messageInput && messageInput.value.trim().length >= 10,   'Votre message doit comporter au moins 10 caractères.');

            if (isValid) {
                const submitBtn         = document.getElementById('submitBtn');
                const originalBtnHTML  = submitBtn.innerHTML;

                submitBtn.disabled      = true;
                submitBtn.innerHTML     = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> <span>Envoi en cours...</span>';

                setTimeout(() => {
                    submitBtn.disabled  = false;
                    submitBtn.innerHTML = originalBtnHTML;

                    if (feedbackBox) {
                        feedbackBox.className  = 'form-feedback success';
                        feedbackBox.innerHTML  = `
                            <strong><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Merci beaucoup !</strong><br>
                            Votre message a été transmis avec succès. Je vous répondrai dans les meilleurs délais à l'adresse <em>${emailInput.value.trim()}</em>.
                        `;
                        feedbackBox.style.display = 'block';
                    }

                    contactForm.reset();

                    setTimeout(() => {
                        if (feedbackBox) {
                            feedbackBox.style.display = 'none';
                            feedbackBox.className     = 'form-feedback';
                        }
                    }, 8000);

                }, 900);
            }
        });

        // Réinitialiser le style des champs à la saisie
        contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '';
                const errorId  = input.id.replace('contact', '').toLowerCase() + 'Error';
                const errorEl  = document.getElementById(
                    input.id === 'contactName'    ? 'nameError'    :
                    input.id === 'contactEmail'   ? 'emailError'   :
                    input.id === 'contactSubject' ? 'subjectError' :
                    'messageError'
                );
                if (errorEl) { errorEl.textContent = ''; errorEl.classList.remove('active'); }
            });
        });
    }

    /* --------------------------------------------------------------------------
       7. SYSTÈME DE FILTRES POUR LA PAGE PROJETS
       -------------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-chip, .filter-btn');
    const projectCards  = document.querySelectorAll('.project-card[data-category], .project-featured-card[data-category]');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cat = card.getAttribute('data-category');
                    if (filterValue === 'all' || cat === filterValue) {
                        card.style.display   = '';
                        card.style.opacity   = '0';
                        card.style.transform = 'translateY(12px)';
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                card.style.opacity   = '1';
                                card.style.transform = 'translateY(0)';
                                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            });
                        });
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /* --------------------------------------------------------------------------
       8. ANIMATION COMPTEURS STATISTIQUES (ABOUT STATS)
       -------------------------------------------------------------------------- */
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(el => {
            const text = el.textContent.trim();
            // Extraire le nombre (ex: "2+", "5+", "2024")
            const numMatch = text.match(/(\d+)/);
            if (!numMatch) return;

            const target  = parseInt(numMatch[1]);
            const suffix  = text.replace(/\d+/, '');
            const duration = 1200;
            const start    = Date.now();
            const startVal = Math.max(0, target - Math.min(target, 50));

            function update() {
                const elapsed  = Date.now() - start;
                const progress = Math.min(elapsed / duration, 1);
                // Easing ease-out
                const eased    = 1 - Math.pow(1 - progress, 3);
                const current  = Math.round(startVal + (target - startVal) * eased);
                el.textContent = current + suffix;
                if (progress < 1) requestAnimationFrame(update);
            }

            requestAnimationFrame(update);
        });
    }

    // Observer pour déclencher l'animation des compteurs
    const aboutStatsRow = document.querySelector('.about-stats-row');
    if (aboutStatsRow && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(aboutStatsRow);
    }

});
