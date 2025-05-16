// Event Handling: Change welcome text and color
function toggleWelcome() {
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText.style.color === 'purple') {
        welcomeText.textContent = 'Welcome to Our Gallery!';
        welcomeText.style.color = '';
    } else {
        welcomeText.textContent = 'Explore Our Stunning Photos!';
        welcomeText.style.color = 'purple';
    }
}

// Slideshow Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto-rotate slideshow every 5 seconds
setInterval(nextSlide, 5000);

// Tab Functionality
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`button[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Form Validation
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && /\d/.test(password);
}

function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = message;
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    let isValid = true;

    if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        isValid = false;
    }
    if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Invalid email format');
        isValid = false;
    }
    if (!passwordInput.value) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (!validatePassword(passwordInput.value)) {
        showError(passwordInput, 'Password must be 8+ characters with at least 1 number');
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
    }
});

// Real-time Feedback
[nameInput, emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', () => {
        clearErrors();
        if (input === nameInput && !input.value.trim()) {
            showError(input, 'Name is required');
        }
        if (input === emailInput && input.value && !validateEmail(input.value)) {
            showError(input, 'Invalid email format');
        }
        if (input === passwordInput && input.value && !validatePassword(input.value)) {
            showError(input, 'Password must be 8+ characters with at least 1 number');
        }
    });
});

// Keypress: Filter slides by category
document.getElementById('category-filter').addEventListener('input', (e) => {
    const filter = e.target.value.toLowerCase();
    slides.forEach(slide => {
        const category = slide.dataset.category.toLowerCase();
        slide.classList.toggle('active', filter === '' || category.includes(filter));
    });
    currentSlide = 0; // Reset slideshow
});

// Bonus: Double-click to enlarge image
slides.forEach(slide => {
    slide.addEventListener('dblclick', () => {
        slide.classList.add('enlarged');
        setTimeout(() => slide.classList.remove('enlarged'), 1000);
    });
});

// Initialize first slide
showSlide(currentSlide);

// Attach event listener for welcome button
document.getElementById('toggle-welcome').addEventListener('click', toggleWelcome);
