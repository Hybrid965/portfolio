const burger = document.querySelector(".burger");
const navLinks = document.getElementById("nav-links");

burger.addEventListener("click", function() {
    const isOpen = burger.classList.toggle("open");
    navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen);
});

// Close when clicking outside
document.addEventListener("click", function(e) {
    if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
        navLinks.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", false);
    }
});