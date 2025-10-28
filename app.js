// Skeleton simulation - sab kuch hide karo pehle
function simulateLoading() {
    console.log("Skeleton animation starting...");

    // 3 second baad content show karo
    setTimeout(() => {
        document.body.classList.add('loaded');

        // Show actual content and hide skeletons
        const actualContents = document.querySelectorAll('.actual-content');
        actualContents.forEach(content => {
            content.style.display = 'block';
        });

        // Hide skeletons
        const skeletons = document.querySelectorAll('.skeleton-content');
        skeletons.forEach(skeleton => {
            skeleton.style.display = 'none';
        });

        console.log("Content loaded after 3 seconds");
    }, 3000);
}

// Right Click OFF

// Body par ye code lagayein
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
document.addEventListener('keydown', function (e) {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u')
    ) {
        e.preventDefault();
    }
});

// Ye code developer tools khulte hi page ko reload kar dega
setInterval(function () {
    debugger;
}, 1000);

// Developer tools detect hone par page reload ho jaye
var devToolsOpen = false;
setInterval(function () {
    if (window.outerWidth - window.innerWidth > 100 ||
        window.outerHeight - window.innerHeight > 100) {
        if (!devToolsOpen) {
            devToolsOpen = true;
            window.location.reload();
        }
    }
}, 1000);

// Header functionality
const shareBtn = document.querySelector(".share-btn");
const dropdown = document.getElementById("shareDropdown");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

shareBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
});

menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    mainNav.classList.toggle("active");

    const icon = menuToggle.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.addEventListener('click', (e) => {
    if (!shareBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("show");
    }

    if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove("active");
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Form functionality - FIXED
const contactForm = document.getElementById('contactForm');
const closeForm = document.getElementById('closeForm');
const contactFormElement = document.getElementById('contactFormElement');
const getInTouchBtns = document.querySelectorAll('.btn1');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');

// IMPORTANT: Button click event with proper event handling
getInTouchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Button clicked - opening form');
        contactForm.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeForm.addEventListener('click', () => {
    contactForm.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
});

// Form submission with Formspree
contactFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitSpinner.style.display = 'inline-block';

    try {
        // Send form data to Formspree
        const response = await fetch('https://formspree.io/f/mldpyyvn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            showMessage('Thank you for your message! We will get back to you soon.', 'success');
            resetForm();
            // Close form after 2 seconds
            setTimeout(() => {
                contactForm.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 2000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.log('Error:', error);
        showMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitText.textContent = 'Submit';
        submitSpinner.style.display = 'none';
    }
});

// Add these missing functions to your dashboard script

// Banner Management Functions
function saveBanner() {
    websiteData.banner.title = document.getElementById('bannerTitle').value;
    websiteData.banner.description = document.getElementById('bannerDesc').value;

    saveData();
    showToast('Banner updated successfully!', 'success');
    updateLivePreview();
}

// Contact Management Function
function saveContact() {
    websiteData.contact.companyName = document.getElementById('companyName').value;
    websiteData.contact.email = document.getElementById('companyEmail').value;
    websiteData.contact.phone = document.getElementById('companyPhone').value;
    websiteData.contact.address = document.getElementById('companyAddress').value;

    saveData();
    showToast('Contact information updated successfully!', 'success');
}

// Fix the skeleton loading issue
function simulateDashboardLoading() {
    console.log("Dashboard skeleton loading...");

    setTimeout(() => {
        document.body.classList.add('loaded');
        console.log("Dashboard content loaded");
    }, 2000);
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
}

function resetForm() {
    contactFormElement.reset();
    formMessage.className = 'form-message';
    formMessage.style.display = 'none';
}

// Close form when clicking outside
contactForm.addEventListener('click', (e) => {
    if (e.target === contactForm) {
        contactForm.classList.remove('active');
        document.body.style.overflow = 'auto';
        resetForm();
    }
});

// Show More functionality for services
const showMoreBtn = document.getElementById('showMoreBtn');
const hiddenCards = document.querySelectorAll('.flip-card.hidden');
let isExpanded = false;

showMoreBtn.addEventListener('click', () => {
    if (!isExpanded) {
        hiddenCards.forEach(card => {
            card.classList.remove('hidden');
            card.classList.add('card-fade-in');
        });
        showMoreBtn.innerHTML = '<span>Show Less Services</span><i class="fas fa-chevron-up ml-2 transition-transform duration-300"></i>';
        isExpanded = true;
    } else {
        hiddenCards.forEach(card => {
            card.classList.add('hidden');
            card.classList.remove('card-fade-in');
        });
        showMoreBtn.innerHTML = '<span>Show More Services</span><i class="fas fa-chevron-down ml-2 transition-transform duration-300"></i>';
        isExpanded = false;
    }
});

// Slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const total = slides.length;

function updateSlider(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    updateSlider(currentIndex);
}, 5000);

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(autoSlide);
        currentIndex = parseInt(dot.dataset.index);
        updateSlider(currentIndex);
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % total;
            updateSlider(currentIndex);
        }, 5000);
    });
});

