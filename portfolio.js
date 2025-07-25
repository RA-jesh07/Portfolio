// Portfolio JavaScript - Enhanced Functionality

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize all portfolio functionality
function initializePortfolio() {
    setupTypingAnimation();
    setupThemeToggle();
    setupScrollToTop();
    setupContactFormValidation();
    setupSmoothScrolling();
    setupAnimations();
}

// 1. TYPING ANIMATION
function setupTypingAnimation() {
    const titles = [
        'Frontend Designer',
        'Web Developer',
        'UI/UX Enthusiast',
        'React Developer'
    ];
    
    const titleElement = document.querySelector('.hero_leftside h1:nth-of-type(2)');
    if (!titleElement) return;
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeAnimation() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            titleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 75;
        } else {
            titleElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        // Add blinking cursor
        titleElement.innerHTML = titleElement.textContent + '<span class="cursor">|</span>';
        
        if (!isDeleting && charIndex === currentTitle.length) {
            setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }
        
        setTimeout(typeAnimation, typingSpeed);
    }
    
    // Add cursor CSS
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            animation: blink 1s infinite;
            color: #A53860;
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    typeAnimation();
}

// 2. THEME TOGGLE
function setupThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    // Insert theme toggle in navigation
    const downloadBtn = document.querySelector('.download_btn');
    downloadBtn.parentNode.insertBefore(themeToggle, downloadBtn);
    
    // Add theme toggle styles
    const themeStyles = document.createElement('style');
    themeStyles.textContent = `
        .theme-toggle {
            background: transparent;
            border: 2px solid #EF88AD;
            color: #EF88AD;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-right: 20px;
        }
        .theme-toggle:hover {
            background: #EF88AD;
            color: white;
            transform: scale(1.1);
        }
        
        /* Dark theme styles */
        body.dark-theme {
            background-color: #1a1a1a;
            color: #ffffff;
        }
        .dark-theme nav {
            background-color: #2d1b3d;
        }
        .dark-theme .container {
            background-color: #1a1a1a;
        }
        .dark-theme .intro-box {
            background-color: #2a2a2a;
            box-shadow: 0 8px 16px rgba(255, 255, 255, 0.1);
        }
        .dark-theme .intro-box h3,
        .dark-theme .intro-box p {
            color: #ffffff;
        }
        .dark-theme .project_box {
            background-color: #2a2a2a;
            box-shadow: 1px 8px 10px 2px rgba(255, 255, 255, 0.1);
        }
        .dark-theme .input_field,
        .dark-theme textarea {
            background-color: #2a2a2a;
            color: #ffffff;
            border-color: #555;
        }
        .dark-theme footer {
            background-color: #2a2a2a;
        }
    `;
    document.head.appendChild(themeStyles);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        themeToggle.innerHTML = isDark ? 
            '<i class="fa-solid fa-sun"></i>' : 
            '<i class="fa-solid fa-moon"></i>';
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// 3. SCROLL TO TOP
function setupScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Add scroll to top styles
    const scrollStyles = document.createElement('style');
    scrollStyles.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #A53860;
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(165, 56, 96, 0.3);
        }
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        .scroll-to-top:hover {
            background: #670D2F;
            transform: translateY(-3px);
            box-shadow: 0 6px 16px rgba(165, 56, 96, 0.4);
        }
    `;
    document.head.appendChild(scrollStyles);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 4. CONTACT FORM VALIDATION
function setupContactFormValidation() {
    const form = document.querySelector('.form_control');
    if (!form) return;
    
    const nameInput = form.querySelector('input[placeholder="Name"]');
    const emailInput = form.querySelector('input[placeholder="Email"]');
    const messageTextarea = form.querySelector('textarea[placeholder="Message"]');
    const submitBtn = form.querySelector('.d_btn');
    
    // Add validation styles
    const validationStyles = document.createElement('style');
    validationStyles.textContent = `
        .form-error {
            color: #dc3545;
            font-size: 12px;
            margin-top: 5px;
            display: block;
        }
        .input-error {
            border-color: #dc3545 !important;
            box-shadow: 0 0 5px rgba(220, 53, 69, 0.3);
        }
        .input-success {
            border-color: #28a745 !important;
            box-shadow: 0 0 5px rgba(40, 167, 69, 0.3);
        }
        .form-success {
            background: #d4edda;
            color: #155724;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
            border: 1px solid #c3e6cb;
        }
    `;
    document.head.appendChild(validationStyles);
    
    // Validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validateName(name) {
        return name.trim().length >= 2;
    }
    
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    function showError(input, message) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('span');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
    }
    
    function showSuccess(input) {
        input.classList.remove('input-error');
        input.classList.add('input-success');
        
        // Remove error message
        const existingError = input.parentNode.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function showFormSuccess() {
        // Remove existing success message
        const existingSuccess = form.querySelector('.form-success');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        // Add success message
        const successElement = document.createElement('div');
        successElement.className = 'form-success';
        successElement.textContent = 'Thank you! Your message has been sent successfully.';
        form.insertBefore(successElement, form.firstChild);
        
        // Clear form
        nameInput.value = '';
        emailInput.value = '';
        messageTextarea.value = '';
        
        // Remove success classes
        [nameInput, emailInput, messageTextarea].forEach(input => {
            input.classList.remove('input-success', 'input-error');
        });
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', function() {
        if (validateName(this.value)) {
            showSuccess(this);
        } else {
            showError(this, 'Name must be at least 2 characters long');
        }
    });
    
    emailInput.addEventListener('blur', function() {
        if (validateEmail(this.value)) {
            showSuccess(this);
        } else {
            showError(this, 'Please enter a valid email address');
        }
    });
    
    messageTextarea.addEventListener('blur', function() {
        if (validateMessage(this.value)) {
            showSuccess(this);
        } else {
            showError(this, 'Message must be at least 10 characters long');
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Name must be at least 2 characters long');
            isValid = false;
        } else {
            showSuccess(nameInput);
        }
        
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }
        
        if (!validateMessage(messageTextarea.value)) {
            showError(messageTextarea, 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            showSuccess(messageTextarea);
        }
        
        if (isValid) {
            // Simulate form submission
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showFormSuccess();
                submitBtn.innerHTML = 'Send <i class="fa-solid fa-paper-plane"></i>';
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

// 5. SMOOTH SCROLLING ENHANCEMENT
function setupSmoothScrolling() {
    // Enhanced smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 78; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 6. SCROLL ANIMATIONS
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .project_box {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .project_box:hover {
            transform: translateY(-10px);
        }
        .logos {
            transition: transform 0.3s ease;
        }
        .logos:hover {
            transform: scale(1.2) rotate(5deg);
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.intro-box, .skills, .project_box, .contact_info, .form_control');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// 7. ADDITIONAL ENHANCEMENTS
// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyles);
});

// Add click effects to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button') || e.target.closest('button')) {
        const button = e.target.matches('button') ? e.target : e.target.closest('button');
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
});

// Console welcome message
console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #A53860; font-size: 16px; font-weight: bold;');
console.log('%c✨ Features: Typing Animation, Theme Toggle, Scroll to Top, Form Validation', 'color: #670D2F; font-size: 12px;');