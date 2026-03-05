/* ============================================
   PrimeTech Heating and Cooling - Main Script
   ============================================ */

/* ------------------------------------------
   1. Hamburger Menu Toggle
   ------------------------------------------ */
(function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (!hamburger || !navLinks) return;

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
        const isOpen = navLinks.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            this.classList.add('active');
            navLinks.classList.add('active');
            if (mobileOverlay) mobileOverlay.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Close menu on overlay click
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function () {
            closeMenu();
        });
    }

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
            hamburger.focus();
        }
    });

    // Close menu if window is resized to desktop width
    window.addEventListener('resize', function () {
        if (window.innerWidth > 968 && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
})();

/* ------------------------------------------
   2. Mouse Glow Effect (blue section detection)
   ------------------------------------------ */
(function () {
    const mouseGlow = document.getElementById('mouseGlow');
    if (!mouseGlow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;
    let glowVisible = false;

    const blueSelectors = ['nav', '.hero', '.why-choose', '.page-header', '.cta-section', '.footer', '.navbar'];

    function isOverBlueSection(x, y) {
        const els = document.elementsFromPoint(x, y);
        for (let i = 0; i < els.length; i++) {
            for (let j = 0; j < blueSelectors.length; j++) {
                if (els[i].matches && els[i].matches(blueSelectors[j])) return true;
            }
        }
        return false;
    }

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        const overBlue = isOverBlueSection(e.clientX, e.clientY);
        if (overBlue && !glowVisible) {
            glowVisible = true;
            mouseGlow.classList.add('active');
        } else if (!overBlue && glowVisible) {
            glowVisible = false;
            mouseGlow.classList.remove('active');
        }
    });

    document.addEventListener('mouseleave', function () {
        glowVisible = false;
        mouseGlow.classList.remove('active');
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;
        mouseGlow.style.left = glowX + 'px';
        mouseGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
})();

/* ------------------------------------------
   3. Navbar Scroll Effect
   ------------------------------------------ */
(function () {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
})();

/* ------------------------------------------
   4. Smooth Scrolling for Anchor Links
   ------------------------------------------ */
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
})();

/* ------------------------------------------
   5. Form Submission Handling (Sending... state)
   ------------------------------------------ */
(function () {
    const formEl = document.querySelector('form');
    if (!formEl) return;

    formEl.addEventListener('submit', function () {
        const submitBtn = this.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }
    });
})();

/* ------------------------------------------
   6. FAQ Accordion
   ------------------------------------------ */
(function () {
    const faqButtons = document.querySelectorAll('.faq-question');
    if (!faqButtons.length) return;

    faqButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const item = this.parentElement;
            const isOpen = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(function (i) {
                i.classList.remove('active');
            });
            if (!isOpen) item.classList.add('active');
        });
    });
})();

/* ------------------------------------------
   7. Intersection Observer for Scroll Animations
   ------------------------------------------ */
(function () {
    const animatedElements = document.querySelectorAll(
        '.service-card, .why-item, .contact-item, .contact-form, .faq-item, .about-card'
    );
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    animatedElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
})();