// NEW FORM FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const skeletonForm = document.getElementById('skeletonForm');
    const contactFormContent = document.getElementById('contactFormContent');
    const successAnimation = document.getElementById('successAnimation');
    const genuityContactForm = document.getElementById('genuityContactForm');
    const genuitySubmitBtn = document.getElementById('genuitySubmitBtn');
    const genuitySubmitText = document.getElementById('genuitySubmitText');
    const genuitySubmitSpinner = document.getElementById('genuitySubmitSpinner');
    const genuityFormMessage = document.getElementById('genuityFormMessage');
    const sendAnotherBtn = document.getElementById('sendAnotherBtn');

    // Simulate loading delay for new form
    function simulateFormLoading() {
        console.log("New form skeleton loading started...");

        // Show skeleton for 2 seconds
        setTimeout(() => {
            skeletonForm.style.display = 'none';
            contactFormContent.style.display = 'block';
            console.log("New form content loaded");
        }, 2000);
    }

    // Form submission handler for new form
    genuityContactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form data for validation
        const formData = new FormData(genuityContactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Validate form
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        genuitySubmitBtn.disabled = true;
        genuitySubmitText.textContent = 'Sending...';
        genuitySubmitSpinner.style.display = 'inline-block';

        try {
            // Submit the form using Formspree
            const response = await fetch(genuityContactForm.action, {
                method: 'POST',
                body: new FormData(genuityContactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success animation
                contactFormContent.style.display = 'none';
                successAnimation.style.display = 'block';
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showFormMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
        } finally {
            // Reset button state
            genuitySubmitBtn.disabled = false;
            genuitySubmitText.textContent = 'Send Message';
            genuitySubmitSpinner.style.display = 'none';
        }
    });

    // Send another message button
    sendAnotherBtn.addEventListener('click', function () {
        successAnimation.style.display = 'none';
        contactFormContent.style.display = 'block';
        genuityContactForm.reset();
        genuityFormMessage.style.display = 'none';
    });

    // Show form message
    function showFormMessage(message, type) {
        genuityFormMessage.textContent = message;
        genuityFormMessage.className = `contact-form-message contact-form-${type}`;
    }

    // Start the loading simulation for new form
    simulateFormLoading();
});

// Scroll Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const flipCards = document.querySelectorAll('.flip-card');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    flipCards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Page load pe simulation start karo
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM loaded, starting skeleton animation");
    simulateLoading();
    initScrollAnimations();
});

