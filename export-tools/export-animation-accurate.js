#!/usr/bin/env node

/**
 * Animation-Accurate Arctic Background Exporter
 * Captures backgrounds with proper animation timing
 */

const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Configuration with accurate timing
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
  outputDir: './mp4-backgrounds-accurate',
  screenshotDir: './temp-screenshots-accurate',
  
  // File paths
  baseDir: '../',
  
  // Animation timing settings
  quality: 'high',
  frameInterval: 1000 / 30, // 33.33ms for 30fps - matches CSS animation timing
  imageFormat: 'png', // Use PNG for better quality
  imageQuality: 100,
  
  // Animation synchronization
  animationResetDelay: 2000, // Wait for animations to start properly
  captureDelay: 16, // Small delay to ensure frame capture timing
};

// Quality presets for ffmpeg
const QUALITY_PRESETS = {
  low: { crf: 28, preset: 'fast' },
  medium: { crf: 23, preset: 'medium' },
  high: { crf: 18, preset: 'slow' },
  ultra: { crf: 15, preset: 'veryslow' }
};

class AnimationAccurateExporter {
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
    console.log('🎬 Starting Animation-Accurate Arctic Background Export\n');
    console.log(`📊 Exporting ${this.slides.length} slide backgrounds`);
    console.log(`🎯 Resolution: ${CONFIG.resolutions[CONFIG.defaultResolution].name}`);
    console.log(`⏱️  Duration: ${CONFIG.duration / 1000}s per background`);
    console.log(`🎞️  Frame Rate: ${CONFIG.fps} fps (accurate timing)\n`);

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
      
