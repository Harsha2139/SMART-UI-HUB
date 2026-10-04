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
    ".profile-card, .profile-content, .education-card, .timeline-item, .skill, .section-title, .contact"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});


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
    observer.observe(element);
});


// Highlight navigation while scrolling
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.style.color = "";

        if (link.getAttribute("href") === `#${current}`) {
            link.style.color = "#375dfb";
        }

    });

});