// Here To start Image Gallery and Filter Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Light Gallery
    const lightGallery = document.getElementById('lightgallery');
    if (lightGallery) {
        lightGallery.addEventListener('lgInit', (event) => {
            console.log('LightGallery initialized');
        });

        const gallery = window.lightGallery(lightGallery, {
            selector: '.image-item',
            speed: 500,
            download: false,
            counter: true,
            getCaptionFromTitleOrAlt: true
        });
    }

    // Filter functionality
    const filterLinks = document.querySelectorAll('.filters ul li a');
    const imageItems = document.querySelectorAll('.image-item');
    const projectCount = document.getElementById('projectCount');

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.getAttribute('data-filter');

            // Remove active class from all links
            filterLinks.forEach(l => l.classList.remove('active'));
            // Add active class to the clicked link
            link.classList.add('active');

            let visibleCount = 0;

            // Show/hide images based on filter
            imageItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            // Update project counter
            projectCount.textContent = visibleCount;
        });
    });

    // Project details functionality
    const projectDetailButtons = document.querySelectorAll('.project-details');
    projectDetailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const project = button.getAttribute('data-project');
            alert(`Showing details for ${project} project`);
            // In a real implementation, you would show a modal with project details
        });
    });

    // View project functionality
    const viewProjectButtons = document.querySelectorAll('.view-project');
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const project = button.getAttribute('data-project');
            alert(`Opening ${project} project in new tab`);
            // In a real implementation, you would navigate to the project page
        });
    });

    // Add keyboard navigation for Light Gallery
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.querySelector('.lg-backdrop.in')) {
            gallery.closeGallery();
        }
    });
});

