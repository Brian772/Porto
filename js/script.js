// Project data - in a real application, this could come from a CMS or API
const projects = [

    {
        id: 3,
        title: "Portfolio Website",
        description: "A responsive portfolio website built with modern web technologies.",
        image: "images/p-porto.png",
        tech: ["HTML", "CSS", "JavaScript"],
        liveUrl: "#hero",
        codeUrl: "#",
        category: "web"
    }
];

// DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectsGrid = document.querySelector('.projects-grid');
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalTech = document.querySelector('.modal-tech');
const modalLive = document.getElementById('modal-live');
const modalCode = document.getElementById('modal-code');
const contactForm = document.getElementById('contact-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initProjects();
    initContactForm();
    initScrollEffects();
    initAccessibility();
});

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70; // Height of fixed navbar
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        document.querySelector('.hamburger').classList.toggle('active');
        this.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    // Close mobile menu when clicking on a link
    navMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navMenu.classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Update active navigation link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Projects functionality
function initProjects() {
    renderProjects('all');

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            const filter = this.getAttribute('data-filter');
            renderProjects(filter);
        });
    });

    // Modal functionality
    closeModal.addEventListener('click', closeProjectModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Keyboard accessibility for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeProjectModal();
        }
    });
}


function renderProjects(filter) {
    const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

    projectsGrid.innerHTML = '';

    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${project.title}`);

    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;

    // Open modal on click or Enter key
    card.addEventListener('click', () => openProjectModal(project));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            openProjectModal(project);
        }
    });

    return card;
}

function openProjectModal(project) {
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.description;
    modalTech.innerHTML = project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    modalLive.href = project.liveUrl;
    modalCode.href = project.codeUrl;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Focus management for accessibility
    closeModal.focus();
}

function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Contact form functionality
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Check if reCAPTCHA is completed
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            alert('Please complete the reCAPTCHA verification.');
            return;
        }

        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // In a real application, you would send the form data to your backend
        // For now, we'll just show a success message
        alert('Thank you for your message! I\'ll get back to you soon.');

        // Reset form and reCAPTCHA
        contactForm.reset();
        grecaptcha.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Skill bars animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach(fill => {
                    fill.style.width = fill.style.width; // Trigger animation
                });
            }
        });
    }, { threshold: 0.5 });

    skillObserver.observe(document.querySelector('.skills'));
}

// Accessibility enhancements
function initAccessibility() {
    // Skip to main content link (can be added to HTML if needed)
    // Ensure all interactive elements have proper ARIA attributes

    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }

    // Reduced motion detection
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Export functions for potential use in other scripts
window.PortfolioApp = {
    openProjectModal,
    closeProjectModal,
    renderProjects
};

// GitHub API integration for portfolio
// Replace 'your-github-username' with your actual GitHub username
const GITHUB_USERNAME = 'Brian772';

// DOM elements for GitHub section
const reposCount = document.getElementById('repos-count');
const followersCount = document.getElementById('followers-count');
const followingCount = document.getElementById('following-count');
const starsCount = document.getElementById('stars-count');
const githubName = document.getElementById('github-name');
const githubBio = document.getElementById('github-bio');
const githubAvatar = document.getElementById('github-avatar');
const githubLink = document.getElementById('github-link');
const reposList = document.getElementById('repos-list');

// Initialize GitHub functionality
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('github')) {
        loadGitHubData();
    }
});

// Load GitHub data from API
async function loadGitHubData() {
    try {
        // Load user profile data
        const userResponse = await fetch(`https://api.github.com/users/Brian772`);
        if (!userResponse.ok) {
            throw new Error('Failed to fetch GitHub user data');
        }
        const userData = await userResponse.json();

        // Update profile information
        updateProfileInfo(userData);

        // Load repositories data
        const reposResponse = await fetch(`https://api.github.com/users/Brian772/repos?sort=updated&per_page=6`);
        if (!reposResponse.ok) {
            throw new Error('Failed to fetch GitHub repositories');
        }
        const reposData = await reposResponse.json();

        // Update repositories
        updateRepositories(reposData);

        // Calculate total stars
        const totalStars = reposData.reduce((total, repo) => total + repo.stargazers_count, 0);
        starsCount.textContent = totalStars.toLocaleString();

    } catch (error) {
        console.error('Error loading GitHub data:', error);
        handleGitHubError();
    }
}

// Update profile information
function updateProfileInfo(userData) {
    githubName.textContent = userData.name || userData.login;
    githubBio.textContent = userData.bio || 'No bio available';
    githubAvatar.src = userData.avatar_url;
    githubAvatar.alt = `${userData.name || userData.login}'s avatar`;
    githubLink.href = userData.html_url;

    reposCount.textContent = userData.public_repos.toLocaleString();
    followersCount.textContent = userData.followers.toLocaleString();
    followingCount.textContent = userData.following.toLocaleString();
}

// Update repositories list
function updateRepositories(reposData) {
    reposList.innerHTML = '';

    reposData.forEach(repo => {
        const repoCard = createRepoCard(repo);
        reposList.appendChild(repoCard);
    });
}

// Create repository card element
function createRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card';

    const languageColor = getLanguageColor(repo.language);

    card.innerHTML = `
        <h4><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h4>
        <p>${repo.description || 'No description available'}</p>
        <div class="repo-stats">
            ${repo.language ? `
                <span class="repo-language">
                    <span class="language-color" style="background-color: ${languageColor}"></span>
                    ${repo.language}
                </span>
            ` : ''}
            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
        </div>
    `;

    return card;
}

// Get color for programming language
function getLanguageColor(language) {
    const colors = {
        JavaScript: '#f1e05a',
        TypeScript: '#2b7489',
        Python: '#3572A5',
        Java: '#b07219',
        'C++': '#f34b7d',
        'C#': '#178600',
        PHP: '#4F5D95',
        Ruby: '#701516',
        Go: '#00ADD8',
        Rust: '#dea584',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Vue: '#2c3e50',
        React: '#61DAFB',
        default: '#586069'
    };

    return colors[language] || colors.default;
}

// Handle GitHub API errors
function handleGitHubError() {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
        <p>Unable to load GitHub data. Please check your internet connection or try again later.</p>
        <p>You can view my GitHub profile directly: <a href="https://github.com/Brian772" target="_blank">https://github.com/Brian772</a></p>
    `;

    // Replace the GitHub content with error message
    const githubContent = document.querySelector('.github-content');
    if (githubContent) {
        githubContent.innerHTML = '';
        githubContent.appendChild(errorMessage);
    }
}

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Export functions for potential use in other scripts
window.GitHubPortfolio = {
    loadGitHubData,
    updateProfileInfo,
    updateRepositories
};
