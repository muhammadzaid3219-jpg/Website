// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate Links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking on a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        links.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Add shadow to header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formValues);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Add animation to menu items when they come into view
const menuItems = document.querySelectorAll('.menu-item, .review, .contact-form');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeIn 0.6s ease forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

menuItems.forEach(item => {
    observer.observe(item);
});

// Dynamic year in footer
const year = new Date().getFullYear();
document.querySelector('.footer-bottom p').innerHTML = `&copy; ${year} Delicious Bites. All rights reserved.`;

// Preloader
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="loader">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    document.body.prepend(preloader);
    
    // Remove preloader after page loads
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }, 1000);
});

// Add CSS for preloader
const preloaderStyle = document.createElement('style');
preloaderStyle.textContent = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #111;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    }
    
    .loader {
        text-align: center;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        border-top-color: var(--primary-color);
        animation: spin 1s ease-in-out infinite;
        margin: 0 auto 15px;
    }
    
    .loader p {
        color: #fff;
        font-size: 16px;
        margin-top: 10px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

document.head.appendChild(preloaderStyle);