// Here To start Experience Timer functionly
// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 150;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Create Floating Particles
function createParticles() {
    const container = document.querySelector('.counter-section');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${Math.random() * 6 + 4}s`;

        container.appendChild(particle);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Start counters after a short delay
    setTimeout(animateCounters, 800);

    // Create particles
    createParticles();

    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    document.querySelectorAll('.counter-card').forEach(card => {
        observer.observe(card);
    });
});

// Show more Function for Team
document.addEventListener('DOMContentLoaded', function () {
    const showMoreBtn = document.querySelector('.show-more-btn');
    const teamGrid = document.getElementById('teamGrid');
    const hiddenCards = document.querySelectorAll('.team-member-card.hidden');
    let cardsToShow = 2; // Number of cards to show each click
    let currentIndex = 0;

    showMoreBtn.addEventListener('click', function () {
        // Show next set of hidden cards
        const cardsToReveal = Array.from(hiddenCards).slice(currentIndex, currentIndex + cardsToShow);

        cardsToReveal.forEach(card => {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        });

        currentIndex += cardsToShow;

        // Hide button if no more cards to show
        if (currentIndex >= hiddenCards.length) {
            showMoreBtn.style.display = 'none';
        }

        // Update button text if it's the last click
        if (currentIndex + cardsToShow >= hiddenCards.length) {
            showMoreBtn.innerHTML = '<span>Show Remaining Team Members</span> <i class="fas fa-chevron-down"></i>';
        }
    });

    // Initially hide the button if there are no hidden cards
    if (hiddenCards.length === 0) {
        showMoreBtn.style.display = 'none';
    }
});

// Get more Functions

document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const deviceSlides = document.querySelectorAll('.device-slide');

    tabLinks.forEach(link => {
        link.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabLinks.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            deviceSlides.forEach(slide => slide.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
            deviceSlides[tabId - 1].classList.add('active');
        });
    });

    // Auto slide functionality
    let currentSlide = 0;
    function autoSlide() {
        currentSlide = (currentSlide + 1) % tabLinks.length;
        tabLinks[currentSlide].click();
    }

    // Change slide every 5 seconds
    setInterval(autoSlide, 5000);
});

// Blog Here

// Add scroll animation for blog cards
document.addEventListener('DOMContentLoaded', function () {
    const blogCards = document.querySelectorAll('.blog-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    blogCards.forEach(card => {
        observer.observe(card);
    });
});


// Navigation functionality

// Footer navigation function
function navigateToSection(section) {
    event.preventDefault();

    const navMap = {
        'home': { type: 'top', target: 0 },
        'about': { type: 'id', target: 'about' },
        'services': { type: 'id', target: 'services' },
        'projects': { type: 'id', target: 'projects' },
        'team': { type: 'id', target: 'team' }
    };

    const config = navMap[section];
    if (config) {
        scrollToTarget(config);

        // Update active nav
        document.querySelectorAll('#mainNav a').forEach(nav => nav.classList.remove('act'));
        document.getElementById(`nav-${section}`).classList.add('act');
    }
}

// Fixed Navigation Functionality
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('#mainNav a');
    const headerHeight = 80;

    // In your app.js, update the navMap:
    const navMap = {
        'nav-home': { type: 'top', target: 0 },
        'nav-about': { type: 'id', target: 'about' }, // Fixed: changed from 'element' to 'id'
        'nav-services': { type: 'id', target: 'services' },
        'nav-projects': { type: 'id', target: 'projects' },
        'nav-team': { type: 'id', target: 'team' },
        'nav-news': { type: 'id', target: 'news' },
        'nav-contacts': { type: 'id', target: 'contacts' }
    };
    // Click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Update active state
            navLinks.forEach(nav => nav.classList.remove('act'));
            this.classList.add('act');

            // Scroll to target
            const navConfig = navMap[this.id];
            if (navConfig) {
                scrollToTarget(navConfig);
            }
        });
    });

    function scrollToTarget(config) {
        let targetPosition = 0;

        if (config.type === 'top') {
            targetPosition = 0;
        }
        else if (config.type === 'element') {
            const element = document.querySelector(config.target);
            if (element) targetPosition = element.offsetTop;
        }
        else if (config.type === 'id') {
            const element = document.getElementById(config.target);
            if (element) targetPosition = element.offsetTop;
        }

        if (targetPosition > 0) {
            window.scrollTo({
                top: targetPosition - headerHeight,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Update active nav on scroll
    window.addEventListener('scroll', function () {
        const scrollPos = window.scrollY + 100;

        const sections = [
            { navId: 'nav-home', element: document.body, threshold: 100 },
            { navId: 'nav-about', element: document.querySelector('.slider-main') },
            { navId: 'nav-services', element: document.querySelector('#services') },
            { navId: 'nav-projects', element: document.querySelector('#projects') },
            { navId: 'nav-team', element: document.querySelector('#team') },
            { navId: 'nav-news', element: document.querySelector('#blog') },
            { navId: 'nav-contacts', element: document.querySelector('#contactFormSection') }
        ];

        let currentActive = 'nav-home';

        sections.forEach(section => {
            if (section.element) {
                const sectionTop = section.element.offsetTop;
                const sectionBottom = sectionTop + section.element.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    currentActive = section.navId;
                }
            }
        });

        // Update navigation
        navLinks.forEach(link => {
            link.classList.remove('act');
            if (link.id === currentActive) {
                link.classList.add('act');
            }
        });
    });

    // Mobile menu handling
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    });
});
// CMS Integration for Main Website
function loadCMSData() {
    const cmsData = localStorage.getItem('genuitywebData');
    if (cmsData) {
        const data = JSON.parse(cmsData);
        applyCMSData(data);
    }
}

function applyCMSData(data) {
    // Update Slider
    const slideTitle = document.querySelector('.slide.active .head, .slide.active .head1, .slide.active .head2');
    const slideDesc = document.querySelector('.slide.active .para, .slide.active .para1, .slide.active .para2');

    if (slideTitle && data.slider) {
        slideTitle.textContent = data.slider.slide1.title;
    }
    if (slideDesc && data.slider) {
        slideDesc.textContent = data.slider.slide1.description;
    }

    // Update Banner
    const bannerTitle = document.querySelector('.banner-text h1');
    const bannerDesc = document.querySelector('.banner-text p');

    if (bannerTitle && data.banner) {
        bannerTitle.textContent = data.banner.title;
    }
    if (bannerDesc && data.banner) {
        bannerDesc.textContent = data.banner.description;
    }

    // Update Counters
    if (data.counters) {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const countType = counter.getAttribute('data-count-type');
            if (countType && data.counters[countType]) {
                counter.setAttribute('data-count', data.counters[countType]);
                counter.textContent = '0';
                // Re-animate counter
                setTimeout(() => {
                    animateCounters();
                }, 500);
            }
        });
    }

    console.log('CMS data applied successfully!');
}

// Listen for CMS updates
window.addEventListener('storage', function (e) {
    if (e.key === 'genuitywebData') {
        loadCMSData();
    }
});

window.addEventListener('websiteDataUpdated', function (e) {
    applyCMSData(e.detail);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    loadCMSData();
});

// Simple Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('simpleSliderTrack');
    const prev = document.querySelector('.simple-prev');
    const next = document.querySelector('.simple-next');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('#simpleSliderTrack > div').length;

    function goToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
    }

    next.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    });

    prev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    });

    // Auto slide
    setInterval(() => {
        next.click();
    }, 4000);
});
// Schedule Meeting and Directions Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const scheduleMeetingBtn = document.getElementById('scheduleMeetingBtn');
    const getDirectionsBtn = document.getElementById('getDirectionsBtn');
    const scheduleModal = document.getElementById('scheduleModal');
    const directionsModal = document.getElementById('directionsModal');
    const closeScheduleModal = document.getElementById('closeScheduleModal');
    const closeDirectionsModal = document.getElementById('closeDirectionsModal');
    const cancelScheduleBtn = document.getElementById('cancelScheduleBtn');
    const scheduleForm = document.getElementById('scheduleForm');
    const scheduleFormMessage = document.getElementById('scheduleFormMessage');
    const submitScheduleBtn = document.getElementById('submitScheduleBtn');
    const scheduleSubmitText = document.getElementById('scheduleSubmitText');
    const scheduleSubmitSpinner = document.getElementById('scheduleSubmitSpinner');
    const replyToEmail = document.getElementById('replyToEmail');

    // Open Schedule Meeting Modal
    if (scheduleMeetingBtn) {
        scheduleMeetingBtn.addEventListener('click', function () {
            scheduleModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    // Open Get Directions Modal
    if (getDirectionsBtn) {
        getDirectionsBtn.addEventListener('click', function () {
            directionsModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close Modals
    function closeAllModals() {
        scheduleModal.classList.add('hidden');
        directionsModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    if (closeScheduleModal) {
        closeScheduleModal.addEventListener('click', closeAllModals);
    }

    if (closeDirectionsModal) {
        closeDirectionsModal.addEventListener('click', closeAllModals);
    }

    if (cancelScheduleBtn) {
        cancelScheduleBtn.addEventListener('click', closeAllModals);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === scheduleModal || event.target === directionsModal) {
            closeAllModals();
        }
    });

    // Update reply-to email dynamically
    function updateReplyToEmail() {
        const emailInput = scheduleForm.querySelector('input[name="email"]');
        if (emailInput && replyToEmail) {
            emailInput.addEventListener('input', function () {
                replyToEmail.value = this.value;
            });
        }
    }

    // Schedule Form Submission
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Show loading state
            submitScheduleBtn.disabled = true;
            scheduleSubmitText.textContent = 'Scheduling...';
            scheduleSubmitSpinner.style.display = 'inline-block';
            scheduleFormMessage.style.display = 'none';

            try {
                const formData = new FormData(scheduleForm);

                // Add additional data for better email formatting
                formData.append('_format', 'plain');
                formData.append('_cc', 'saleem@genuityweb.com'); // Additional email if needed

                const response = await fetch(scheduleForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success message
                    scheduleFormMessage.textContent = '✅ Thank you! Your meeting request has been sent successfully. We will contact you within 24 hours to confirm the schedule.';
                    scheduleFormMessage.className = 'form-message success';
                    scheduleFormMessage.style.display = 'block';

                    // Reset form
                    scheduleForm.reset();

                    // Close modal after 3 seconds
                    setTimeout(() => {
                        closeAllModals();
                        scheduleFormMessage.style.display = 'none';

                        // Reset button state after modal close
                        submitScheduleBtn.disabled = false;
                        scheduleSubmitText.textContent = 'Schedule Meeting';
                        scheduleSubmitSpinner.style.display = 'none';
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                scheduleFormMessage.textContent = '❌ Sorry, there was an error scheduling your meeting. Please try again or contact us directly at info@genuityweb.com';
                scheduleFormMessage.className = 'form-message error';
                scheduleFormMessage.style.display = 'block';

                // Reset button state on error
                submitScheduleBtn.disabled = false;
                scheduleSubmitText.textContent = 'Schedule Meeting';
                scheduleSubmitSpinner.style.display = 'none';
            }
        });

        // Initialize email update
        updateReplyToEmail();
    }

    // Update office address in directions modal from CMS data
    function updateDirectionsAddress() {
        const addressElement = document.getElementById('modalOfficeAddress');
        if (addressElement && websiteData && websiteData.location) {
            addressElement.textContent = websiteData.location.address;

            // Update Google Maps and Apple Maps links
            const encodedAddress = encodeURIComponent(websiteData.location.address);
            const googleMapsLink = document.querySelector('a[href*="google.com/maps"]');
            const appleMapsLink = document.querySelector('a[href*="maps.apple.com"]');

            if (googleMapsLink) {
                googleMapsLink.href = `https://www.google.com/maps/dir//${encodedAddress}`;
            }

            if (appleMapsLink) {
                appleMapsLink.href = `https://maps.apple.com/?q=${encodedAddress}`;
            }
        }
    }

    // Initialize when CMS data is loaded
    if (typeof websiteData !== 'undefined') {
        updateDirectionsAddress();
    }

    // Also update when CMS data changes
    if (typeof updateLocationData !== 'undefined') {
        const originalUpdateLocationData = updateLocationData;
        window.updateLocationData = function (data) {
            originalUpdateLocationData(data);
            updateDirectionsAddress();
        };
    }
});
// CMS Data Integration
function loadCMSData() {
    const cmsData = localStorage.getItem('genuitywebData');
    if (cmsData) {
        const data = JSON.parse(cmsData);
        applyCMSData(data);
    }
}

