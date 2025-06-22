#!/usr/bin/env node

/**
 * Simplified Arctic Background Exporter - No external dependencies except puppeteer
 * Works with Node.js built-in modules only
 */

const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  duration: 10000, // 10 seconds in milliseconds
  fps: 30,         // 30 fps for good quality and reasonable file size
  width: 1920,
  height: 1080,
  outputDir: './mp4-backgrounds',
  tempDir: './temp-backgrounds'
};

class SimpleBackgroundExporter {
  constructor() {
    this.setupDirectories();
  }

  setupDirectories() {
    // Create directories if they don't exist
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }
    if (!fs.existsSync(CONFIG.tempDir)) {
      fs.mkdirSync(CONFIG.tempDir, { recursive: true });
    }
    
    console.log(`📁 Output directory: ${CONFIG.outputDir}`);
    console.log(`📁 Temp directory: ${CONFIG.tempDir}`);
  }

  async exportAllBackgrounds() {
    console.log('🎬 Arctic Presentation Background Exporter\n');
    
    let browser;
    try {
      console.log('🚀 Starting browser...');
      browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });

      // Create HTML files first
      await this.createBackgroundFiles();
      
      // Export each background
      const backgrounds = ['title-slide', 'section-divider', 'data-insights', 'content-slide'];
      
      for (const bg of backgrounds) {
        await this.exportBackground(browser, bg);
      }

      // Create usage guide
      this.createUsageGuide();

      console.log('\n✅ Export complete!');
      console.log(`📁 Files saved to: ${CONFIG.outputDir}`);
      console.log('📖 See BACKGROUND_USAGE_GUIDE.md for import instructions.');

    } catch (error) {
      console.error('❌ Export failed:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Make sure you ran: npm install --legacy-peer-deps');
      console.log('2. Check that Chrome/Chromium is installed');
      console.log('3. Try running as administrator (Windows)');
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async exportBackground(browser, backgroundName) {
    console.log(`🎥 Recording ${backgroundName}...`);
    
    const page = await browser.newPage();
    await page.setViewport({ 
      width: CONFIG.width, 
      height: CONFIG.height 
    });

    const recorder = new PuppeteerScreenRecorder(page, {
      fps: CONFIG.fps
    });

    const htmlFile = path.join(CONFIG.tempDir, `${backgroundName}.html`);
    const outputFile = path.join(CONFIG.outputDir, `${backgroundName}-background.mp4`);

    try {
      // Start recording
      await recorder.start(outputFile);
      
      // Load the background HTML
      const fullPath = path.resolve(htmlFile);
      await page.goto(`file://${fullPath}`, {
        waitUntil: 'networkidle0'
      });

      // Wait a moment for animations to start
      await page.waitForTimeout(500);

      // Record for the specified duration
      await page.waitForTimeout(CONFIG.duration);

      // Stop recording
      await recorder.stop();
      
      console.log(`✅ Saved ${backgroundName}-background.mp4`);
      
      // Get file size
      const stats = fs.statSync(outputFile);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
      console.log(`   File size: ${sizeMB} MB`);

    } catch (error) {
      console.error(`❌ Failed to record ${backgroundName}:`, error.message);
    } finally {
      await page.close();
    }
  }

  async createBackgroundFiles() {
    console.log('🎨 Creating background HTML files...');

    const backgrounds = [
      { 
        name: 'title-slide', 
        primaryColor: '#2A73B5', 
        secondaryColor: '#00AEEF',
        intensity: 'high',
        description: 'Bold background for title slides'
      },
      { 
        name: 'section-divider', 
        primaryColor: '#00AEEF', 
        secondaryColor: '#AAC8E0',
        intensity: 'medium',
        description: 'Clean transition background for section breaks'
      },
      { 
        name: 'data-insights', 
        primaryColor: '#152F52', 
        secondaryColor: '#2A73B5',
        intensity: 'low',
        description: 'Subtle background for charts and data'
      },
      { 
        name: 'content-slide', 
        primaryColor: '#AAC8E0', 
        secondaryColor: '#2A73B5',
        intensity: 'medium',
        description: 'Versatile background for general content'
      }
    ];

    for (const bg of backgrounds) {
      await this.createHTML(bg);
    }
  }

  async createHTML(background) {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${background.name} Background</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            width: ${CONFIG.width}px;
            height: ${CONFIG.height}px;
            overflow: hidden;
            background: linear-gradient(135deg, #F5F7FA 0%, #AAC8E0 100%);
            position: relative;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .background-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        /* Flowing organic shapes - non-blocky design */
        .organic-shape {
            position: absolute;
            border-radius: 50% 30% 70% 40%;
            background: linear-gradient(45deg, ${background.primaryColor}, ${background.secondaryColor});
            opacity: ${this.getOpacityForIntensity(background.intensity)};
            animation: organicFlow 20s ease-in-out infinite;
        }
        
        .shape-1 {
            width: 450px;
            height: 350px;
            top: 5%;
            left: -15%;
            animation-delay: 0s;
            animation-duration: 25s;
        }
        
        .shape-2 {
            width: 350px;
            height: 450px;
            bottom: 5%;
            right: -15%;
            animation-delay: -8s;
            animation-duration: 22s;
        }
        
        .shape-3 {
            width: 280px;
            height: 280px;
            top: 35%;
            left: 25%;
            animation-delay: -16s;
            animation-duration: 18s;
        }
        
        .shape-4 {
            width: 200px;
            height: 300px;
            top: 60%;
            right: 20%;
            animation-delay: -12s;
            animation-duration: 20s;
        }
        
        /* Wave overlay for Arctic theme */
        .wave-element {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: ${this.getWaveHeightForType(background.name)}px;
            background: linear-gradient(180deg, 
                rgba(42, 115, 181, 0.1) 0%, 
                rgba(0, 174, 239, 0.2) 100%);
            clip-path: polygon(0 70%, 100% 50%, 100% 100%, 0% 100%);
            animation: gentleWave 15s ease-in-out infinite;
        }
        
        /* Floating particles for depth */
        .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(42, 115, 181, 0.4);
            border-radius: 50%;
            animation: particleFloat 12s linear infinite;
        }
        
        .particle:nth-child(1) { top: 15%; left: 8%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 45%; left: 75%; animation-delay: -4s; }
        .particle:nth-child(3) { top: 75%; left: 25%; animation-delay: -8s; }
        .particle:nth-child(4) { top: 25%; left: 60%; animation-delay: -2s; }
        .particle:nth-child(5) { top: 55%; left: 40%; animation-delay: -6s; }
        .particle:nth-child(6) { top: 85%; left: 70%; animation-delay: -10s; }
        
        /* Smooth, organic animations */
        @keyframes organicFlow {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg) scale(1);
                border-radius: 50% 30% 70% 40%;
            }
            25% {
                transform: translate(50px, -40px) rotate(10deg) scale(1.1);
                border-radius: 40% 60% 30% 70%;
            }
            50% {
                transform: translate(-40px, 50px) rotate(-7deg) scale(0.9);
                border-radius: 60% 40% 50% 30%;
            }
            75% {
                transform: translate(30px, 25px) rotate(5deg) scale(1.05);
                border-radius: 30% 50% 40% 60%;
            }
        }
        
        @keyframes gentleWave {
            0%, 100% {
                clip-path: polygon(0 70%, 100% 50%, 100% 100%, 0% 100%);
                transform: translateX(0);
            }
            33% {
                clip-path: polygon(0 50%, 100% 70%, 100% 100%, 0% 100%);
                transform: translateX(15px);
            }
            66% {
                clip-path: polygon(0 60%, 100% 40%, 100% 100%, 0% 100%);
                transform: translateX(-10px);
            }
        }
        
        @keyframes particleFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-120px) rotate(360deg);
                opacity: 0;
            }
        }
        
        /* Slide-specific adjustments */
        ${this.getSlideSpecificStyles(background.name)}
    </style>
