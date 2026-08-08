document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    const backToTop = document.getElementById("backToTop");
    const header = document.querySelector(".header");
    const sections = document.querySelectorAll("section");

    const projectSlider = document.querySelector(
        "[data-project-slider]"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* MOBILE MENU */

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


    /* PROJECT SLIDER */

    if (projectSlider) {
        const projectTrack =
            projectSlider.querySelector(".projects-track");

        const projectSlides =
            projectSlider.querySelectorAll(".project-slide");

        const previousButton =
            projectSlider.querySelector(".project-slider-prev");

        const nextButton =
            projectSlider.querySelector(".project-slider-next");

        const projectDots =
            projectSlider.querySelectorAll(".project-dot");

        let currentProject = 0;
        let projectAutoSlide;
        let touchStartX = 0;
        let touchEndX = 0;

        function showProject(index) {
            currentProject =
                (index + projectSlides.length) %
                projectSlides.length;

            projectTrack.style.transform =
                `translateX(-${currentProject * 100}%)`;

            projectDots.forEach((dot, dotIndex) => {
                dot.classList.toggle(
                    "active",
                    dotIndex === currentProject
                );
            });
        }

        function showNextProject() {
            showProject(currentProject + 1);
        }

        function showPreviousProject() {
            showProject(currentProject - 1);
        }

        function stopProjectAutoSlide() {
            clearInterval(projectAutoSlide);
        }

        function startProjectAutoSlide() {
            if (reduceMotion || projectSlides.length <= 1) {
                return;
            }

            stopProjectAutoSlide();

            projectAutoSlide = setInterval(() => {
                showNextProject();
            }, 5000);
        }

        function restartProjectAutoSlide() {
            stopProjectAutoSlide();
            startProjectAutoSlide();
        }

        previousButton?.addEventListener("click", () => {
            showPreviousProject();
            restartProjectAutoSlide();
        });

        nextButton?.addEventListener("click", () => {
            showNextProject();
            restartProjectAutoSlide();
        });

        projectDots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                showProject(index);
                restartProjectAutoSlide();
            });
        });

        projectSlider.addEventListener("mouseenter", () => {
            stopProjectAutoSlide();
        });

        projectSlider.addEventListener("mouseleave", () => {
            startProjectAutoSlide();
        });

        projectSlider.addEventListener(
            "touchstart",
            (event) => {
                touchStartX =
                    event.changedTouches[0].screenX;

                stopProjectAutoSlide();
            },
            {
                passive: true
            }
        );

        projectSlider.addEventListener(
            "touchend",
            (event) => {
                touchEndX =
                    event.changedTouches[0].screenX;

                const swipeDistance =
                    touchStartX - touchEndX;

                if (Math.abs(swipeDistance) > 50) {
                    if (swipeDistance > 0) {
                        showNextProject();
                    } else {
                        showPreviousProject();
                    }
                }

                startProjectAutoSlide();
            },
            {
                passive: true
            }
        );

        showProject(0);
        startProjectAutoSlide();
    }


    /* HEADER SHADOW */

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


    /* BACK TO TOP */

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


    /* ACTIVE NAVIGATION */

    function updateActiveSection() {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop =
                section.offsetTop - 140;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navItems.forEach((link) => {
            link.classList.toggle(
                "active-link",
                link.getAttribute("href") ===
                `#${currentSection}`
            );
        });
    }

    window.addEventListener("scroll", updateActiveSection, {
        passive: true
    });

    updateActiveSection();


    /* SCROLL REVEAL */

    const revealItems = document.querySelectorAll(
        ".about-card, " +
        ".skill-category, " +
        ".education-card, " +
        ".certificate-card, " +
        ".achievement-card, " +
        ".project-slide, " +
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


    /* TYPING EFFECT */

    const heroTitle = document.querySelector(".hero h2");

    if (heroTitle && !reduceMotion) {
        const originalText =
            heroTitle.textContent.trim();

        heroTitle.textContent = "";

        let index = 0;

        function typeWriter() {
            if (index < originalText.length) {
                heroTitle.textContent +=
                    originalText.charAt(index);

                index++;

                setTimeout(typeWriter, 70);
            }
        }

        setTimeout(typeWriter, 400);
    }


    /* SMOOTH SCROLL */

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId =
                anchor.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: reduceMotion
                        ? "auto"
                        : "smooth",

                    block: "start"
                });
            }
        });
    });


    /* CURRENT YEAR */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }
});