function applyCMSData(data) {
    // Update Slider
    updateSliderData(data.slider);

    // Update Banner
    updateBannerData(data.banner);

    // Update Services
    updateServicesData(data.services);

    // Update Projects
    updateProjectsData(data.projects);

    // Update Counters
    updateCountersData(data.counters);

    // Update Team
    updateTeamData(data.team);

    // Update Location
    updateLocationData(data.location);

    // Update Contact
    updateContactData(data.contact);

    // Update Brand
    updateBrandData(data.brand);
}

// Individual update functions
function updateSliderData(sliderData) {
    const slides = document.querySelectorAll('.slide');
    if (slides[0]) {
        slides[0].querySelector('.head').textContent = sliderData.slide1.title;
        slides[0].querySelector('.para').textContent = sliderData.slide1.description;
        slides[0].querySelector('.btn1').textContent = sliderData.slide1.buttonText;
    }
    if (slides[1]) {
        slides[1].querySelector('.head1').textContent = sliderData.slide2.title;
        slides[1].querySelector('.para1').textContent = sliderData.slide2.description;
        slides[1].querySelector('.btn1').textContent = sliderData.slide2.buttonText;
    }
    if (slides[2]) {
        slides[2].querySelector('.head2').textContent = sliderData.slide3.title;
        slides[2].querySelector('.para2').textContent = sliderData.slide3.description;
        slides[2].querySelector('.btn1').textContent = sliderData.slide3.buttonText;
    }
}

