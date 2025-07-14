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
// Mobile menu toggle functionality
const setupMobileMenu = () => {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.createElement('div');
  
  menuToggle.className = 'mobile-menu-toggle';
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  navbar.appendChild(menuToggle);
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
  
  // Close menu when clicking a link
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
};

// Initialize mobile menu only on small screens
if (window.innerWidth <= 768) {
  setupMobileMenu();
}

// Update on resize
window.addEventListener('resize', () => {
  if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
    setupMobileMenu();
  } else if (window.innerWidth > 768 && document.querySelector('.mobile-menu-toggle')) {
    document.querySelector('.mobile-menu-toggle').remove();
    document.querySelector('.nav-links').classList.remove('active');
  }
});
