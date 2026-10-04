// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// Current year in footer
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// Simple reveal animation
const sections = document.querySelectorAll(
    ".project, .service, .about-title, .about-text, .hero-text, .hero-card"
);

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

sections.forEach(section => {
    section.classList.add("reveal");
    observer.observe(section);
});