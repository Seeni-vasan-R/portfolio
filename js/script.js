/* ==========================================================
   PORTFOLIO JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       SELECTORS
    ====================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    const backToTop = document.getElementById("backToTop");

    const header = document.querySelector(".header");

    const sections = document.querySelectorAll("section");

    /* ======================================================
       MOBILE MENU
    ====================================================== */

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navLinks.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }

    /* ======================================================
       CLOSE MOBILE MENU
    ====================================================== */

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

    /* ======================================================
       CLICK OUTSIDE MENU
    ====================================================== */

    document.addEventListener("click", (e) => {

        if (
            navLinks.classList.contains("active") &&
            !navLinks.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

    /* ======================================================
       WINDOW RESIZE
    ====================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

    /* ======================================================
       HEADER SHADOW
    ====================================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow = "0 8px 25px rgba(0,0,0,.08)";

        } else {

            header.style.boxShadow = "none";

        }

    });

    /* ======================================================
       BACK TO TOP BUTTON
    ====================================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /* ======================================================
       ACTIVE NAV LINK
    ====================================================== */

    function activeSection() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (pageYOffset >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active-link");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active-link");

            }

        });

    }

    window.addEventListener("scroll", activeSection);

    activeSection();

    /* ======================================================
       SCROLL REVEAL
    ====================================================== */

    const revealItems = document.querySelectorAll(

        ".about-card,\
        .skill-category,\
        .project-card,\
        .certificate-card,\
        .achievement-card,\
        .education-card,\
        .contact-card"

    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

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

    revealItems.forEach(item => {

        observer.observe(item);

    });

    /* ======================================================
       TYPING EFFECT
    ====================================================== */

    const heroTitle = document.querySelector(".hero h2");

    if (heroTitle) {

        const text = heroTitle.textContent;

        heroTitle.textContent = "";

        let index = 0;

        function typeWriter() {

            if (index < text.length) {

                heroTitle.textContent += text.charAt(index);

                index++;

                setTimeout(typeWriter, 70);

            }

        }

        setTimeout(typeWriter, 400);

    }

    /* ======================================================
       SMOOTH SCROLL
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(

                this.getAttribute("href")

            );

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

});
