// 1. Mobile Menu Toggle
const hamburger = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
const closeBtn = document.getElementById('close-btn');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// 2. OPTIMIZED Scroll Reveal (No Lag)
const revealElements = document.querySelectorAll('.reveal');

// Add 'waiting' class to hide elements initially
revealElements.forEach(el => el.classList.add('waiting'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.classList.remove('waiting');
            // Optional: Stop observing once revealed to save resources
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

revealElements.forEach((el) => observer.observe(el));

// 3. NEW: Waitlist Form Interaction
const waitlistForm = document.querySelector('.waitlist-form');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the page from refreshing
        
        const emailInput = waitlistForm.querySelector('input[type="email"]');
        const btn = waitlistForm.querySelector('button');

        // Visual feedback
        const originalText = btn.innerText;
        btn.innerText = "Joined!";
        btn.style.backgroundColor = "#ffffff";
        emailInput.value = ""; // Clear the input

        // Reset button after 3 seconds
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "#00d4ff";
        }, 3000);
    });
}

// --- MOBILE MENU TOGGLE ---
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Optional: change icon to an X when open
            const icon = hamburger.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }
});