function updateBannerData(bannerData) {
    const bannerTitle = document.querySelector('.banner-text h1');
    const bannerDesc = document.querySelector('.banner-text p');
    const bannerBtn = document.querySelector('.banner-text .cta-button');

    if (bannerTitle) bannerTitle.textContent = bannerData.title;
    if (bannerDesc) bannerDesc.textContent = bannerData.description;
    if (bannerBtn) bannerBtn.textContent = bannerData.buttonText;
}

// ... similarly create functions for other sections

// Listen for CMS updates
window.addEventListener('websiteDataUpdated', function (e) {
    applyCMSData(e.detail);
});

window.addEventListener('storage', function (e) {
    if (e.key === 'genuitywebCMSData') {
        const cmsData = JSON.parse(e.newValue);
        applyCMSData(cmsData.data);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    loadCMSData();
});
// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Initialize star rating system
    initStarRating();

    // Load existing reviews from localStorage
    loadReviews();

    // Set up form submission
    document.getElementById('reviewForm').addEventListener('submit', function (e) {
        e.preventDefault();
        submitReview();
    });
});

// Initialize star rating functionality
function initStarRating() {
    const stars = document.querySelectorAll('#ratingInput i');
    let currentRating = 0;

    stars.forEach(star => {
        // Hover effect
        star.addEventListener('mouseover', function () {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });

        // Click to set rating
        star.addEventListener('click', function () {
            currentRating = parseInt(this.getAttribute('data-rating'));
            highlightStars(currentRating);
        });

        // Reset to current rating when mouse leaves
        document.getElementById('ratingInput').addEventListener('mouseleave', function () {
            highlightStars(currentRating);
        });
    });

    // Function to highlight stars up to a specific rating
    function highlightStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.remove('far');
                star.classList.add('fas', 'active');
            } else {
                star.classList.remove('fas', 'active');
                star.classList.add('far');
            }
        });
    }

    // Store the current rating for form submission
    window.getCurrentRating = function () {
        return currentRating;
    };

    // Reset rating
    window.resetRating = function () {
        currentRating = 0;
        highlightStars(0);
    };
}

