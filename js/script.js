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

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =========================================================================
       MOBILE MENU
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

        document.addEventListener("click", (event) => {
            if (
                navLinks.classList.contains("active") &&
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                setMenuState(false);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setMenuState(false);
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                setMenuState(false);
            }
        });
    }


    /* =========================================================================
       PROJECT POPUP
    ========================================================================= */

    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    function closeProjectPopups() {
        projectCards.forEach((card) => {
            card.removeAttribute("open");
        });

        document.body.classList.remove("project-modal-open");
    }

    projectCards.forEach((card) => {
        card.addEventListener("toggle", () => {
            const isOpen = card.hasAttribute("open");

            if (isOpen) {
                projectCards.forEach((otherCard) => {
                    if (otherCard !== card) {
                        otherCard.removeAttribute("open");
                    }
                });

                document.body.classList.add("project-modal-open");
            } else {
                const anyCardOpen = [...projectCards].some((item) =>
                    item.hasAttribute("open")
                );

                if (!anyCardOpen) {
                    document.body.classList.remove("project-modal-open");
                }
            }
        });
    });

    document.addEventListener("click", (event) => {
        const openCard = document.querySelector(
            ".project-card[open]"
        );

        if (
            openCard &&
            document.body.classList.contains("project-modal-open") &&
            !openCard.contains(event.target)
        ) {
            closeProjectPopups();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeProjectPopups();
        }
    });


    /* =========================================================================
       PROJECT IMAGE SLIDERS
    ========================================================================= */

    const carousels = document.querySelectorAll("[data-carousel]");

    carousels.forEach((carousel) => {
        const track = carousel.querySelector(".gallery-track");
        const slides = carousel.querySelectorAll(".gallery-slide");
        const previousButton = carousel.querySelector(".gallery-prev");
        const nextButton = carousel.querySelector(".gallery-next");

        if (!track || slides.length <= 1) {
            return;
        }

        let currentSlide = 0;
        let autoSlide;
        let touchStartX = 0;
        let touchEndX = 0;

        function showSlide(index) {
            currentSlide = (index + slides.length) % slides.length;

            track.style.transform =
                `translateX(-${currentSlide * 100}%)`;
        }

        function startAutoSlide() {
            if (reduceMotion) {
                return;
            }

            clearInterval(autoSlide);
            autoSlide = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 4000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlide);
        }

        nextButton?.addEventListener("click", (event) => {
            event.stopPropagation();
            showSlide(currentSlide + 1);
            startAutoSlide();
        });

        previousButton?.addEventListener("click", (event) => {
            event.stopPropagation();
            showSlide(currentSlide - 1);
            startAutoSlide();
        });

        carousel.addEventListener("mouseenter", stopAutoSlide);
        carousel.addEventListener("mouseleave", startAutoSlide);

        carousel.addEventListener("touchstart", (event) => {
            touchStartX = event.changedTouches[0].screenX;
            stopAutoSlide();
        }, {
            passive: true
        });

        carousel.addEventListener("touchend", (event) => {
            touchEndX = event.changedTouches[0].screenX;

            const distance = touchStartX - touchEndX;

            if (Math.abs(distance) > 50) {
                if (distance > 0) {
                    showSlide(currentSlide + 1);
                } else {
                    showSlide(currentSlide - 1);
                }
            }

            startAutoSlide();
        }, {
            passive: true
        });

        showSlide(0);
        startAutoSlide();
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
