(function () {
    "use strict";

    const burger = document.querySelector(".burger");
    const navLinks = document.getElementById("nav-links");
    const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll("a[href^='#']")) : [];

    function setNavigationState(isOpen) {
        if (!burger || !navLinks) {
            return;
        }

        burger.setAttribute("aria-expanded", String(isOpen));
        burger.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        navLinks.classList.toggle("is-open", isOpen);
        document.body.classList.toggle("nav-open", isOpen);
    }

    if (burger && navLinks) {
        burger.addEventListener("click", function () {
            const isOpen = burger.getAttribute("aria-expanded") !== "true";
            setNavigationState(isOpen);
        });

        navAnchors.forEach(function (link) {
            link.addEventListener("click", function () {
                setNavigationState(false);
            });
        });

        document.addEventListener("click", function (event) {
            const target = event.target;
            const isOpen = burger.getAttribute("aria-expanded") === "true";

            if (isOpen && target instanceof Node && !navLinks.contains(target) && !burger.contains(target)) {
                setNavigationState(false);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
                setNavigationState(false);
                burger.focus();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 980) {
                setNavigationState(false);
            }
        });
    }

    const experienceButtons = Array.from(document.querySelectorAll(".experience-toggle"));

    function closeExperienceItem(button) {
        const item = button.closest(".experience-item");
        const panelId = button.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;

        button.setAttribute("aria-expanded", "false");
        item?.classList.remove("is-open");

        if (panel) {
            panel.hidden = true;
        }
    }

    function openExperienceItem(button) {
        const item = button.closest(".experience-item");
        const panelId = button.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;

        button.setAttribute("aria-expanded", "true");
        item?.classList.add("is-open");

        if (panel) {
            panel.hidden = false;
        }
    }

    experienceButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const wasOpen = button.getAttribute("aria-expanded") === "true";

            experienceButtons.forEach(closeExperienceItem);

            if (!wasOpen) {
                openExperienceItem(button);
            }
        });
    });

    const observedSections = Array.from(document.querySelectorAll("main section[id]"));

    if ("IntersectionObserver" in window && navAnchors.length > 0) {
        const observer = new IntersectionObserver(function (entries) {
            const visibleEntry = entries
                .filter(function (entry) { return entry.isIntersecting; })
                .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];

            if (!visibleEntry) {
                return;
            }

            navAnchors.forEach(function (link) {
                const isCurrent = link.getAttribute("href") === "#" + visibleEntry.target.id;
                link.classList.toggle("is-active", isCurrent);

                if (isCurrent) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        }, {
            rootMargin: "-30% 0px -55% 0px",
            threshold: [0, 0.15, 0.35]
        });

        observedSections.forEach(function (section) {
            observer.observe(section);
        });
    }

    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = String(new Date().getFullYear());
    }
}());
