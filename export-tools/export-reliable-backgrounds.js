#!/usr/bin/env node

/**
 * Reliable Arctic Presentation Background Exporter
 * Uses puppeteer + ffmpeg for maximum compatibility
 */

const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Configuration with reliable settings
const CONFIG = {
  // Video settings
  duration: 12000, // 12 seconds in milliseconds
  fps: 30,
  
  // Resolution options
  resolutions: {
    hd: { width: 1280, height: 720, name: 'HD' },
    fhd: { width: 1920, height: 1080, name: 'Full HD' },
    uhd: { width: 3840, height: 2160, name: '4K UHD' },
    presentation: { width: 1366, height: 768, name: 'Presentation' }
  },
  
  // Default resolution
  defaultResolution: 'fhd',
  
  // Output directories
  outputDir: './mp4-backgrounds-reliable',
  screenshotDir: './temp-screenshots',
  
  // File paths
  baseDir: '../',
  
  // Export options
  quality: 'high',
  screenshotInterval: 100, // milliseconds between screenshots
  imageFormat: 'jpeg',
  imageQuality: 90
};

// Quality presets for ffmpeg
const QUALITY_PRESETS = {
  low: { crf: 28, preset: 'fast' },
  medium: { crf: 23, preset: 'medium' },
  high: { crf: 18, preset: 'slow' },
  ultra: { crf: 15, preset: 'veryslow' }
};

class ReliableBackgroundExporter {
  constructor() {
    this.setupDirectories();
    this.slides = this.defineAllSlides();
  }

  setupDirectories() {
    const dirs = [
      CONFIG.outputDir,
      CONFIG.screenshotDir,
      path.join(CONFIG.outputDir, 'classic'),
      path.join(CONFIG.outputDir, 'modern'),
      path.join(CONFIG.outputDir, 'stills')
    ];

    dirs.forEach(dir => {
      fs.ensureDirSync(dir);
    });

    console.log('📁 Directory structure ready');
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
    console.log('🎬 Starting Reliable Arctic Background Export\n');
    console.log(`📊 Exporting ${this.slides.length} slide backgrounds`);
    console.log(`🎯 Resolution: ${CONFIG.resolutions[CONFIG.defaultResolution].name}`);
    console.log(`⏱️  Duration: ${CONFIG.duration / 1000}s per background\n`);

    let browser;
    try {
      // Check dependencies first
      this.checkDependencies();
      
      // Launch browser
      browser = await this.launchBrowser();
      
      // Export all slides
      for (const slide of this.slides) {
        await this.exportSingleSlideBackground(browser, slide);
      }
      
      // Create usage guide
      this.createUsageGuide();
      
      console.log('\n✅ Reliable background export complete!');
      console.log(`📁 Check ${CONFIG.outputDir} for all exported backgrounds`);
      
    } catch (error) {
      console.error('❌ Export failed:', error.message);
      this.logTroubleshootingInfo();
    } finally {
      if (browser) await browser.close();
      
      // Clean up temporary files
      this.cleanup();
    }
  }

  checkDependencies() {
    console.log('🔍 Checking dependencies...');
    
    try {
      // Check if ffmpeg is available (use ffmpeg-static if system ffmpeg not found)
      try {
        execSync('ffmpeg -version', { stdio: 'pipe' });
        console.log('✅ System FFmpeg found');
      } catch (error) {
        // Try to use ffmpeg-static
        const ffmpegStatic = require('ffmpeg-static');
        if (ffmpegStatic) {
          console.log('✅ Using ffmpeg-static');
          // Set ffmpeg path for this session
          process.env.FFMPEG_PATH = ffmpegStatic;
        } else {
          throw new Error('FFmpeg not found. Please install ffmpeg or ffmpeg-static.');
        }
      }
    } catch (error) {
      console.error('❌ Dependency check failed:', error.message);
      throw error;
    }
  }