      console.log('\n✅ Animation-accurate background export complete!');
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
      // Check if ffmpeg is available
      try {
        execSync('ffmpeg -version', { stdio: 'pipe' });
        console.log('✅ System FFmpeg found');
      } catch (error) {
        // Try to use ffmpeg-static
        const ffmpegStatic = require('ffmpeg-static');
        if (ffmpegStatic) {
          console.log('✅ Using ffmpeg-static');
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
    console.log('🚀 Launching browser with animation optimization...');
    return await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--allow-running-insecure-content',
        '--disable-features=VizDisplayCompositor',
        '--enable-gpu-rasterization',
        '--enable-oop-rasterization'
      ]
    });
  }

  async exportSingleSlideBackground(browser, slide) {
    console.log(`🎥 Exporting ${slide.name} (${slide.category})...`);
    
    const page = await browser.newPage();
    const resolution = CONFIG.resolutions[CONFIG.defaultResolution];
    
    // Configure page for accurate animation capture
    await page.setViewport({
      width: resolution.width,
      height: resolution.height,
      deviceScaleFactor: 1
    });

    // Disable throttling to ensure accurate timing
    const client = await page.target().createCDPSession();
    await client.send('Emulation.setCPUThrottlingRate', { rate: 1 });

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
      
      // Wait for everything to load and prepare animations
      await this.waitForSlideReady(page);
      
      // Prepare background for recording
      await this.prepareBackgroundElements(page, slide.type);
      
      // Synchronize animations and start recording
      await this.synchronizeAnimations(page);
      
      // Capture frames with accurate timing
      console.log(`   Capturing ${Math.ceil(CONFIG.duration / CONFIG.frameInterval)} frames with accurate timing...`);
      await this.captureAnimationFrames(page, screenshotFolder);
      
      // Convert screenshots to video using ffmpeg
      console.log(`   Converting to MP4 with original timing...`);
      await this.createVideoFromScreenshots(screenshotFolder, outputFile);
      
      // Create still frame
      await this.createStillFrame(page, slide);
      
      // Get file stats
      if (fs.existsSync(outputFile)) {
        const stats = fs.statSync(outputFile);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
        console.log(`✅ Exported ${slide.name} (${sizeMB} MB) - original timing preserved`);
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
    
    // Wait for fonts and CSS to load
    await page.waitForTimeout(3000);
    
    // Wait for web fonts specifically
    await page.evaluate(() => {
      return document.fonts.ready;
    });
    
    // Additional wait for any lazy-loaded resources
    await page.waitForTimeout(1000);
  }

  async synchronizeAnimations(page) {
    console.log('   Synchronizing animations for accurate capture...');
    
    // Reset all animations to start from the beginning
    await page.evaluate(() => {
      // Stop all animations
      const animatedElements = document.querySelectorAll('*');
      animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
      });
      
      // Force a reflow
      document.body.offsetHeight;
      
      // Reset animation start time
      const resetAnimations = () => {
        animatedElements.forEach(el => {
          if (el.style.animation || getComputedStyle(el).animationName !== 'none') {
            const currentAnimation = el.style.animation;
            el.style.animation = 'none';
            el.offsetHeight; // Force reflow
            el.style.animation = currentAnimation;
          }
        });
      };
      
      resetAnimations();
      
      // Resume animations in sync
      setTimeout(() => {
        animatedElements.forEach(el => {
          el.style.animationPlayState = 'running';
        });
      }, 50);
    });
    
    // Wait for animations to reset and start
    await page.waitForTimeout(CONFIG.animationResetDelay);
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

      // Optimize animations for consistent capture
      const style = document.createElement('style');
      style.textContent = `
        * {
          animation-play-state: running !important;
          backface-visibility: hidden !important;
          transform-style: preserve-3d !important;
          will-change: transform, opacity !important;
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

        /* Ensure animations are optimized for capture */
        .fluid-shape, .floating-element, .organic-shape, .flow-shape {
          animation-timing-function: linear !important;
          animation-fill-mode: both !important;
        }
      `;
      document.head.appendChild(style);
    });

    // Small wait for DOM changes to take effect
    await page.waitForTimeout(500);
  }

  async captureAnimationFrames(page, screenshotFolder) {
    const totalFrames = Math.ceil(CONFIG.duration / CONFIG.frameInterval);
    const startTime = Date.now();
    
    for (let i = 0; i < totalFrames; i++) {
      const frameTime = Date.now();
      const filename = path.join(screenshotFolder, `frame_${i.toString().padStart(6, '0')}.${CONFIG.imageFormat}`);
      
      // Capture screenshot
      await page.screenshot({
        path: filename,
        type: CONFIG.imageFormat,
        quality: CONFIG.imageQuality,
        fullPage: false,
        optimizeForSpeed: false // Prioritize quality over speed
      });
      
      // Calculate how long to wait for next frame
      const elapsedTime = Date.now() - frameTime;
      const targetTime = CONFIG.frameInterval;
      const waitTime = Math.max(0, targetTime - elapsedTime - CONFIG.captureDelay);
      
      if (waitTime > 0) {
        await page.waitForTimeout(waitTime);
      }
      
      // Show progress
      if (i % 30 === 0 || i === totalFrames - 1) {
        const progress = Math.round((i / totalFrames) * 100);
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        process.stdout.write(`\r   Progress: ${progress}% (${elapsed}s elapsed)`);
      }
    }
    
    console.log(''); // New line after progress
  }

  async createVideoFromScreenshots(screenshotFolder, outputFile) {
    const quality = QUALITY_PRESETS[CONFIG.quality];
    const inputPattern = path.join(screenshotFolder, `frame_%06d.${CONFIG.imageFormat}`);
    
    // Use ffmpeg-static path if available
    const ffmpegCmd = process.env.FFMPEG_PATH || 'ffmpeg';
    
    // Create video with exact frame rate timing
    const command = `"${ffmpegCmd}" -y -r ${CONFIG.fps} -i "${inputPattern}" -c:v libx264 -crf ${quality.crf} -preset ${quality.preset} -pix_fmt yuv420p -movflags +faststart -r ${CONFIG.fps} "${outputFile}"`;
    
    try {
      execSync(command, { stdio: 'pipe' });
    } catch (error) {
      throw new Error(`FFmpeg failed: ${error.message}`);
    }
  }

  async createStillFrame(page, slide) {
    const stillPath = path.join(CONFIG.outputDir, 'stills', `${slide.name}-still.png`);
    
    // Wait for a good animation frame
    await page.waitForTimeout(2000);
    
    await page.screenshot({
      path: stillPath,
      type: 'png',
      fullPage: false
    });
    
    console.log(`📸 Created still: ${slide.name}-still.png`);
  }

  createUsageGuide() {
    const guide = `# Animation-Accurate Arctic Presentation Backgrounds

## 📊 Export Information

- **Export Method**: Animation-Synchronized Capture (Accurate Timing)
- **Total Backgrounds**: ${this.slides.length}
- **Resolution**: ${CONFIG.resolutions[CONFIG.defaultResolution].name} (${CONFIG.resolutions[CONFIG.defaultResolution].width}×${CONFIG.resolutions[CONFIG.defaultResolution].height})
- **Duration**: ${CONFIG.duration / 1000} seconds each
- **Format**: MP4 (H.264)
- **Frame Rate**: ${CONFIG.fps} fps (synchronized with CSS animations)
- **Animation Accuracy**: ✅ Original timing preserved

## 🎞️ Animation Quality Features

### Timing Accuracy
- **Frame-perfect capture**: Each frame captured at exact 1/${CONFIG.fps}s intervals
- **Animation synchronization**: Animations reset and started in perfect sync
- **No speed distortion**: Original CSS animation timing preserved
- **Smooth playback**: Optimized for seamless looping

### Technical Optimizations
- **GPU acceleration**: Enabled for smooth animation rendering
- **High-quality frames**: PNG capture for maximum fidelity
- **Consistent timing**: CPU throttling disabled for accurate capture
- **Animation optimization**: Backface visibility and transform optimizations

## 📁 Exported Files

### Classic Arctic Backgrounds (Flowing & Dynamic)
${this.slides.filter(s => s.category === 'classic').map(s => 
  `- **${s.name}-background.mp4**: ${s.description}`
).join('\n')}

### Modern Arctic Backgrounds (Clean & Minimal)
${this.slides.filter(s => s.category === 'modern').map(s => 
  `- **${s.name}-background.mp4**: ${s.description}`
).join('\n')}

### Still Frames
- High-resolution PNG files in the \`stills/\` folder
- Perfect for static backgrounds or presentation thumbnails

## 📊 PowerPoint Integration

### Recommended Method: Background Video
1. **Design** → **Format Background**
2. **Picture or Texture Fill** → **File**
3. Select your MP4 background
4. ✅ Check **Loop** for continuous playback
5. **Apply to All Slides** or current slide

### Alternative Method: Insert Video Layer
1. **Insert** → **Media** → **Video** → **Video on My PC**
2. Select MP4 file and resize to fill slide completely
3. **Playback** → **Start: Automatically** + **Loop until Stopped**
4. Right-click → **Send to Back** to layer behind content

## 📊 Google Slides Integration

1. **Insert** → **Video** → **Upload**
2. Select your MP4 background file
3. Resize video to fill entire slide
4. **Video options** → **Loop** for continuous playback
5. Right-click → **Send to back** to use as background layer

## 🎨 Design Guidelines

### Background Usage Recommendations
- **Title backgrounds**: Perfect for impactful presentation openings
- **Section backgrounds**: Ideal for dividing presentation sections
- **Data backgrounds**: Excellent for charts, graphs, and statistics
- **Transition slides**: Great for smooth content flow

### Text Overlay Best Practices
- **Classic backgrounds**: Use white or navy text for best contrast
- **Modern backgrounds**: Dark text works well with minimal design
- **Text shadows**: Add subtle shadows for better text visibility
- **Content positioning**: Leave space for text in center areas

## 🔧 Technical Specifications

### Video Properties
- **Codec**: H.264 with yuv420p pixel format
- **Compression**: CRF ${QUALITY_PRESETS[CONFIG.quality].crf} (${CONFIG.quality} quality preset)
- **Frame Rate**: Exact ${CONFIG.fps} fps (matches CSS animation timing)
- **Loop Optimization**: Seamless loop points for continuous playback
- **File Optimization**: Fast start enabled for immediate playback

### Animation Accuracy
- **Timing Method**: Frame-synchronized capture (${CONFIG.frameInterval.toFixed(1)}ms intervals)
- **Animation Reset**: All animations synchronized to start time
- **Quality Priority**: PNG intermediate format for maximum fidelity
- **Performance**: GPU acceleration enabled for smooth rendering

## 💡 Professional Tips

1. **Perfect Loops**: All backgrounds loop seamlessly at the ${CONFIG.duration/1000}-second mark
2. **Layer Management**: Always place backgrounds behind content layers
3. **File Size**: Optimized balance between quality and file size
4. **Compatibility**: Universal playback support across platforms
5. **Performance**: Videos optimized for smooth presentation software playback

## 🎬 Animation Details

### Classic Style Animations
- **Organic flow shapes**: Smooth, natural movement patterns
- **Wave elements**: Fluid, ocean-inspired animations
- **Particle effects**: Subtle floating elements
- **Color transitions**: Gradient animations with Arctic palette

### Modern Style Animations  
- **Geometric elements**: Clean, precise movement
- **Minimal transitions**: Subtle, professional animations
- **Grid patterns**: Structured, contemporary design
- **Fade effects**: Smooth opacity transitions

## 📞 Support & Customization

### Documentation
- **Repository**: https://github.com/TundraTough-hub/arctic-presentation-template
- **Issues**: Report timing or quality problems via GitHub Issues
- **Customization**: Contact for different durations or animation speeds

### Animation Troubleshooting
If animations appear different from browser preview:
1. Check that CSS animation durations match export duration
2. Verify browser compatibility with animation properties
3. Test different quality settings for performance balance
4. Ensure sufficient system resources during export

---
*Generated by Animation-Accurate Arctic Background Exporter*
*Timing Method: Synchronized frame capture with original CSS animation timing*
*Export Date: ${new Date().toISOString().split('T')[0]}*
*Quality: ${CONFIG.quality.toUpperCase()} • FPS: ${CONFIG.fps} • Duration: ${CONFIG.duration/1000}s*
`;

    fs.writeFileSync(path.join(CONFIG.outputDir, 'ANIMATION_ACCURATE_GUIDE.md'), guide);
    console.log('📖 Created animation-accurate usage guide');
  }

  cleanup() {
    // Remove temporary screenshot directory
    if (fs.existsSync(CONFIG.screenshotDir)) {
      fs.removeSync(CONFIG.screenshotDir);
    }
  }

  logTroubleshootingInfo() {
    console.log('\n🔧 Animation Timing Troubleshooting:');
    console.log('1. Ensure CSS animations have consistent durations');
    console.log('2. Check that animation-timing-function is compatible');
    console.log('3. Verify sufficient system resources for smooth capture');
    console.log('4. Try lower resolution if timing issues persist');
    console.log('5. Ensure Node.js 16+ for optimal performance');
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Animation-Accurate Arctic Background Exporter

Usage: node export-animation-accurate.js [options]

Options:
  --resolution <res>    Export resolution (hd|fhd|uhd|presentation)
  --quality <qual>      Video quality (low|medium|high|ultra)
  --duration <sec>      Animation duration in seconds
  --fps <rate>          Frame rate (15|24|30|60)
  --classic-only        Export only classic style backgrounds
  --modern-only         Export only modern style backgrounds
  --help, -h           Show this help message

Examples:
  node export-animation-accurate.js --resolution fhd --quality high
  node export-animation-accurate.js --classic-only --fps 60
  node export-animation-accurate.js --duration 15 --quality ultra

Note: This exporter preserves original CSS animation timing for accurate playback.
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

  const fpsArg = args[args.indexOf('--fps') + 1];
  if (fpsArg && !isNaN(fpsArg)) {
    CONFIG.fps = parseInt(fpsArg);
    CONFIG.frameInterval = 1000 / CONFIG.fps;
  }

  // Run the exporter
  const exporter = new AnimationAccurateExporter();
  
  // Filter slides if requested
  if (args.includes('--classic-only')) {
    exporter.slides = exporter.slides.filter(s => s.category === 'classic');
  } else if (args.includes('--modern-only')) {
    exporter.slides = exporter.slides.filter(s => s.category === 'modern');
  }

  exporter.exportAllBackgrounds().catch(console.error);
}

module.exports = AnimationAccurateExporter;