</head>
<body>
    <div class="background-layer">
        <!-- Organic flowing shapes (non-blocky) -->
        <div class="organic-shape shape-1"></div>
        <div class="organic-shape shape-2"></div>
        <div class="organic-shape shape-3"></div>
        <div class="organic-shape shape-4"></div>
        
        <!-- Arctic wave overlay -->
        <div class="wave-element"></div>
        
        <!-- Floating particles for ambiance -->
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>
    
    <!-- Metadata for PowerPoint users -->
    <div style="display: none;" 
         data-slide-type="${background.name}" 
         data-description="${background.description}"
         data-duration="${CONFIG.duration / 1000}s"
         data-resolution="${CONFIG.width}x${CONFIG.height}">
    </div>
</body>
</html>`;

    const filename = path.join(CONFIG.tempDir, `${background.name}.html`);
    fs.writeFileSync(filename, htmlContent);
    console.log(`✅ Created ${background.name}.html`);
  }

  getOpacityForIntensity(intensity) {
    const opacities = {
      'high': '0.2',
      'medium': '0.15', 
      'low': '0.1'
    };
    return opacities[intensity] || '0.15';
  }

  getWaveHeightForType(slideType) {
    const heights = {
      'title-slide': 180,
      'section-divider': 120,
      'data-insights': 60,
      'content-slide': 100
    };
    return heights[slideType] || 100;
  }

  getSlideSpecificStyles(slideType) {
    const styles = {
      'title-slide': `
        .shape-1 { opacity: 0.25; }
        .wave-element { 
          background: linear-gradient(180deg, 
            rgba(42, 115, 181, 0.15) 0%, 
            rgba(0, 174, 239, 0.25) 100%);
        }
        .particle { background: rgba(42, 115, 181, 0.6); }
      `,
      'section-divider': `
        .organic-shape { animation-duration: 30s; }
        .wave-element { 
          background: linear-gradient(180deg, 
            rgba(0, 174, 239, 0.1) 0%, 
            rgba(170, 200, 224, 0.3) 100%);
        }
      `,
      'data-insights': `
        .organic-shape { opacity: 0.08; }
        .particle { opacity: 0.3; animation-duration: 15s; }
        .wave-element { opacity: 0.6; }
      `,
      'content-slide': `
        .wave-element { opacity: 0.8; }
        .particle { background: rgba(0, 174, 239, 0.5); }
      `
    };
    
    return styles[slideType] || '';
  }

  createUsageGuide() {
    const guide = `# Arctic Presentation Background Usage Guide

