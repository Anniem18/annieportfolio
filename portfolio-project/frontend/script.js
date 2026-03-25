// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });

        // Close menu on click (mobile)
        navLinks.classList.remove("active");
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(".section, .project-card, .skill").forEach(el => {
    observer.observe(el);
});

// ===== TYPING EFFECT =====
const typingText = document.querySelector(".hero-content h3");

const roles = [
    "Full Stack Developer",
    "Frontend Developer",
    "JavaScript Learner",
    "Future Software Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex--);
    } else {
        typingText.textContent = currentRole.substring(0, charIndex++);
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        speed = 1500; // pause
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 300;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ===== OPTIONAL: HERO FADE-IN ON LOAD =====
window.addEventListener("load", () => {
    document.querySelector(".hero-content").classList.add("fade-in");
});
const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    try {
        const res = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        alert(data.message);
        form.reset();

    } catch (err) {
        alert("Error sending message!");
        console.error(err);
    }
});