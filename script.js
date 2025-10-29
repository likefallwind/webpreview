// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

// Only run scroll-based nav highlighting on single-page layouts
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth Scroll for Navigation Links (only for same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and elements
const animatedElements = document.querySelectorAll(
    '.feature-card, .research-card, .project-card, .team-card, .info-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('感谢您的留言！我们会尽快与您联系。');
        
        // Reset form
        contactForm.reset();
    });
}

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroBackground && scrolled < hero.offsetHeight) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Counter Animation for Stats (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.style.visibility = 'visible';

// Research Page Filters
const yearFilter = document.getElementById('year-filter');
const topicFilter = document.getElementById('topic-filter');
const venueFilter = document.getElementById('venue-filter');

if (yearFilter && topicFilter && venueFilter) {
    const filterPapers = () => {
        const yearValue = yearFilter.value;
        const topicValue = topicFilter.value;
        const venueValue = venueFilter.value;
        
        const papers = document.querySelectorAll('.paper-item');
        
        papers.forEach(paper => {
            const paperYear = paper.getAttribute('data-year');
            const paperTopic = paper.getAttribute('data-topic');
            const paperVenue = paper.getAttribute('data-venue');
            
            const yearMatch = yearValue === 'all' || paperYear === yearValue;
            const topicMatch = topicValue === 'all' || paperTopic === topicValue;
            const venueMatch = venueValue === 'all' || paperVenue === venueValue;
            
            if (yearMatch && topicMatch && venueMatch) {
                paper.style.display = 'block';
            } else {
                paper.style.display = 'none';
            }
        });
        
        // Hide year sections with no visible papers
        const yearSections = document.querySelectorAll('.year-section');
        yearSections.forEach(section => {
            const visiblePapers = section.querySelectorAll('.paper-item[style="display: block;"]');
            if (visiblePapers.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'flex';
            }
        });
    };
    
    yearFilter.addEventListener('change', filterPapers);
    topicFilter.addEventListener('change', filterPapers);
    venueFilter.addEventListener('change', filterPapers);
}
