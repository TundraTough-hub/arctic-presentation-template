#!/usr/bin/env node

/**
 * Comprehensive Arctic Presentation Background Exporter
 * Exports all slide backgrounds (classic and modern) to MP4 for external use
 * Enhanced version supporting all slide variants and formats
 */

const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const fs = require('fs');
const path = require('path');

// Configuration with multiple export options
const CONFIG = {
  // Video settings
  duration: 12000, // 12 seconds for smoother loops
  fps: 30,
  
  // Multiple resolution options
  resolutions: {
    hd: { width: 1280, height: 720, name: 'HD' },
    fhd: { width: 1920, height: 1080, name: 'Full HD' },
    uhd: { width: 3840, height: 2160, name: '4K UHD' },
    presentation: { width: 1366, height: 768, name: 'Presentation' }
  },
  
  // Default resolution
  defaultResolution: 'fhd',
  
  // Output directories
  outputDir: './mp4-backgrounds-complete',
  previewDir: './background-previews',
  
  // File paths
  baseDir: '../',
  
  // Export options
  exportFormats: ['mp4'], // Can extend to include 'webm', 'gif'
  quality: 'high', // 'low', 'medium', 'high', 'ultra'
  
  // Processing options
  includeStills: true, // Export still frames
  createPreviews: true, // Create preview thumbnails
  bundleZip: true // Create downloadable zip bundle
};

// Quality presets for different use cases
const QUALITY_PRESETS = {
  low: { bitrate: '1M', crf: 28 },
  medium: { bitrate: '2M', crf: 23 },
  high: { bitrate: '4M', crf: 18 },
  ultra: { bitrate: '8M', crf: 15 }
};

class ComprehensiveBackgroundExporter {
  constructor() {
    this.setupDirectories();
    this.slides = this.defineAllSlides();
  }

