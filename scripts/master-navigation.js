/**
 * Master Navigation for Arctic Presentation Templates
 * Handles navigation between slides and template interactions
 */

class MasterNavigation {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.init();
    }

    init() {
        this.loadSlideList();
        this.setupKeyboardNavigation();
        this.setupQuickNavigation();
        this.addAccessibilityFeatures();
    }

    loadSlideList() {
        // Define available slides
        this.slides = [
            { id: 'slide-01', name: 'Title Slide', file: 'slides/slide-01-title.html' },
            { id: 'slide-02', name: 'Section Divider', file: 'slides/slide-02-section-divider.html' },
            { id: 'slide-03', name: 'Data Insights', file: 'slides/slide-03-data-insights.html' },
            { id: 'slide-04', name: 'Image Focus', file: 'slides/slide-04-image-focus.html' },
            { id: 'slide-05', name: 'Process Flow', file: 'slides/slide-05-process-flow.html' },
            { id: 'slide-06', name: 'Data Visualization', file: 'slides/slide-06-chart-visualization.html' },
            { id: 'slide-07', name: 'Team & Contact', file: 'slides/slide-07-team-contact.html' },
            { id: 'slide-08', name: 'Thank You / Closing', file: 'slides/slide-08-closing.html' }
        ];
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.slides.length - 1);
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.returnToIndex();
                    break;
            }
        });
    }

    setupQuickNavigation() {
        // Add slide numbers to quick nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                // Track which slide was accessed
                this.trackSlideAccess(index);
            });

            // Add keyboard navigation support
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
    }

    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.currentSlide = index;
            const slide = this.slides[index];
            window.open(slide.file, '_blank');
        }
    }

    returnToIndex() {
        window.location.href = '/';
    }

    trackSlideAccess(slideIndex) {
        // Simple analytics tracking
        if (window.gtag) {
            window.gtag('event', 'slide_view', {
                'slide_name': this.slides[slideIndex]?.name || 'Unknown',
                'slide_index': slideIndex
            });
        }
        
        // Store in session for user experience
        try {
            const accessHistory = JSON.parse(sessionStorage.getItem('slideAccessHistory') || '[]');
            accessHistory.push({
                slide: this.slides[slideIndex]?.name,
                timestamp: new Date().toISOString()
            });
            sessionStorage.setItem('slideAccessHistory', JSON.stringify(accessHistory));
        } catch (e) {
            // Silently handle storage errors
        }
    }

    addAccessibilityFeatures() {
        // Add ARIA labels and accessibility improvements
        const templateCards = document.querySelectorAll('.template-card');
        templateCards.forEach((card, index) => {
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View ${this.slides[index]?.name} template`);
            
            // Add keyboard support for template cards
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const link = card.querySelector('.view-link');
                    if (link) link.click();
                }
            });
        });

        // Add skip navigation
        this.addSkipNavigation();
    }

    addSkipNavigation() {
        const skipNav = document.createElement('a');
        skipNav.href = '#main-content';
        skipNav.textContent = 'Skip to main content';
        skipNav.className = 'skip-nav';
        skipNav.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-blue);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipNav.addEventListener('focus', () => {
            skipNav.style.top = '6px';
        });
        
        skipNav.addEventListener('blur', () => {
            skipNav.style.top = '-40px';
        });

        document.body.insertBefore(skipNav, document.body.firstChild);

        // Add main content ID
        const masterContainer = document.querySelector('.master-container');
        if (masterContainer) {
            masterContainer.id = 'main-content';
        }
    }

    // Utility method to get slide info
    getSlideInfo(index) {
        return this.slides[index] || null;
    }

    // Method to check if slide exists
    slideExists(index) {
        return index >= 0 && index < this.slides.length;
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.masterNav = new MasterNavigation();
});

// Export for use in other modules
window.MasterNavigation = MasterNavigation;