// Load reviews from localStorage
function loadReviews() {
    const reviewsList = document.getElementById('reviewsList');
    const storedReviews = localStorage.getItem('clientReviews');

    // If no reviews in storage, load sample reviews
    if (!storedReviews) {
        loadSampleReviews();
        return;
    }

    const reviews = JSON.parse(storedReviews);
    displayReviews(reviews);
}

// Load sample reviews for first-time visitors
function loadSampleReviews() {
    const sampleReviews = [
        {
            name: "Sarah Johnson",
            comment: "The service was exceptional! The team was professional, responsive, and delivered exactly what we needed. Highly recommended!",
            rating: 5,
            time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
        },
        {
            name: "Michael Chen",
            comment: "Great experience working with this company. They understood our requirements and delivered a high-quality solution on time.",
            rating: 4,
            time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
        },
        {
            name: "Emily Rodriguez",
            comment: "I'm very satisfied with the results. The communication was excellent throughout the project, and the final product exceeded my expectations.",
            rating: 5,
            time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week ago
        }
    ];

    // Save sample reviews to localStorage
    localStorage.setItem('clientReviews', JSON.stringify(sampleReviews));
    displayReviews(sampleReviews);
}

// Display reviews in the list
function displayReviews(reviews) {
    const reviewsList = document.getElementById('reviewsList');

    // If no reviews, show message
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<div class="no-reviews">No reviews yet. Be the first to share your experience!</div>';
        return;
    }

    reviewsList.innerHTML = '';

    // Sort reviews by time (newest first)
    reviews.sort((a, b) => new Date(b.time) - new Date(a.time));

    // Create HTML for each review
    reviews.forEach(review => {
        const reviewElement = createReviewElement(review);
        reviewsList.appendChild(reviewElement);
    });
}

// Create HTML for a single review
function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review-item';

    // Format the time
    const reviewTime = new Date(review.time);
    const timeString = formatTime(reviewTime);

    // Create star rating HTML
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= review.rating) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }

    reviewDiv.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <div class="review-time">${timeString}</div>
                    </div>
                    <div class="review-rating">${starsHtml}</div>
                </div>
                <div class="review-text">${review.comment}</div>
            `;

    return reviewDiv;
}

// Format time for display
function formatTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) {
        return 'Just now';
    } else if (diffMins < 60) {
        return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Submit a new review
function submitReview() {
    const userName = document.getElementById('userName').value;
    const userComment = document.getElementById('userComment').value;
    const userRating = window.getCurrentRating();

    // Validate form
    if (!userName || !userComment || userRating === 0) {
        alert('Please fill in all fields and provide a rating');
        return;
    }

    // Create new review object
    const newReview = {
        name: userName,
        comment: userComment,
        rating: userRating,
        time: new Date().toISOString()
    };

    // Get existing reviews from localStorage
    const storedReviews = localStorage.getItem('clientReviews');
    let reviews = storedReviews ? JSON.parse(storedReviews) : [];

    // Add new review
    reviews.push(newReview);

    // Save back to localStorage
    localStorage.setItem('clientReviews', JSON.stringify(reviews));

    // Display updated reviews
    displayReviews(reviews);

    // Reset form
    document.getElementById('reviewForm').reset();
    window.resetRating();

    // Scroll to the new review
    document.getElementById('reviewsList').firstChild.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}