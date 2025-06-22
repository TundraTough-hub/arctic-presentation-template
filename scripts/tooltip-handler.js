/**
 * Tooltip Handler for Arctic Presentation Templates
 * Provides detailed PowerPoint/Google Slides recreation instructions
 */

class TooltipHandler {
    constructor() {
        this.tooltip = null;
        this.tooltipTimeout = null;
        this.init();
    }

    init() {
        this.createTooltip();
        this.bindEvents();
    }

    createTooltip() {
        // Create tooltip element
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'presentation-tooltip';
        this.tooltip.style.cssText = `
            position: fixed;
            background: linear-gradient(135deg, #152F52 0%, #2A73B5 100%);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 12px;
            font-family: 'Inter', Arial, sans-serif;
            font-weight: 500;
            line-height: 1.4;
            max-width: 320px;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            box-shadow: 0 8px 32px rgba(21, 47, 82, 0.3);
            border: 1px solid rgba(0, 174, 239, 0.3);
        `;
        document.body.appendChild(this.tooltip);
    }

    bindEvents() {
        // Find all elements with data-tooltip attribute
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            // Mouse enter - show tooltip
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, element.getAttribute('data-tooltip'));
            });

            // Mouse move - update tooltip position
            element.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e);
            });

            // Mouse leave - hide tooltip
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });

            // Add visual indicator for elements with tooltips
            element.style.cursor = 'help';
            element.style.position = 'relative';
            
            // Add subtle hover effect
            element.addEventListener('mouseenter', () => {
                element.style.outline = '2px solid rgba(0, 174, 239, 0.3)';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.outline = 'none';
            });
        });
    }

    showTooltip(event, text) {
        clearTimeout(this.tooltipTimeout);
        
        this.tooltip.innerHTML = this.formatTooltipText(text);
        this.updateTooltipPosition(event);
        
        // Small delay for better UX
        this.tooltipTimeout = setTimeout(() => {
            this.tooltip.style.opacity = '1';
            this.tooltip.style.transform = 'translateY(0)';
        }, 100);
    }

    hideTooltip() {
        clearTimeout(this.tooltipTimeout);
        this.tooltip.style.opacity = '0';
        this.tooltip.style.transform = 'translateY(10px)';
    }

    updateTooltipPosition(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let x = mouseX + 15;
        let y = mouseY + 15;

        // Adjust if tooltip would go off screen
        if (x + tooltipRect.width > windowWidth - 20) {
            x = mouseX - tooltipRect.width - 15;
        }

        if (y + tooltipRect.height > windowHeight - 20) {
            y = mouseY - tooltipRect.height - 15;
        }

        // Ensure tooltip stays on screen
        x = Math.max(10, Math.min(x, windowWidth - tooltipRect.width - 10));
        y = Math.max(10, Math.min(y, windowHeight - tooltipRect.height - 10));

        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
    }

    formatTooltipText(text) {
        // Format the tooltip text with better styling
        let formatted = text;
        
        // Highlight PowerPoint instructions
        formatted = formatted.replace(/PowerPoint:/g, '<strong style=\"color: #00AEEF;\">PowerPoint:</strong>');
        
        // Highlight Google Slides instructions
        formatted = formatted.replace(/Google Slides:/g, '<strong style=\"color: #00AEEF;\">Google Slides:</strong>');
        
        // Highlight Insert menu items
        formatted = formatted.replace(/Insert > ([^.]+)/g, '<em style=\"color: #AAC8E0;\">Insert > $1</em>');
        
        // Highlight Format menu items
        formatted = formatted.replace(/Format > ([^.]+)/g, '<em style=\"color: #AAC8E0;\">Format > $1</em>');
        
        // Highlight color codes
        formatted = formatted.replace(/(#[A-Fa-f0-9]{6})/g, '<span style=\"color: $1; font-weight: bold;\">$1</span>');
        
        // Highlight measurements
        formatted = formatted.replace(/([0-9.]+)(pt|px|in|cm|\"|')/g, '<code style=\"background: rgba(255,255,255,0.1); padding: 1px 3px; border-radius: 3px;\">$1$2</code>');
        
        return formatted;
    }
}

// Initialize tooltip handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TooltipHandler();
});

// Export for use in other modules
window.TooltipHandler = TooltipHandler;