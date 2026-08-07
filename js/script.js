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

    const projectTriggers = document.querySelectorAll(".project-trigger");
    const projectModals = document.querySelectorAll(".project-modal");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


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
        navLinks.id = navLinks.id || "primary-navigation";

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

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                setMenuState(false);
            }
        });
    }


    /* =========================================================================
       PROJECT MODALS
    ========================================================================= */

    function closeAllProjectModals() {
        projectModals.forEach((modal) => {
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
        });

        document.body.classList.remove("project-modal-open");
    }

    function openProjectModal(modalId) {
        const modal = document.getElementById(modalId);

        if (!modal) {
            return;
        }

        closeAllProjectModals();

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("project-modal-open");

        const closeButton = modal.querySelector(".project-modal-close");

        if (closeButton) {
            closeButton.focus();
        }
    }

    projectTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const modalId = trigger.getAttribute("data-project");
            openProjectModal(modalId);
        });
    });

    projectModals.forEach((modal) => {
        const closeButton = modal.querySelector(".project-modal-close");
        const modalBox = modal.querySelector(".project-modal-box");

        closeButton?.addEventListener("click", () => {
            closeAllProjectModals();
        });

        modal.addEventListener("click", (event) => {
            if (!modalBox.contains(event.target)) {
                closeAllProjectModals();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllProjectModals();
        }
    });


    /* =========================================================================
       PROJECT IMAGE THUMBNAILS
    ========================================================================= */

    document.querySelectorAll(".project-modal").forEach((modal) => {
        const mainImage = modal.querySelector(
            ".project-modal-image > img"
        );

        const thumbnails = modal.querySelectorAll(
            ".project-thumbnail"
        );

        if (!mainImage || thumbnails.length === 0) {
            return;
        }

        thumbnails.forEach((thumbnail) => {
            thumbnail.addEventListener("click", () => {
                const newImage = thumbnail.getAttribute("data-image");

                if (!newImage) {
                    return;
                }

                mainImage.src = newImage;

                thumbnails.forEach((item) => {
                    item.classList.remove("active");
                });

                thumbnail.classList.add("active");
            });
        });
    });


    /* =========================================================================
       HEADER SHADOW
    ========================================================================= */

    function updateHeaderShadow() {
        if (!header) {
            return;
        }

        header.style.boxShadow =
            window.scrollY > 50
                ? "var(--shadow-md)"
                : "none";
    }

    window.addEventListener("scroll", updateHeaderShadow, {
        passive: true
    });

    updateHeaderShadow();


    /* =========================================================================
       BACK TO TOP
    ========================================================================= */

    if (backToTop) {
        function updateBackToTop() {
            backToTop.classList.toggle(
                "show",
                window.scrollY > 400
            );
        }

        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth"
            });
        });

        updateBackToTop();
    }


    /* =========================================================================
       ACTIVE NAVIGATION
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
            link.classList.toggle(
                "active-link",
                link.getAttribute("href") === `#${currentSection}`
            );
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
        ".education-card, " +
        ".certificate-card, " +
        ".achievement-card, " +
        ".contact-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in");
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: .15
            }
        );

        revealItems.forEach((item) => {
            observer.observe(item);
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

    if (heroTitle && !reduceMotion) {
        const originalText = heroTitle.textContent.trim();

        heroTitle.textContent = "";

        let index = 0;

        function typeWriter() {
            if (index < originalText.length) {
                heroTitle.textContent += originalText.charAt(index);
                index++;

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