  setupDirectories() {
    // Create all necessary directories
    const dirs = [
      CONFIG.outputDir,
      CONFIG.previewDir,
      path.join(CONFIG.outputDir, 'classic'),
      path.join(CONFIG.outputDir, 'modern'),
      path.join(CONFIG.outputDir, 'stills'),
      path.join(CONFIG.outputDir, 'bundles')
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    console.log('📁 Directory structure created');
  }

  defineAllSlides() {
    return [
      // Classic Arctic slides
      {
        file: 'slides/slide-01-title.html',
        name: 'arctic-title-classic',
        category: 'classic',
        description: 'Classic Arctic title slide with flowing background elements',
        type: 'title'
      },
      {
        file: 'slides/slide-02-section-divider.html',
        name: 'arctic-section-classic',
        category: 'classic',
        description: 'Classic section divider with wave animation',
        type: 'section'
      },
      {
        file: 'slides/slide-03-data-insights.html',
        name: 'arctic-data-classic',
        category: 'classic',
        description: 'Classic data visualization background',
        type: 'data'
      },
      
      // Modern Arctic slides
      {
        file: 'slides/slide-modern-01-title.html',
        name: 'arctic-title-modern',
        category: 'modern',
        description: 'Modern minimalist title slide with subtle animations',
        type: 'title'
      },
      {
        file: 'slides/slide-modern-02-data.html',
        name: 'arctic-data-modern',
        category: 'modern',
        description: 'Modern data background with clean geometric elements',
        type: 'data'
      },
      {
        file: 'slides/slide-modern-03-section.html',
        name: 'arctic-section-modern',
        category: 'modern',
        description: 'Modern section divider with contemporary design',
        type: 'section'
      }
    ];
  }

  async exportAllBackgrounds() {
    console.log('🎬 Starting Comprehensive Arctic Background Export\n');
    console.log(`📊 Exporting ${this.slides.length} slide backgrounds`);
    console.log(`🎯 Resolution: ${CONFIG.resolutions[CONFIG.defaultResolution].name}`);
    console.log(`⏱️  Duration: ${CONFIG.duration / 1000}s per background\n`);

    let browser;
    try {
      // Launch browser with optimized settings
      browser = await this.launchBrowser();
      
      // Export all slides
      const results = await this.exportAllSlides(browser);
      
      // Create additional assets
      await this.createStillFrames(browser);
      if (CONFIG.createPreviews) await this.createPreviewThumbnails();
      if (CONFIG.bundleZip) await this.createDownloadBundles();
      
      // Generate comprehensive documentation
      this.createComprehensiveGuide(results);
      
      console.log('\n✅ Complete background export finished!');
      console.log(`📁 Check ${CONFIG.outputDir} for all exported backgrounds`);
      
    } catch (error) {
      console.error('❌ Export failed:', error.message);
      this.logTroubleshootingInfo();
    } finally {
      if (browser) await browser.close();
    }
  }

  async launchBrowser() {
    console.log('🚀 Launching optimized browser...');
    return await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--allow-running-insecure-content',
        '--disable-features=VizDisplayCompositor',
        '--max_old_space_size=4096'
      ]
    });
  }

  async exportAllSlides(browser) {
    const results = {
      exported: [],
      failed: [],
      totalSize: 0
    };

    for (const slide of this.slides) {
      try {
        const result = await this.exportSingleSlideBackground(browser, slide);
        if (result.success) {
          results.exported.push(result);
          results.totalSize += result.fileSize;
        } else {
          results.failed.push({ slide: slide.name, error: result.error });
        }
      } catch (error) {
        console.error(`❌ Failed to export ${slide.name}:`, error.message);
        results.failed.push({ slide: slide.name, error: error.message });
      }
    }

    return results;
  }

  async exportSingleSlideBackground(browser, slide) {
    console.log(`🎥 Exporting ${slide.name} (${slide.category})...`);
    
    const page = await browser.newPage();
    const resolution = CONFIG.resolutions[CONFIG.defaultResolution];
    
    // Configure page
    await page.setViewport({
      width: resolution.width,
      height: resolution.height,
      deviceScaleFactor: 1
    });

    const slideFile = path.resolve(CONFIG.baseDir, slide.file);
    const outputFile = path.join(
      CONFIG.outputDir, 
      slide.category, 
      `${slide.name}-background.mp4`
    );

    try {
      // Check if slide file exists
      if (!fs.existsSync(slideFile)) {
        throw new Error(`Slide file not found: ${slideFile}`);
      }

      // Load slide with proper waiting
      console.log(`   Loading: ${slide.file}`);
      await page.goto(`file://${slideFile}`, { waitUntil: 'networkidle0' });
      
      // Wait for everything to load
      await this.waitForSlideReady(page);
      
      // Prepare background for recording
      await this.prepareBackgroundElements(page, slide.type);
      
      // Set up screen recorder
      const recorder = new PuppeteerScreenRecorder(page, {
        fps: CONFIG.fps,
        crop: {
          x: 0,
          y: 0,
          width: resolution.width,
          height: resolution.height
        }
      });

      // Record background animation
      console.log(`   Recording ${CONFIG.duration / 1000}s of animation...`);
      await recorder.start(outputFile);
      await page.waitForTimeout(CONFIG.duration);
      await recorder.stop();

      // Get file stats
      const stats = fs.statSync(outputFile);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
      
      console.log(`✅ Exported ${slide.name} (${sizeMB} MB)`);
      
      await page.close();
      
      return {
        success: true,
        slide: slide.name,
        category: slide.category,
        outputFile,
        fileSize: stats.size,
        fileSizeMB: sizeMB,
        resolution: `${resolution.width}x${resolution.height}`
      };

    } catch (error) {
      await page.close();
      return {
        success: false,
        slide: slide.name,
        error: error.message
      };
    }
  }

  async waitForSlideReady(page) {
    // Wait for DOM ready
    await page.waitForFunction(() => document.readyState === 'complete');
    
    // Wait for web fonts
    await page.waitForTimeout(2000);
    
    // Wait for CSS animations to be ready
    await page.evaluate(() => {
      return new Promise(resolve => {
        const checkAnimations = () => {
          const animated = document.querySelectorAll('[class*="animate"], [class*="flow"], [class*="float"]');
          if (animated.length > 0) {
            resolve();
          } else {
            setTimeout(checkAnimations, 100);
          }
        };
        checkAnimations();
      });
    });
  }

  async prepareBackgroundElements(page, slideType) {
    await page.evaluate((type) => {
      // Universal content hiding
      const hideSelectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span',
        '.main-title', '.subtitle', '.slide-number', '.slide-type',
        '.title-section', '.subtitle-section', '.brand-section',
        '.logo-container', '.logo-text', '.slide-info',
        '.data-card', '.chart-container', '.text-content',
        '.card-info', '.card-title', '.card-description',
        '.accent-line:not(.background-accent)',
        '.corner-accent:not(.background-corner)',
        '.content-area', '.text-overlay'
      ];

      hideSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
        });
      });

      // Preserve and enhance background elements
      const backgroundSelectors = [
        '.background-layer', '.slide-container',
        '.fluid-shape', '.floating-element', '.wave-element',
        '.organic-shape', '.flow-shape', '.particle',
        '.primary-flow', '.secondary-flow',
        '.circle-accent', '.oval-accent',
        '.decorative-elements', '.animated-bg',
        '.background-accent', '.background-corner'
      ];

      backgroundSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.style.visibility = 'visible';
          el.style.opacity = el.style.opacity || '1';
        });
      });

      // Ensure smooth animations for recording
      const animationStyle = document.createElement('style');
      animationStyle.textContent = `
        * {
          animation-play-state: running !important;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        
        .fluid-shape, .floating-element, .organic-shape {
          animation-duration: 15s !important;
          animation-iteration-count: infinite !important;
          animation-timing-function: ease-in-out !important;
        }
        
        .wave-element {
          animation-duration: 12s !important;
          animation-iteration-count: infinite !important;
        }
        
        .particle {
          animation-duration: 8s !important;
          animation-iteration-count: infinite !important;
        }

        body, html {
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          width: 100vw !important;
          height: 100vh !important;
        }

        .slide-container {
          width: 100vw !important;
          height: 100vh !important;
          position: relative !important;
        }
      `;
      document.head.appendChild(animationStyle);

    }, slideType);

    // Wait for animations to stabilize
    await page.waitForTimeout(1000);
  }

  async createStillFrames(browser) {
    if (!CONFIG.includeStills) return;
    
    console.log('\n📸 Creating still frame exports...');
    
    for (const slide of this.slides) {
      try {
        await this.exportStillFrame(browser, slide);
      } catch (error) {
        console.error(`❌ Failed to create still for ${slide.name}:`, error.message);
      }
    }
  }

  async exportStillFrame(browser, slide) {
    const page = await browser.newPage();
    const resolution = CONFIG.resolutions[CONFIG.defaultResolution];
    
    await page.setViewport({
      width: resolution.width,
      height: resolution.height,
      deviceScaleFactor: 2 // Higher quality for stills
    });

    const slideFile = path.resolve(CONFIG.baseDir, slide.file);
    const outputFile = path.join(
      CONFIG.outputDir,
      'stills',
      `${slide.name}-still.png`
    );

    try {
      await page.goto(`file://${slideFile}`, { waitUntil: 'networkidle0' });
      await this.waitForSlideReady(page);
      await this.prepareBackgroundElements(page, slide.type);
      
      // Wait for animations to reach a good frame
      await page.waitForTimeout(3000);
      
      await page.screenshot({
        path: outputFile,
        fullPage: false,
        type: 'png'
      });

      console.log(`📸 Created still: ${slide.name}-still.png`);
      
    } catch (error) {
      console.error(`❌ Still frame failed for ${slide.name}:`, error.message);
    } finally {
      await page.close();
    }
  }

  createComprehensiveGuide(results) {
    const guide = `# Complete Arctic Presentation Backgrounds Export

## 📊 Export Summary

- **Total Backgrounds Exported:** ${results.exported.length}
- **Failed Exports:** ${results.failed.length}
- **Total File Size:** ${(results.totalSize / (1024 * 1024)).toFixed(1)} MB
- **Resolution:** ${CONFIG.resolutions[CONFIG.defaultResolution].name} (${CONFIG.resolutions[CONFIG.defaultResolution].width}×${CONFIG.resolutions[CONFIG.defaultResolution].height})
- **Duration:** ${CONFIG.duration / 1000} seconds each
- **Format:** MP4 (H.264)

## 📁 File Structure

\`\`\`
${CONFIG.outputDir}/
├── classic/                    # Classic Arctic style backgrounds
│   ├── arctic-title-classic-background.mp4
│   ├── arctic-section-classic-background.mp4
│   └── arctic-data-classic-background.mp4
├── modern/                     # Modern minimalist backgrounds  
│   ├── arctic-title-modern-background.mp4
│   ├── arctic-data-modern-background.mp4
│   └── arctic-section-modern-background.mp4
├── stills/                     # High-resolution still frames
│   └── [slide-name]-still.png
└── bundles/                    # Downloadable packages
    ├── arctic-classic-pack.zip
    └── arctic-modern-pack.zip
\`\`\`

## 🎨 Background Types

### Classic Arctic Style
${this.slides.filter(s => s.category === 'classic').map(s => 
  `- **${s.name}**: ${s.description}`
).join('\n')}

### Modern Arctic Style  
${this.slides.filter(s => s.category === 'modern').map(s => 
  `- **${s.name}**: ${s.description}`
).join('\n')}

## 📊 PowerPoint Integration

### Quick Setup
1. **Design** → **Slide Size** → **Widescreen (16:9)**
2. **Right-click slide** → **Format Background**
3. **Picture or Texture Fill** → **File**
4. Select your MP4 background
5. ✅ **Loop** checkbox
6. **Apply to All Slides**

### Advanced Setup
- Use **Send to Back** to layer content over backgrounds
- Adjust **Transparency** if backgrounds are too prominent
- Use **Playback** → **Start: Automatically** for seamless loops

## 🎬 Google Slides Integration

1. **Insert** → **Video** → **Upload**
2. Select MP4 background file
3. Resize to fill slide completely
4. **Video options** → **Loop**
5. **Send to back** for layering

## 💡 Design Guidelines

### Text Overlay Best Practices
- **Classic backgrounds**: Use white or navy text
- **Modern backgrounds**: Use dark text for contrast
- **Data backgrounds**: Optimal for charts and graphs
- **Section backgrounds**: Perfect for dividers

### Color Palette
- **Primary Blue**: #2A73B5
- **Arctic Cyan**: #00AEEF
- **Deep Navy**: #152F52
- **Accent Light**: #AAC8E0
- **Clean White**: #FFFFFF
- **Soft Gray**: #F5F7FA

## 🔧 Technical Specifications

- **Video Codec**: H.264
- **Frame Rate**: ${CONFIG.fps} fps
- **Bitrate**: ${QUALITY_PRESETS[CONFIG.quality].bitrate}
- **Duration**: ${CONFIG.duration / 1000}s (seamless loop)
- **Compatibility**: PowerPoint 2016+, Google Slides, Keynote

## 📦 Exported Backgrounds

${results.exported.map(bg => 
  `### ${bg.slide}\n- **Category**: ${bg.category}\n- **File Size**: ${bg.fileSizeMB} MB\n- **Resolution**: ${bg.resolution}\n`
).join('\n')}

