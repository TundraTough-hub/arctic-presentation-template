/**
 * Slide Animations for Arctic Presentation Templates
 * Handles entrance animations and interactive effects for individual slides
 */

class SlideAnimations {
    constructor() {
        this.animationQueue = [];
        this.isAnimating = false;
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.setupAnimationTriggers();
        this.addInteractiveEffects();
        this.handleReducedMotion();
        this.addKeyframeAnimations();
    }

    setupAnimationTriggers() {
        // Set up entrance animations based on slide type
        const slideContainer = document.querySelector('.slide-container');
        if (!slideContainer) return;

        // Trigger animations after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.triggerSlideEntrance();
            }, 200);
        });

        // Also trigger on DOMContentLoaded as fallback
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    this.triggerSlideEntrance();
                }, 300);
            });
        } else {
            setTimeout(() => {
                this.triggerSlideEntrance();
            }, 100);
        }
    }

    triggerSlideEntrance() {
        if (this.reducedMotion) return;

        // Trigger animations based on slide content
        this.animateTitle();
        this.animateDataCards();
        this.animateSectionElements();
        this.animateFlowElements();
    }

    animateTitle() {
        const titleElements = document.querySelectorAll('.main-title, .main-title-accent');
        titleElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = `slideInFromLeft 0.8s ease-out forwards`;
            }, index * 300);
        });

        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
            setTimeout(() => {
                subtitle.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }, 600);
        }
    }

    animateDataCards() {
        const dataCards = document.querySelectorAll('.data-card');
        dataCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = `cardSlideIn 0.6s ease-out forwards`;
                card.style.animationDelay = `${index * 0.15}s`;
            }, 800);
        });
    }

    animateSectionElements() {
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            setTimeout(() => {
                sectionTitle.style.animation = 'slideInFromTop 0.8s ease-out forwards';
            }, 400);
        }

        const waveElements = document.querySelectorAll('.wave-divider, .wave-element');
        waveElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = 'waveFlow 2s ease-in-out infinite';
            }, 600 + (index * 200));
        });
    }

    animateFlowElements() {
        const flowLines = document.querySelectorAll('.flow-line, .connecting-line');
        flowLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.animation = 'drawLine 1.5s ease-out forwards';
            }, 1000 + (index * 300));
        });

        const dataPoints = document.querySelectorAll('.data-point');
        dataPoints.forEach((point, index) => {
            setTimeout(() => {
                point.style.animation = 'pointPulse 2s ease-in-out infinite';
            }, 1200 + (index * 400));
        });
    }

    addInteractiveEffects() {
        this.setupCardHoverEffects();
        this.setupButtonHoverEffects();
        this.setupFloatingElements();
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.data-card, .template-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!this.reducedMotion) {
                    card.style.transform = 'translateY(-8px) scale(1.02)';
                    card.style.transition = 'all 0.3s ease-out';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupButtonHoverEffects() {
        const buttons = document.querySelectorAll('.view-link, .nav-link, .cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (!this.reducedMotion) {
                    button.style.transform = 'translateY(-2px)';
                    button.style.transition = 'all 0.2s ease-out';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    setupFloatingElements() {
        const floatingElements = document.querySelectorAll(
            '.floating-element, .floating-geometric, .floating-accent'
        );
        
        floatingElements.forEach((element, index) => {
            if (!this.reducedMotion) {
                setTimeout(() => {
                    element.style.animation = `floatGentle ${8 + (index * 2)}s ease-in-out infinite`;
                    element.style.animationDelay = `${index * 0.5}s`;
                }, 1500);
            }
        });
    }

    addKeyframeAnimations() {
        // Add CSS keyframes if they don't exist
        if (!document.querySelector('#slide-animations-styles')) {
            const style = document.createElement('style');
            style.id = 'slide-animations-styles';
            style.textContent = `
                @keyframes slideInFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInFromTop {
                    from {
                        opacity: 0;
                        transform: translateY(-40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes cardSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(40px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes drawLine {
                    from {
                        width: 0;
                        opacity: 0;
                    }
                    to {
                        width: 100%;
                        opacity: 1;
                    }
                }

                @keyframes pointPulse {
                    0%, 100% {
                        opacity: 0.6;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.3);
                    }
                }

                @keyframes floatGentle {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-10px) rotate(2deg);
                    }
                }

                @keyframes waveFlow {
                    0%, 100% {
                        transform: translateX(0) scaleY(1);
                    }
                    50% {
                        transform: translateX(-10px) scaleY(1.05);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    handleReducedMotion() {
        // Respect user's motion preferences
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleMotionPreference = (e) => {
            this.reducedMotion = e.matches;
            if (this.reducedMotion) {
                this.disableAnimations();
            }
        };

        mediaQuery.addEventListener('change', handleMotionPreference);
        
        if (this.reducedMotion) {
            this.disableAnimations();
        }
    }

    disableAnimations() {
        // Remove all animations for users who prefer reduced motion
        const animatedElements = document.querySelectorAll('*');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
            element.style.transition = 'none';
        });
    }

    // Utility method to add custom animation
    addCustomAnimation(element, animationName, duration = '1s', easing = 'ease-out') {
        if (this.reducedMotion) return;
        
        element.style.animation = `${animationName} ${duration} ${easing} forwards`;
    }

    // Method to reset animations
    resetAnimations() {
        const animatedElements = document.querySelectorAll('.slide-container *');
        animatedElements.forEach(element => {
            element.style.animation = '';
            element.style.transform = '';
            element.style.opacity = '';
        });
    }
}

// Initialize slide animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.slideAnimations = new SlideAnimations();
});

// Export for use in other modules
window.SlideAnimations = SlideAnimations;