  async launchBrowser() {
    console.log('🚀 Launching browser...');
    return await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--allow-running-insecure-content'
      ]
    });
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
    const screenshotFolder = path.join(CONFIG.screenshotDir, slide.name);
    const outputFile = path.join(CONFIG.outputDir, slide.category, `${slide.name}-background.mp4`);

    try {
      // Check if slide file exists
      if (!fs.existsSync(slideFile)) {
        throw new Error(`Slide file not found: ${slideFile}`);
      }

      // Create screenshot folder
      fs.ensureDirSync(screenshotFolder);

      // Load slide
      console.log(`   Loading: ${slide.file}`);
      await page.goto(`file://${slideFile}`, { waitUntil: 'networkidle0' });
      
      // Wait for everything to load
      await this.waitForSlideReady(page);
      
      // Prepare background for recording
      await this.prepareBackgroundElements(page, slide.type);
      
      // Take screenshots at intervals
      console.log(`   Capturing ${CONFIG.duration / CONFIG.screenshotInterval} frames...`);
      await this.captureScreenshots(page, screenshotFolder);
      
      // Convert screenshots to video using ffmpeg
      console.log(`   Converting to MP4...`);
      await this.createVideoFromScreenshots(screenshotFolder, outputFile);
      
      // Create still frame
      await this.createStillFrame(page, slide);
      
      // Get file stats
      if (fs.existsSync(outputFile)) {
        const stats = fs.statSync(outputFile);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
        console.log(`✅ Exported ${slide.name} (${sizeMB} MB)`);
      }
      
    } catch (error) {
      console.error(`❌ Failed to export ${slide.name}:`, error.message);
    } finally {
      await page.close();
      
      // Clean up screenshots for this slide
      fs.removeSync(screenshotFolder);
    }
  }

  async waitForSlideReady(page) {
    // Wait for DOM ready
    await page.waitForFunction(() => document.readyState === 'complete');
    
    // Wait for fonts and resources
    await page.waitForTimeout(3000);
    
    // Wait for animations to be ready
    await page.evaluate(() => {
      return new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
    });
  }

  async prepareBackgroundElements(page, slideType) {
    await page.evaluate(() => {
      // Hide all text and content elements
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

      // Ensure background elements are visible
      const backgroundSelectors = [
        '.background-layer', '.slide-container',
        '.fluid-shape', '.floating-element', '.wave-element',
        '.organic-shape', '.flow-shape', '.particle',
        '.primary-flow', '.secondary-flow',
        '.circle-accent', '.oval-accent',
        '.decorative-elements', '.animated-bg'
      ];

      backgroundSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.style.visibility = 'visible';
          el.style.opacity = el.style.opacity || '1';
        });
      });

      // Enhance animations
      const style = document.createElement('style');
      style.textContent = `
        * {
          animation-play-state: running !important;
        }
        
        body, html {
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
        }

        .slide-container {
          width: 100vw !important;
          height: 100vh !important;
        }
      `;
      document.head.appendChild(style);
    });

    // Wait for animations to stabilize
    await page.waitForTimeout(1000);
  }

  async captureScreenshots(page, screenshotFolder) {
    const totalFrames = Math.floor(CONFIG.duration / CONFIG.screenshotInterval);
    
    for (let i = 0; i < totalFrames; i++) {
      const filename = path.join(screenshotFolder, `frame_${i.toString().padStart(6, '0')}.${CONFIG.imageFormat}`);
      
      await page.screenshot({
        path: filename,
        type: CONFIG.imageFormat,
        quality: CONFIG.imageQuality,
        fullPage: false
      });
      
      // Wait for next frame
      await page.waitForTimeout(CONFIG.screenshotInterval);
      
      // Show progress
      if (i % 30 === 0) {
        const progress = Math.round((i / totalFrames) * 100);
        process.stdout.write(`\r   Progress: ${progress}%`);
      }
    }
    
    console.log('\r   Progress: 100%');
  }

  async createVideoFromScreenshots(screenshotFolder, outputFile) {
    const quality = QUALITY_PRESETS[CONFIG.quality];
    const inputPattern = path.join(screenshotFolder, `frame_%06d.${CONFIG.imageFormat}`);
    
    // Use ffmpeg-static path if available
    const ffmpegCmd = process.env.FFMPEG_PATH || 'ffmpeg';
    
    const command = `"${ffmpegCmd}" -y -r ${CONFIG.fps} -i "${inputPattern}" -c:v libx264 -crf ${quality.crf} -preset ${quality.preset} -pix_fmt yuv420p -movflags +faststart "${outputFile}"`;
    
    try {
      execSync(command, { stdio: 'pipe' });
    } catch (error) {
      throw new Error(`FFmpeg failed: ${error.message}`);
    }
  }

  async createStillFrame(page, slide) {
    const stillPath = path.join(CONFIG.outputDir, 'stills', `${slide.name}-still.png`);
    
    await page.screenshot({
      path: stillPath,
      type: 'png',
      fullPage: false
    });
    
    console.log(`📸 Created still: ${slide.name}-still.png`);
  }

  createUsageGuide() {
    const guide = `# Reliable Arctic Presentation Backgrounds

## 📊 Export Information

- **Export Method**: Puppeteer + FFmpeg (Maximum Compatibility)
- **Total Backgrounds**: ${this.slides.length}
- **Resolution**: ${CONFIG.resolutions[CONFIG.defaultResolution].name} (${CONFIG.resolutions[CONFIG.defaultResolution].width}×${CONFIG.resolutions[CONFIG.defaultResolution].height})
- **Duration**: ${CONFIG.duration / 1000} seconds each
- **Format**: MP4 (H.264)
- **Frame Rate**: ${CONFIG.fps} fps

## 📁 Exported Files

### Classic Arctic Backgrounds
${this.slides.filter(s => s.category === 'classic').map(s => 
  `- **${s.name}-background.mp4**: ${s.description}`
).join('\n')}

### Modern Arctic Backgrounds  
${this.slides.filter(s => s.category === 'modern').map(s => 
  `- **${s.name}-background.mp4**: ${s.description}`
).join('\n')}

### Still Frames
- High-resolution PNG files in the \`stills/\` folder
- Perfect for static backgrounds or thumbnails

## 📊 PowerPoint Integration

### Method 1: Background Video
1. **Design** → **Format Background**
2. **Picture or Texture Fill** → **File**
3. Select your MP4 background
4. ✅ Check **Loop**
5. **Apply to All Slides**

### Method 2: Insert Video
1. **Insert** → **Media** → **Video** → **Video on My PC**
2. Select MP4 file and resize to fill slide
3. **Playback** → **Start: Automatically** + **Loop until Stopped**
4. Right-click → **Send to Back**

## 📊 Google Slides Integration

1. **Insert** → **Video** → **Upload**
2. Select your MP4 background
3. Resize to fill slide completely
4. **Video options** → **Loop**
5. Right-click → **Send to back**

## 🎨 Design Guidelines

### Background Usage
- **Title backgrounds**: Perfect for presentation openings
- **Section backgrounds**: Great for dividing presentation sections
- **Data backgrounds**: Ideal for charts, graphs, and statistics

### Text Overlay Tips
- Use high contrast text colors over backgrounds
- **Classic backgrounds**: White or navy text works best
- **Modern backgrounds**: Dark text for better readability
- Add text shadows or background boxes for better visibility

## 🔧 Technical Details

- **Video Codec**: H.264 with yuv420p pixel format
- **Compression**: CRF ${QUALITY_PRESETS[CONFIG.quality].crf} (${CONFIG.quality} quality)
- **Optimization**: Fast start enabled for web playback
- **Compatibility**: Works with PowerPoint 2016+, Google Slides, Keynote
- **File Size**: Optimized for quality vs. size balance

## 💡 Pro Tips

1. **Seamless Loops**: All backgrounds are designed to loop perfectly
2. **Layer Content**: Use these as background layers, add content on top
3. **Performance**: MP4 format ensures smooth playback across platforms
4. **Customization**: Contact for different durations or resolutions
5. **Testing**: Always test video playback in your presentation software

## 📞 Support

- **Repository**: https://github.com/TundraTough-hub/arctic-presentation-template
- **Issues**: Report problems via GitHub Issues
- **Documentation**: Check main README.md for detailed instructions

---
*Generated by Reliable Arctic Background Exporter*
*Export Method: Screenshot + FFmpeg for maximum compatibility*
*Date: ${new Date().toISOString().split('T')[0]}*
`;

    fs.writeFileSync(path.join(CONFIG.outputDir, 'RELIABLE_BACKGROUNDS_GUIDE.md'), guide);
    console.log('📖 Created usage guide');
  }

  cleanup() {
    // Remove temporary screenshot directory
    if (fs.existsSync(CONFIG.screenshotDir)) {
      fs.removeSync(CONFIG.screenshotDir);
    }
  }

  logTroubleshootingInfo() {
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Ensure Node.js 16+ is installed');
    console.log('2. Install dependencies: npm install --legacy-peer-deps');
    console.log('3. Check slide files exist in ../slides/ directory');
    console.log('4. Verify sufficient disk space (1GB+ recommended)');
    console.log('5. For Windows: Ensure ffmpeg is accessible or ffmpeg-static is installed');
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Reliable Arctic Background Exporter

Usage: node export-reliable-backgrounds.js [options]

Options:
  --resolution <res>    Export resolution (hd|fhd|uhd|presentation)
  --quality <qual>      Video quality (low|medium|high|ultra)
  --duration <sec>      Animation duration in seconds
  --classic-only        Export only classic style backgrounds
  --modern-only         Export only modern style backgrounds
  --help, -h           Show this help message

Examples:
  node export-reliable-backgrounds.js --resolution uhd --quality ultra
  node export-reliable-backgrounds.js --classic-only --duration 15
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

  // Run the exporter
  const exporter = new ReliableBackgroundExporter();
  
  // Filter slides if requested
  if (args.includes('--classic-only')) {
    exporter.slides = exporter.slides.filter(s => s.category === 'classic');
  } else if (args.includes('--modern-only')) {
    exporter.slides = exporter.slides.filter(s => s.category === 'modern');
  }

  exporter.exportAllBackgrounds().catch(console.error);
}

module.exports = ReliableBackgroundExporter;
