// ===============================
// Smooth navigation
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ===============================
// Scroll reveal animation
// ===============================

const revealElements = document.querySelectorAll(
    ".section, .skill-card, .project-card, .hero-card, .contact-section"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});


// ===============================
// Current year in footer
// ===============================

const copyright = document.querySelector(".copyright");

if (copyright) {
    const year = new Date().getFullYear();

    copyright.textContent =
        `© ${year} Venkateswara Reddy. All rights reserved.`;
}


// ===============================
// Console message
// ===============================

console.log("Portfolio loaded successfully.");