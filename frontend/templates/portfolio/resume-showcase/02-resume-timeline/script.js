// Resume Timeline interactions

document.addEventListener("DOMContentLoaded", () => {

  // Add a small active effect to navigation links
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Reveal timeline and cards when they enter the screen
  const revealItems = document.querySelectorAll(
    ".timeline-item, .education-card, .skill-card"
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealItems.forEach(item => {
    item.classList.add("reveal");
    observer.observe(item);
  });

});