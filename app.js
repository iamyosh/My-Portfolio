document.getElementById("year").textContent = new Date().getFullYear();

// Add typing animation effect to the home section heading
function typeWriter(element, text, speed) {
  let i = 0;
  element.textContent = "";
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else{
      setTimeout(erase, 1500);
    }
  }
  function erase(){
    if(element.textContent.length > 0){
      element.textContent = element.textContent.slice(0, -1);
      setTimeout(erase,speed/2);
    }else{
      i=0;
      setTimeout(type,500);
    }
  }
  
  type();
}

// Run typing animation when page loads
document.addEventListener("DOMContentLoaded", function() {
  const heading = document.querySelector("#home h1");
  const originalText = heading.textContent;
  typeWriter(heading, originalText, 100);
});

// Smooth Scroll Navigation
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Close mobile menu if open
    if (mobileMenu.classList.contains('show')) {
      toggleMobileMenu();
    }
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Mobile Menu Toggle
const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("nav-links");

function toggleMobileMenu() {
  menuIcon.classList.toggle("active");
  mobileMenu.classList.toggle("show");
}

menuIcon.addEventListener("click", toggleMobileMenu);

// Scroll to Top Button functionality
const scrollToTopButton = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function() {
  // Show/hide scroll to top button
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollToTopButton.style.display = "block";
    scrollToTopButton.style.opacity = "1";
  } else {
    scrollToTopButton.style.opacity = "0";
    setTimeout(() => {
      if (document.body.scrollTop <= 200 && document.documentElement.scrollTop <= 200) {
        scrollToTopButton.style.display = "none";
      }
    }, 300);
  }
  
  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");
  
  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

scrollToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Enhanced Project Modal
function openProjectModal(project) {
  const modalContent = {
    project1: {
      title: "Interactive Simon Game",
      description: "A web-based recreation of the classic memory skill game using HTML, CSS, and JavaScript. This project features the iconic colorful interface with sound patterns that players must memorize and repeat with increasing difficulty..",
      tech: ["HTML , ", " CSS , ", " JavaScript"],
      link: "https://github.com/iamyosh/simon-game-challenge.git"
    },
    project2: {
      title: "Enhanced Color Picker Application",
      description: "This is a unique Color Picker Application created with React js which includes advanced functionalities like; Choosing a random color, seeing the Color History, creating a Gradient Color, saving the Favorite Colors, copying the HEX code etc...",
      tech: ["JavaScript, ", "React js, ", "HTML, ", "CSS"],
      link: "https://github.com/iamyosh/Enhanced-Color-Picker-Application"
    }
  };
  
  const projectData = modalContent[project];
  const modal = document.getElementById("project-modal");
  const projectDetails = document.getElementById("project-details");
  
  // Create content for the modal
  let techStackHTML = '';
  projectData.tech.forEach(tech => {
    techStackHTML += `<span class="tech-badge">${tech}</span>`;
  });
  
  projectDetails.innerHTML = `
    <h3>${projectData.title}</h3>
    <p>${projectData.description}</p>
    <div class="tech-stack">
      <h4>Technologies Used:</h4>
      <div class="tech-badges">${techStackHTML}</div>
    </div>
    <a href="${projectData.link}" class="project-link" target="_blank">View on Github</a>
  `;
  
  // Show modal with animation
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add("active");
  }, 10);
}

document.getElementById("close-modal").addEventListener("click", function () {
  const modal = document.getElementById("project-modal");
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
});

// Close modal when clicking outside
window.addEventListener("click", function(event) {
  const modal = document.getElementById("project-modal");
  if (event.target === modal) {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
});

// Light/Dark Mode Toggle with enhanced transition and local storage
const modeToggle = document.getElementById("mode-toggle");
const root = document.documentElement;

// Check for saved mode preference or respect OS preference
function getPreferredColorScheme() {
  // Check for saved user preference
  const savedMode = localStorage.getItem("preferredMode");
  if (savedMode) {
    return savedMode;
  }
  
  // Otherwise check for OS preference
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

// Set initial mode
function initializeMode() {
  const preferredMode = getPreferredColorScheme();
  
  if (preferredMode === "light") {
    document.body.classList.add("light-mode");
    modeToggle.textContent = "🌞";
  } else {
    document.body.classList.remove("light-mode");
    modeToggle.textContent = "🌙";
  }
}

// Run on page load
initializeMode();

modeToggle.addEventListener("click", () => {
  // Add transition class for smooth color changes
  document.body.classList.add("color-transition");
  
  // Toggle mode
  document.body.classList.toggle("light-mode");
  const mode = document.body.classList.contains("light-mode") ? "light" : "dark";
  
  // Update button icon
  modeToggle.textContent = mode === "light" ? "🌞" : "🌙";
  
  // Save preference
  localStorage.setItem("preferredMode", mode);
  
  // Remove transition class after transition completes
  setTimeout(() => {
    document.body.classList.remove("color-transition");
  }, 500);
});

// Simple form validation
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    
    if (name === "" || email === "" || message === "") {
      alert("Please fill in all fields");
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }
    
    // Normally you would submit the form here
    // For demo purposes:
    alert("Thanks for your message! I'll get back to you soon.");
    contactForm.reset();
  });
}

// Add scroll animations
const animateOnScroll = function() {
  const elements = document.querySelectorAll(".projects-grid .project, .blog-post, #skills li, #services li");
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.classList.add("animate");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Add active status to skills 
const skillItems = document.querySelectorAll("#skills li");
skillItems.forEach(skill => {
  skill.addEventListener("mouseover", function() {
    skillItems.forEach(item => item.classList.remove("active-skill"));
    this.classList.add("active-skill");
  });
});


//Animation for professional skills section
document.addEventListener('DOMContentLoaded', function() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const finalWidth = bar.style.width;
    bar.style.width = '0';
    
    setTimeout(() => {
      bar.style.width = finalWidth;
    }, 300);
  });
});

