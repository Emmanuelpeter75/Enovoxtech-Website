// --- 1. THEME TOGGLE LOGIC (Mobile & Desktop Friendly) ---
const toggleTheme = () => {
    const body = document.body;
    const icon = document.getElementById("theme-icon");

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        if (icon) icon.className = "fa-solid fa-sun";
    } else {
        localStorage.setItem("theme", "light");
        if (icon) icon.className = "fa-solid fa-moon";
    }
};

// Initialize Theme on Load
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-btn");
    const icon = document.getElementById("theme-icon");

    // Apply saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (icon) icon.className = "fa-solid fa-sun";
    }

    // Listen for click
    if (btn) {
        btn.addEventListener("click", toggleTheme);
    }
});

// --- KEEP YOUR EXISTING FAQ LOGIC BELOW THIS LINE ---
// ... (The FAQ code you already have)

// --- KEEP YOUR COMING SOON TOAST LOGIC BELOW THIS LINE ---
// ... (The Toast code you already have)
// Location: theme.js -> bottom of file

// --- FAQ ACCORDION LOGIC ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other open items (optional)
        faqItems.forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });
        
        // Toggle the current item
        item.classList.toggle('active');
    });
});

// --- COMING SOON NOTIFICATION LOGIC ---
const aiButtons = document.querySelectorAll('.ai-status-btn, .ai-glow-btn');
const toast = document.getElementById('coming-soon-toast');

aiButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents the page from jumping
        
        // Show the toast
        toast.classList.add('show');
        
        // Hide it automatically after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    });
});
// --- MOBILE NAV DRAWER LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav-overlay");
    const closeBtn = document.querySelector(".close-btn");

    if (hamburger && mobileNav) {
        // Open the menu when clicking the hamburger
        hamburger.addEventListener("click", () => {
            mobileNav.classList.add("active");
        });

        // Close the menu when clicking the 'X' button
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                mobileNav.classList.remove("active");
            });
        }

        // Close the menu when clicking on any link inside (so it doesn't stay open after navigating)
        const mobileLinks = document.querySelectorAll(".mobile-links a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileNav.classList.remove("active");
            });
        });
    }
});


// ENOVOX AI FRONTEND LOGIC
document.addEventListener('DOMContentLoaded', () => {
    const launcher = document.getElementById('enovox-launcher');
    const windowEl = document.getElementById('enovox-window');
    const closeBtn = document.getElementById('enovox-close');
    const fullModeBtn = document.getElementById('enovox-full-mode');
    const sendBtn = document.getElementById('enovox-send');
    const input = document.getElementById('enovox-input');
    const messages = document.getElementById('enovox-messages');

    // Toggle UI Logic
    if (launcher && windowEl) {
        launcher.onclick = () => {
            windowEl.style.display = 'flex';
            launcher.style.display = 'none';
        };
    }

    if (closeBtn) {
        closeBtn.onclick = () => {
            windowEl.style.display = 'none';
            launcher.style.display = 'flex';
        };
    }

    // Full Mode Logic
    if (fullModeBtn) {
        fullModeBtn.onclick = () => {
            // Toggle the huge CSS class
            windowEl.classList.toggle('full-screen-mode');
            
            // Swap the icon by replacing the button's inner HTML
            if (windowEl.classList.contains('full-screen-mode')) {
                fullModeBtn.innerHTML = '<i class="fa-solid fa-compress"></i>'; 
                fullModeBtn.title = "Minimize";
            } else {
                fullModeBtn.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i>'; 
                fullModeBtn.title = "Expand";
            }
        };
    }

    
    // Helper to format Markdown (Bold and Line breaks)
    function formatBotText(text) {
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }

    // Message Handler
    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // Add User Message (Plain Text)
        appendMessage(text, 'user', false);
        input.value = '';

        // Add Animated Typing Indicator
        const typingHTML = '<div class="typing-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
        const loadingDiv = appendMessage(typingHTML, 'bot', true);

        try {
            // ---> THE FIX: Changed from 127.0.0.1 to your live Render URL <---
            const response = await fetch('https://enovox-backend.onrender.com/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await response.json();
            
            // Replace typing animation with formatted bot response
            if (data.response) {
                loadingDiv.innerHTML = formatBotText(data.response);
            } else if (data.error) {
                loadingDiv.innerText = "Error: " + data.error;
            }
        } catch (err) {
            loadingDiv.innerText = "System connection failed. Ensure your Render server is awake.";
        }
    }

    // Append Message to DOM
    function appendMessage(content, sender, isHTML) {
        const div = document.createElement('div');
        div.className = `msg ${sender}`;
        
        if (isHTML) {
            div.innerHTML = content;
        } else {
            div.innerText = content;
        }
        
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
        return div;
    }

    // Listeners for Sending
    if (sendBtn) sendBtn.onclick = sendMessage;
    if (input) {
        input.onkeypress = (e) => { 
            if (e.key === 'Enter') sendMessage(); 
        };
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Find our button and icon
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');

    if (themeBtn && themeIcon) {
        // 1. Check memory on page load
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun'); 
        }

        // 2. Listen for the user clicking the button
        themeBtn.addEventListener('click', () => {
            // Toggle the dark-mode class on the <html> tag
            document.documentElement.classList.toggle('dark-mode');
            
            // 3. Swap the icon and save their choice to memory
            if (document.documentElement.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun'); // Show sun
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.classList.replace('fa-sun', 'fa-moon'); // Show moon
            }
        });
    }
});