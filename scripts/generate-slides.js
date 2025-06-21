#!/usr/bin/env node

/**
 * Arctic Presentation Template - Slide Generator
 * Generates all 25 slide template files with consistent structure
 */

const fs = require('fs');
const path = require('path');

// Slide templates configuration
const slideTemplates = [
    {
        id: '01',
        name: 'title-slide',
        title: 'Title Slide',
        subtitle: 'Professional presentation opener',
        content: `
            <div class="slide title-slide">
                <div class="slide-header">
                    <div>
                        <h1 class="slide-title">[Organization Name]</h1>
                    </div>
                    <div class="logo-space">LOGO</div>
                </div>
                <div class="slide-content">
                    <h1 class="main-title">Presentation Title</h1>
                    <p class="main-subtitle">Subtitle or Focus Area</p>
                    <div class="presenter-info">
                        <strong>Presenter Name</strong><br>
                        Title/Position<br>
                        Date
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Confidential - [Organization Name]</span>
                    <span class="slide-number">1</span>
                </div>
            </div>`
    },
    {
        id: '02',
        name: 'agenda',
        title: 'Agenda',
        subtitle: 'Meeting outline and structure',
        content: `
            <div class="slide">
                <div class="slide-header">
                    <div>
                        <h1 class="slide-title">Agenda</h1>
                        <p class="slide-subtitle">Today's Discussion Points</p>
                    </div>
                    <div class="logo-space">LOGO</div>
                </div>
                <div class="slide-content">
                    <ul class="bullet-list">
                        <li>Background and Context</li>
                        <li>Current Situation Analysis</li>
                        <li>Key Findings and Data</li>
                        <li>Recommendations</li>
                        <li>Implementation Plan</li>
                        <li>Next Steps and Timeline</li>
                        <li>Questions and Discussion</li>
                    </ul>
                </div>
                <div class="slide-footer">
                    <span>Confidential - [Organization Name]</span>
                    <span class="slide-number">2</span>
                </div>
            </div>`
    },
    {
        id: '03',
        name: 'executive-summary',
        title: 'Executive Summary',
        subtitle: 'Key points and metrics at a glance',
        content: `
            <div class="slide">
                <div class="slide-header">
                    <div>
                        <h1 class="slide-title">Executive Summary</h1>
                        <p class="slide-subtitle">Key Points at a Glance</p>
                    </div>
                    <div class="logo-space">LOGO</div>
                </div>
                <div class="slide-content">
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-number">85%</div>
                            <div class="metric-label">Success Rate</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-number">$2.4M</div>
                            <div class="metric-label">Total Impact</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-number">18</div>
                            <div class="metric-label">Months</div>
                        </div>
                    </div>
                    <ul class="bullet-list">
                        <li>Primary finding or recommendation</li>
                        <li>Secondary key insight</li>
                        <li>Critical action item</li>
                    </ul>
                </div>
                <div class="slide-footer">
                    <span>Confidential - [Organization Name]</span>
                    <span class="slide-number">3</span>
                </div>
            </div>`
    },
    {
        id: '25',
        name: 'thank-you',
        title: 'Thank You',
        subtitle: 'Professional presentation conclusion',
        content: `
            <div class="slide">
                <div class="slide-header">
                    <div>
                        <h1 class="slide-title">Thank You</h1>
                        <p class="slide-subtitle">Appreciation and Closing</p>
                    </div>
                    <div class="logo-space">LOGO</div>
                </div>
                <div class="slide-content" style="text-align: center; justify-content: center; background: linear-gradient(135deg, rgba(30,58,95,0.08) 0%, rgba(45,90,135,0.08) 100%);">
                    <div style="font-size: 108px; color: var(--arctic-glacial-blue); margin-bottom: 45px;">🙏</div>
                    <h2 style="font-size: 72px; color: var(--arctic-deep-blue); margin-bottom: 45px;">Thank You</h2>
                    <div style="font-size: 36px; color: #666; line-height: 1.6; margin-bottom: 60px;">
                        <p>We appreciate your time, attention, and partnership.</p>
                        <p>Together, we can achieve great things for our communities.</p>
                    </div>
                    <div style="font-size: 30px; color: var(--arctic-deep-blue); font-weight: 600;">
                        Questions? Let's continue the conversation.
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Confidential - [Organization Name]</span>
                    <span class="slide-number">25</span>
                </div>
            </div>`
    }
];

// HTML template function
function createSlideHTML(slide) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${slide.title} - Arctic Presentation Template</title>
    <link rel="stylesheet" href="../styles/arctic-theme.css">
</head>
<body>
    <div class="slide-container">
        ${slide.content}
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('${slide.title} slide loaded');
            
            // Add any slide-specific functionality here
            // Example: animations, interactive elements, etc.
        });
    </script>
</body>
</html>`;
}

// Generate all slide files
function generateSlides() {
    const slidesDir = path.join(__dirname, 'slides');
    
    // Create slides directory if it doesn't exist
    if (!fs.existsSync(slidesDir)) {
        fs.mkdirSync(slidesDir, { recursive: true });
    }
    
    slideTemplates.forEach(slide => {
        const filename = `${slide.id}-${slide.name}.html`;
        const filepath = path.join(slidesDir, filename);
        const html = createSlideHTML(slide);
        
        fs.writeFileSync(filepath, html, 'utf8');
        console.log(`Generated: ${filename}`);
    });
    
    console.log(`\\nGenerated ${slideTemplates.length} slide templates in ${slidesDir}`);
}

// Run if called directly
if (require.main === module) {
    generateSlides();
}

module.exports = { generateSlides, slideTemplates, createSlideHTML };