${results.failed.length > 0 ? `## ⚠️ Failed Exports\n\n${results.failed.map(f => `- **${f.slide}**: ${f.error}`).join('\n')}\n` : ''}

## 🚀 Usage Examples

### Corporate Presentation
- **Title Slide**: arctic-title-modern-background.mp4
- **Section Breaks**: arctic-section-modern-background.mp4  
- **Data Slides**: arctic-data-modern-background.mp4

### Creative Presentation
- **Dynamic Opening**: arctic-title-classic-background.mp4
- **Flowing Transitions**: arctic-section-classic-background.mp4
- **Engaging Data**: arctic-data-classic-background.mp4

## 📞 Support & Customization

- **Repository**: https://github.com/TundraTough-hub/arctic-presentation-template
- **Issues**: Report problems via GitHub Issues
- **Custom Requests**: Create issue for specific requirements
- **Documentation**: Check USAGE_GUIDE.md for detailed instructions

---
*Generated by Comprehensive Arctic Background Exporter*
*Export Date: ${new Date().toISOString().split('T')[0]}*
*Total Files: ${results.exported.length + (CONFIG.includeStills ? results.exported.length : 0)} assets*
`;

    fs.writeFileSync(path.join(CONFIG.outputDir, 'COMPLETE_BACKGROUNDS_GUIDE.md'), guide);
    console.log('📖 Created comprehensive usage guide');
  }

  logTroubleshootingInfo() {
    console.log('\n🔧 Troubleshooting Information:');
    console.log('1. Ensure all slide HTML files exist in slides/ directory');
    console.log('2. Check that puppeteer and dependencies are installed:');
    console.log('   npm install puppeteer puppeteer-screen-recorder');
    console.log('3. Verify sufficient disk space for video exports');
    console.log('4. For large exports, increase Node.js memory:');
    console.log('   node --max-old-space-size=8192 export-all-backgrounds.js');
    console.log('5. Check browser permissions and dependencies');
  }
}

// Enhanced CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Arctic Background Exporter - Complete Edition

Usage: node export-all-backgrounds.js [options]

Options:
  --resolution <res>    Export resolution (hd|fhd|uhd|presentation)
  --quality <qual>      Video quality (low|medium|high|ultra)
  --duration <sec>      Animation duration in seconds
  --classic-only        Export only classic style backgrounds
  --modern-only         Export only modern style backgrounds
  --no-stills          Skip still frame generation
  --help, -h           Show this help message

Examples:
  node export-all-backgrounds.js --resolution uhd --quality ultra
  node export-all-backgrounds.js --classic-only --duration 15
  node export-all-backgrounds.js --modern-only --no-stills
`);
    process.exit(0);
  }

  // Apply CLI options
  const resolutionArg = args[args.indexOf('--resolution') + 1];
  if (resolutionArg && CONFIG.resolutions[resolutionArg]) {
    CONFIG.defaultResolution = resolutionArg;
  }

  const qualityArg = args[args.indexOf('--quality') + 1];
  if (qualityArg && QUALITY_PRESETS[qualityArg]) {
    CONFIG.quality = qualityArg;
  }

  const durationArg = args[args.indexOf('--duration') + 1];
  if (durationArg && !isNaN(durationArg)) {
    CONFIG.duration = parseInt(durationArg) * 1000;
  }

  if (args.includes('--no-stills')) {
    CONFIG.includeStills = false;
  }

  // Run the exporter
  const exporter = new ComprehensiveBackgroundExporter();
  
  // Filter slides if requested
  if (args.includes('--classic-only')) {
    exporter.slides = exporter.slides.filter(s => s.category === 'classic');
  } else if (args.includes('--modern-only')) {
    exporter.slides = exporter.slides.filter(s => s.category === 'modern');
  }

  exporter.exportAllBackgrounds().catch(console.error);
}

module.exports = ComprehensiveBackgroundExporter;
