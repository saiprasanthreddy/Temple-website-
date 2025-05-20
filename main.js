// Hero Section Slider
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev-slide');
const nextButton = document.querySelector('.next-slide');
let currentSlide = 0;

// Debug: Log number of slides and their images
console.log('Number of slides:', slides.length);
slides.forEach((slide, index) => {
    const img = slide.querySelector('img');
    console.log(`Slide ${index} image src:`, img.src);
    console.log(`Slide ${index} image complete:`, img.complete);
    
    // Add load event listener to each image
    img.addEventListener('load', () => {
        console.log(`Image ${index} loaded successfully`);
    });
    
    img.addEventListener('error', () => {
        console.log(`Error loading image ${index}:`, img.src);
    });
});

function changeSlide(direction = 1) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    console.log('Changed to slide:', currentSlide);
}

// Initialize first slide
slides[currentSlide].classList.add('active');
console.log('Initialized first slide');

// Add click events to buttons
if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
        changeSlide(-1);
    });

    nextButton.addEventListener('click', () => {
        changeSlide(1);
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Touch events for mobile swipe
let touchStartX = 0;
let touchEndX = 0;

const heroSection = document.querySelector('.hero');
heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

heroSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // minimum distance for swipe
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swiped right - go to previous slide
            changeSlide(-1);
        } else {
            // Swiped left - go to next slide
            changeSlide(1);
        }
    }
}

// Smooth Scrolling with Offset for Fixed Header and Active State Tracking
const nav_Links = document.querySelectorAll('.nav-links a');

document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Add click events to buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Smooth scrolling for navigation links only
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Function to set active nav item
function setActiveNavItem() {
    const fromTop = window.scrollY + 100; // Offset for better accuracy

    nav_Links.forEach(link => {
        const section = document.querySelector(link.hash);
        
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (fromTop >= sectionTop && fromTop <= sectionBottom) {
                nav_Links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// Add click event listeners for smooth scrolling
nav_Links.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update active state
            nav_Links.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Update active state on scroll
document.addEventListener('scroll', setActiveNavItem);

// Set initial active state
setActiveNavItem();

// Donation Progress Bars Animation
const progressBars = document.querySelectorAll('.progress');

function animateProgressBars() {
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1.5s ease-in-out';
        }, 100);
    });
}

// Animate progress bars and other elements when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('progress-bar')) {
                animateProgressBars();
            } else {
                entry.target.classList.add('animate');
            }
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

// Observe progress bars
progressBars.forEach(bar => observer.observe(bar.parentElement));

// Observe cards for animation
const animatedElements = document.querySelectorAll('.event-card, .patashala-card, .jeeyar-card, .info-card');
animatedElements.forEach(element => observer.observe(element));

// Mobile Navigation Toggle
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.classList.add('mobile-menu-btn');
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

navbar.insertBefore(mobileMenuBtn, navLinks);

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Hide mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Navbar Scroll Behavior
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add background to navbar when scrolling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// Donation Button Click Handler
const donateButtons = document.querySelectorAll('.donate-btn');
const modalTemplate = document.querySelector('#donation-modal-template');

donateButtons.forEach(button => {
    button.addEventListener('click', () => {
        const cause = button.dataset.cause;
        const modal = modalTemplate.content.cloneNode(true);
        const modalElement = modal.querySelector('.donation-modal');
        const causeElement = modal.querySelector('.cause-name');
        const donorForm = modal.querySelector('.donor-details');
        const amountButtons = modal.querySelectorAll('.donation-amounts button');
        let selectedAmount = null;

        // Set the cause name
        causeElement.textContent = cause;

        // Add modal to the page
        document.body.appendChild(modal);
        setTimeout(() => modalElement.classList.add('active'), 10);

        // Handle amount selection
        amountButtons.forEach(btn => {
            if (btn.classList.contains('custom-amount')) {
                btn.addEventListener('click', () => {
                    const amount = prompt('Enter custom amount in ₹:');
                    if (amount && !isNaN(amount)) {
                        selectedAmount = parseInt(amount);
                        amountButtons.forEach(b => b.classList.remove('selected'));
                        btn.classList.add('selected');
                        donorForm.style.display = 'block';
                    }
                });
            } else {
                btn.addEventListener('click', () => {
                    selectedAmount = parseInt(btn.dataset.amount);
                    amountButtons.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    donorForm.style.display = 'block';
                });
            }
        });

        // Handle form submission
        donorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(donorForm);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');

            // Here you would typically send this data to your server
            console.log('Donation Details:', {
                cause,
                amount: selectedAmount,
                firstName,
                lastName,
                email,
                phone,
                message
            });

            // Show success message
            alert(`Thank you ${firstName}! Your donation of ₹${selectedAmount} for ${cause} has been processed. (This is a demo)`);
            closeModal();
        });

        // Close modal function
        const closeModal = () => {
            modalElement.classList.remove('active');
            setTimeout(() => document.body.removeChild(modalElement), 300);
        };

        // Close button and outside click
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) closeModal();
        });
    });
});