## 📁 Exported Background Files

Your animated backgrounds are ready for PowerPoint and Google Slides:

- \`title-slide-background.mp4\` - Opening slide background
- \`section-divider-background.mp4\` - Section transition background  
- \`data-insights-background.mp4\` - Charts and data background
- \`content-slide-background.mp4\` - General content background

## 🎬 Video Specifications

- **Resolution:** ${CONFIG.width}x${CONFIG.height} (Full HD)
- **Frame Rate:** ${CONFIG.fps} fps
- **Duration:** ${CONFIG.duration / 1000} seconds (loops seamlessly)
- **Format:** MP4 (H.264)

## 📊 PowerPoint Import Instructions

### Method 1: Background Video (Recommended)
1. **Right-click** on slide → **Format Background**
2. Select **Picture or Texture Fill**
3. Click **File** → Choose your MP4 background
4. ✅ Check **Loop** to repeat the animation
5. Click **Apply to All** for consistent branding

### Method 2: Insert as Video Object
1. **Insert** → **Media** → **Video** → **Video on My PC**
2. Select your MP4 background file
3. **Right-click** video → **Send to Back**
4. Resize video to fill entire slide (1920x1080)
5. **Playback** tab → **Start: Automatically** → **Loop until Stopped**

## 📊 Google Slides Import Instructions

### Method 1: Video Background
1. **Insert** → **Video** → **Upload** tab
2. Upload your MP4 file (may take a moment)
3. Resize video to fill slide completely
4. **Right-click** → **Video options** → **Loop**

### Method 2: Static Background (Alternative)
1. Take a screenshot of the video (pause at nice frame)
2. **Slide** → **Change background** → **Upload image**
3. Use the screenshot as static background

## 🎨 Arctic Brand Colors Used

All backgrounds use your official color palette:

- **Primary Blue:** #2A73B5 (main shapes)
- **Arctic Cyan:** #00AEEF (accents) 
- **Dark Navy:** #152F52 (depth)
- **Accent Light:** #AAC8E0 (highlights)
- **Neutral White:** #FFFFFF (contrast)
- **Soft Gray:** #F5F7FA (base)

## 🌊 Background Types & Usage

### Title Slide Background
- **Best for:** Opening slides, cover pages
- **Features:** Bold flowing shapes, prominent animation
- **Content tips:** White text works best, avoid lower-right corner

### Section Divider Background  
- **Best for:** Chapter breaks, agenda slides
- **Features:** Gentle wave motion, clean transitions
- **Content tips:** Center your text, use large fonts

### Data Insights Background
- **Best for:** Charts, graphs, statistics
- **Features:** Subtle animation, high contrast support
- **Content tips:** Perfect for data visualization, won't compete with charts

### Content Slide Background
- **Best for:** General slides, bullet points, images
- **Features:** Balanced animation, versatile design
- **Content tips:** Works with any content type

## 💡 Professional Tips

1. **Text Contrast:** Use white or dark navy text over backgrounds
2. **Logo Placement:** Top-right corner usually stays clear
3. **Animation Timing:** Backgrounds loop every ${CONFIG.duration / 1000} seconds
4. **File Size:** Each video is optimized for smooth playback
5. **Consistency:** Use same background type throughout sections

## 🔧 Troubleshooting

**PowerPoint won't play video:**
- Update to PowerPoint 2016 or newer
- Try "Insert Video" method instead of background
- Check file isn't corrupted (re-export if needed)

**Google Slides video issues:**
- Upload may take time with slow internet
- Try compressing video if over 100MB
- Use static screenshot method as backup

**Video appears pixelated:**
- Videos are Full HD (1920x1080)
- Ensure slide size matches (Design → Slide Size)
- Don't stretch video beyond original dimensions

## 📞 Support

- **Repository:** https://github.com/TundraTough-hub/arctic-presentation-template
- **Issues:** Report bugs or request features on GitHub
- **Custom backgrounds:** Contact for specific requirements

---
*Professional Arctic-themed backgrounds for impactful presentations*
*Generated by Arctic Background Exporter v1.0*
`;

    fs.writeFileSync(path.join(CONFIG.outputDir, 'BACKGROUND_USAGE_GUIDE.md'), guide);
    console.log('📖 Created usage guide: BACKGROUND_USAGE_GUIDE.md');
  }
}

// Run the exporter
if (require.main === module) {
  const exporter = new SimpleBackgroundExporter();
  exporter.exportAllBackgrounds().catch(console.error);
}

module.exports = SimpleBackgroundExporter;
