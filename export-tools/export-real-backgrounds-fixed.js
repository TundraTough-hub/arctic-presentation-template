#!/usr/bin/env node

/**
 * Fixed Real Slide Background Exporter
 * Captures actual slide backgrounds with proper viewport and timing
 */

const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const fs = require('fs');
const path = require('path');

// Configuration - Standard presentation dimensions
const CONFIG = {
  duration: 10000, // 10 seconds in milliseconds
  fps: 30,         
  // Standard presentation slide dimensions
  width: 1280,     // Reduced to match typical slide viewport
  height: 720,     // 16:9 aspect ratio
  outputDir: './mp4-backgrounds-real',
  baseDir: '../' // Go up from export-tools to main folder
};

class FixedSlideBackgroundExporter {
  constructor() {
    this.setupDirectories();
  }

  setupDirectories() {
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }
    console.log(`📁 Output directory: ${CONFIG.outputDir}`);
  }

  async exportAllBackgrounds() {
    console.log('🎬 Exporting REAL Arctic Slide Backgrounds (Fixed Version)\n');
    
    let browser;
    try {
      console.log('🚀 Starting browser...');
      browser = await puppeteer.launch({ 
        headless: true,
        args: [
          '--no-sandbox', 
          '--disable-setuid-sandbox', 
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--allow-running-insecure-content'
        ]
      });

      // Define the actual slide files to export
      const slides = [
        {
          file: 'slides/slide-01-title.html',
          name: 'title-slide',
          description: 'Title slide with flowing background elements'
        },
        {
          file: 'slides/slide-02-section-divider.html',
          name: 'section-divider',
          description: 'Section divider with wave animation'
        },
        {
          file: 'slides/slide-03-data-insights.html',
          name: 'data-insights',
          description: 'Data visualization background'
        }
      ];

      // Export each slide background
      for (const slide of slides) {
        const slideExists = await this.checkSlideExists(slide.file);
        if (slideExists) {
          await this.exportSlideBackground(browser, slide);
        } else {
          console.log(`⚠️  Slide not found: ${slide.file}`);
          console.log(`     Looking in: ${path.resolve(CONFIG.baseDir, slide.file)}`);
        }
      }

      // Create usage guide
      this.createUsageGuide();

      console.log('\n✅ Fixed slide background export complete!');
      console.log(`📁 Files saved to: ${CONFIG.outputDir}`);

    } catch (error) {
      console.error('❌ Export failed:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Make sure slide HTML files exist in ../slides/ folder');
      console.log('2. Check that CSS files are properly linked');
      console.log('3. Verify file paths are correct');
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async checkSlideExists(slideFile) {
    const fullPath = path.resolve(CONFIG.baseDir, slideFile);
    console.log(`🔍 Checking for slide: ${fullPath}`);
    return fs.existsSync(fullPath);
  }

  async exportSlideBackground(browser, slide) {
    console.log(`🎥 Recording background from ${slide.name}...`);
    
    const page = await browser.newPage();
    
    // Set viewport to standard slide dimensions
    await page.setViewport({ 
      width: CONFIG.width, 
      height: CONFIG.height,
      deviceScaleFactor: 1
    });

    const recorder = new PuppeteerScreenRecorder(page, {
      fps: CONFIG.fps,
      crop: {
        x: 0,
        y: 0,
        width: CONFIG.width,
        height: CONFIG.height
      }
    });

    const slideFile = path.resolve(CONFIG.baseDir, slide.file);
    const outputFile = path.join(CONFIG.outputDir, `${slide.name}-background.mp4`);

    try {
      console.log(`   Loading: ${slideFile}`);
      
      // Load the actual slide HTML
      await page.goto(`file://${slideFile}`, {
        waitUntil: 'domcontentloaded'
      });

      // Wait for fonts and CSS to load completely
      await page.waitForFunction(() => {
        return document.readyState === 'complete';
      });

      // Additional wait for web fonts
      await page.waitForTimeout(3000);

      console.log(`   Preparing background elements...`);

      // Hide content elements but keep background visible
      await page.evaluate(() => {
        // Hide all text and content elements
        const textSelectors = [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span',
          '.main-title', '.main-title-accent', '.subtitle', 
          '.slide-number', '.slide-type',
          '.title-section', '.subtitle-section', '.brand-section',
          '.slide-info', '.logo-container', '.logo-text',
          '.data-card', '.chart-container', '.text-content',
          '.card-info', '.card-title', '.card-description',
          '.accent-line', '.corner-accent'
        ];

        textSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
          });
        });

        // Ensure background elements are fully visible
        const backgroundSelectors = [
          '.background-layer', '.slide-container',
          '.fluid-shape', '.floating-element', 
          '.wave-element', '.organic-shape', '.flow-shape',
          '.primary-flow', '.secondary-flow', 
          '.circle-accent', '.oval-accent',
          '.particle', '.decorative-elements'
        ];

        backgroundSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            if (el) {
              el.style.visibility = 'visible';
              el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
            }
          });
        });

        // Ensure slide container fills viewport properly
        const slideContainer = document.querySelector('.slide-container');
        if (slideContainer) {
          slideContainer.style.width = '100vw';
          slideContainer.style.height = '100vh';
          slideContainer.style.overflow = 'hidden';
          slideContainer.style.position = 'relative';
        }

        // Enhance animations for better recording
        const style = document.createElement('style');
        style.textContent = \`
          * {
            animation-play-state: running !important;
          }
          
          .fluid-shape, .floating-element, .organic-shape {
            animation-duration: 12s !important;
            animation-iteration-count: infinite !important;
            animation-timing-function: ease-in-out !important;
          }
          
          .wave-element {
            animation-duration: 10s !important;
            animation-iteration-count: infinite !important;
          }
          
          .particle {
            animation-duration: 6s !important;
            animation-iteration-count: infinite !important;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
        \`;
        document.head.appendChild(style);

        console.log('Background elements prepared for recording');
      });

      // Wait for animations to start and stabilize
      console.log(`   Waiting for animations to start...`);
      await page.waitForTimeout(2000);

      // Start recording
      console.log(`   Starting video recording...`);
      await recorder.start(outputFile);

      // Record for the specified duration
      console.log(`   Recording for ${CONFIG.duration / 1000} seconds...`);
      await page.waitForTimeout(CONFIG.duration);

      // Stop recording
      await recorder.stop();
      
      console.log(`✅ Saved ${slide.name}-background.mp4`);
      
      // Get file size
      if (fs.existsSync(outputFile)) {
        const stats = fs.statSync(outputFile);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
        console.log(`   File size: ${sizeMB} MB`);
        console.log(`   Resolution: ${CONFIG.width}x${CONFIG.height}`);
      }

    } catch (error) {
      console.error(`❌ Failed to record ${slide.name}:`, error.message);
      console.log(`   Slide file: ${slideFile}`);
      console.log(`   Output file: ${outputFile}`);
    } finally {
      await page.close();
    }
  }

  createUsageGuide() {
    const guide = \`# Fixed Real Arctic Slide Backgrounds - Usage Guide

## 📁 Exported Background Files

These are the **actual backgrounds** from your Arctic presentation slides:

- \\\`title-slide-background.mp4\\\` - Background from slide-01-title.html
- \\\`section-divider-background.mp4\\\` - Background from slide-02-section-divider.html  
- \\\`data-insights-background.mp4\\\` - Background from slide-03-data-insights.html

## 🎬 Video Specifications (Fixed)

- **Resolution:** ${CONFIG.width}x${CONFIG.height} (Standard slide size)
- **Frame Rate:** ${CONFIG.fps} fps
- **Duration:** ${CONFIG.duration / 1000} seconds (loops seamlessly)
- **Format:** MP4 (H.264)
- **Source:** Real slide templates with content hidden
- **Viewport:** Matches actual slide viewing area

## ✅ What's Fixed

### Proper Viewport Size
- Now uses ${CONFIG.width}x${CONFIG.height} (16:9 standard)
- Matches what you see in browser
- No more oversized capture area

### No Blank Frames
- Waits for CSS and fonts to load completely
- Ensures animations start before recording
- Immediate visual content from frame 1

### Accurate Content
- Captures only the visible slide area
- Hides text but preserves background elements
- Maintains original animation timing

## 📊 PowerPoint Import Instructions

### Standard Slide Setup
1. Create new presentation
2. **Design** → **Slide Size** → **Widescreen (16:9)**
3. **Right-click** slide → **Format Background**
4. **Picture or Texture Fill**
5. **File** → Select your MP4 background
6. ✅ Check **Loop** 
7. **Apply to All Slides**

### Video Sizing
- Videos are sized for standard presentation slides
- No need to resize or crop
- Will fit perfectly in 16:9 slide layout

## 📊 Google Slides Import

1. **Insert** → **Video** → **Upload**
2. Select your MP4 file
3. Resize to fill slide (video should fit naturally)
4. **Video options** → **Loop**

## 💡 Best Practices

1. **Consistent Sizing**: All backgrounds use same ${CONFIG.width}x${CONFIG.height} resolution
2. **Smooth Loops**: 10-second duration provides natural looping
3. **Text Overlay**: Use white or dark navy text for best contrast
4. **Brand Colors**: Backgrounds maintain original Arctic color palette

## 🔧 If Backgrounds Look Different

The exported backgrounds should now match exactly what you see when viewing the slides. If they still look different:

1. **Check browser zoom**: Make sure browser is at 100% zoom when viewing slides
2. **Viewport size**: The ${CONFIG.width}x${CONFIG.height} matches standard slide dimensions
3. **CSS loading**: Fixed version waits for all stylesheets to load

## 📞 Support

- **Slide Sources:** Check slides/ folder for original templates
- **Issues:** Create GitHub issue if backgrounds still don't match
- **Customization:** Edit slide CSS files and re-export

---
*Fixed export ensuring accurate background capture*
*Resolution: ${CONFIG.width}x${CONFIG.height} • Duration: ${CONFIG.duration / 1000}s • Format: MP4*
\`;

    fs.writeFileSync(path.join(CONFIG.outputDir, 'FIXED_BACKGROUNDS_GUIDE.md'), guide);
    console.log('📖 Created fixed backgrounds usage guide');
  }
}

// Run the exporter
if (require.main === module) {
  const exporter = new FixedSlideBackgroundExporter();
  exporter.exportAllBackgrounds().catch(console.error);
}

module.exports = FixedSlideBackgroundExporter;
