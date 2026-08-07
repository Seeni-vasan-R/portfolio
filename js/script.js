/* =========================================================================
   PORTFOLIO JAVASCRIPT
========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    const backToTop = document.getElementById("backToTop");
    const header = document.querySelector(".header");
    const sections = document.querySelectorAll("section");

    const mobileBreakpoint = 768;


    /* =========================================================================
       MOBILE NAVIGATION
    ========================================================================= */

    function setMenuState(isOpen) {
        if (!menuBtn || !navLinks) {
            return;
        }

        const icon = menuBtn.querySelector("i");

        navLinks.classList.toggle("active", isOpen);
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }
    }

    if (menuBtn && navLinks) {
        if (!navLinks.id) {
            navLinks.id = "primary-navigation";
        }

        menuBtn.setAttribute("aria-controls", navLinks.id);
        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navLinks.classList.contains("active");
            setMenuState(!isOpen);
        });

        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                setMenuState(false);
            });
        });

        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedMenuButton = menuBtn.contains(event.target);

            if (
                navLinks.classList.contains("active") &&
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {
                setMenuState(false);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setMenuState(false);
                menuBtn.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > mobileBreakpoint) {
                setMenuState(false);
            }
        });
    }


    /* =========================================================================
       HEADER SHADOW
    ========================================================================= */

    function updateHeaderShadow() {
        if (!header) {
            return;
        }

        if (window.scrollY > 50) {
            header.style.boxShadow = "var(--shadow-md)";
        } else {
            header.style.boxShadow = "none";
        }
    }

    window.addEventListener("scroll", updateHeaderShadow, {
        passive: true
    });

    updateHeaderShadow();


    /* =========================================================================
       BACK TO TOP
    ========================================================================= */

    if (backToTop) {
        function updateBackToTopButton() {
            backToTop.classList.toggle("show", window.scrollY > 400);
        }

        window.addEventListener("scroll", updateBackToTopButton, {
            passive: true
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        updateBackToTopButton();
    }


    /* =========================================================================
       ACTIVE NAVIGATION LINK
    ========================================================================= */

    function updateActiveSection() {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 140;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navItems.forEach((link) => {
            const isCurrent =
                link.getAttribute("href") === `#${currentSection}`;

            link.classList.toggle("active-link", isCurrent);
        });
    }

    window.addEventListener("scroll", updateActiveSection, {
        passive: true
    });

    updateActiveSection();


    /* =========================================================================
       SCROLL REVEAL
    ========================================================================= */

    const revealItems = document.querySelectorAll(
        ".about-card, " +
        ".skill-category, " +
        ".project-card, " +
        ".certificate-card, " +
        ".achievement-card, " +
        ".education-card, " +
        ".contact-card"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        revealItems.forEach((item) => {
            revealObserver.observe(item);
        });
    } else {
        revealItems.forEach((item) => {
            item.classList.add("fade-in");
        });
    }


    /* =========================================================================
       TYPING EFFECT
    ========================================================================= */

    const heroTitle = document.querySelector(".hero h2");
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (heroTitle && !reduceMotion) {
        const originalText = heroTitle.textContent.trim();

        heroTitle.textContent = "";

        let characterIndex = 0;

        function typeWriter() {
            if (characterIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(characterIndex);
                characterIndex++;

                setTimeout(typeWriter, 70);
            }
        }

        setTimeout(typeWriter, 400);
    }


    /* =========================================================================
       SMOOTH SCROLL
    ========================================================================= */

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================================================
       CURRENT YEAR
    ========================================================================= */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
