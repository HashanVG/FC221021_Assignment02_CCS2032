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
// Improved Mobile Navigation
document.addEventListener("DOMContentLoaded", () => {
  // Create mobile menu button
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  
  const menuBtn = document.createElement('button');
  menuBtn.className = 'mobile-menu-btn';
  menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  navbar.appendChild(menuBtn);
  
  // Toggle mobile menu
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.innerHTML = navLinks.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
  
  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
  
  // Highlight active section
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.5 });
  
  sections.forEach(section => observer.observe(section));
});

