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


// NEW: Seamless Waitlist Form Interaction (Background Fetch)
const waitlistForm = document.querySelector('.waitlist-form');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevents the page from refreshing
        
        const emailInput = waitlistForm.querySelector('input[type="email"]');
        const btn = waitlistForm.querySelector('button');
        const originalText = btn.innerText;

        // Visual feedback while sending
        btn.innerText = "Sending...";
        btn.style.pointerEvents = "none"; // Freezes the button so hover effects don't trigger
        
        // Gather the form data
        const formData = new FormData(waitlistForm);

        try {
            // Silently send the data to Web3Forms
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                // Success! Show the Joined state
                btn.innerText = "Joined!";
                btn.style.backgroundColor = "#00d2ff"; // E-NovoxTech Cyan
                btn.style.color = "#000000"; // Solid black text for perfect contrast
                emailInput.value = ""; // Clear the input

                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = ""; // Resets to your CSS default
                    btn.style.color = ""; // Resets to your CSS default
                    btn.style.pointerEvents = "auto"; // Turns hover effects back on!
                }, 3000);
            } else {
                // Handle server error gracefully
                btn.innerText = "Try Again";
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.pointerEvents = "auto";
                }, 3000);
            }
        } catch (error) {
            // Handle network error gracefully
            btn.innerText = "Network Error";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.pointerEvents = "auto";
            }, 3000);
        }
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