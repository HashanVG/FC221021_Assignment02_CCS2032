document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section");

  // Highlight nav item on click
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(el => el.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Scroll-based nav highlight
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        navItems.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href")?.substring(1) === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }, {
    threshold: 0.6
  });

  sections.forEach(section => sectionObserver.observe(section));

  // Animate skill progress bars on scroll
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const progress = entry.target.querySelector(".progress");
      const percent = entry.target.getAttribute("data-percent");

      if (entry.isIntersecting && progress && percent) {
        progress.style.width = percent;
      } else if (progress) {
        progress.style.width = "0%"; // Reset when out of view
      }
    });
  }, {
    threshold: 0.5
  });

  document.querySelectorAll(".skill").forEach(skill => {
    skillObserver.observe(skill);
  });

  // Animate elements on scroll (replay on re-enter)
  const animatedItems = document.querySelectorAll('.animate-on-scroll');
  const animObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // Reset when out of view
      }
    });
  }, {
    threshold: 0.3
  });

  animatedItems.forEach(item => animObserver.observe(item));
});

console.log("Portfolio loaded.");

