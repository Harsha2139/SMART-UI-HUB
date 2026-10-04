// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

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


// Current year
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// Scroll reveal animation
const revealElements = document.querySelectorAll(
    ".service-card, .project, .process-item, .hero-content, .workspace-card, .process-title"
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


revealElements.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
});