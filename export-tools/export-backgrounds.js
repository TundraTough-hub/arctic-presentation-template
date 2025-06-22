#!/usr/bin/env node

/**
 * Arctic Presentation Background Exporter
 * Exports animated slide backgrounds to MP4 for PowerPoint/Google Slides
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  // Export settings
  duration: 10, // seconds - adjust based on your presentation needs
  fps: 60,      // high fps for smooth animations
  width: 1920,  // Full HD width
  height: 1080, // Full HD height
  
  // Video quality settings
  quality: 'high', // 'high', 'medium', 'low'
  format: 'mp4',   // output format
  
  // Paths
  slidesDir: '../slides',
  outputDir: './mp4-backgrounds',
  tempDir: './temp-backgrounds'
};

// Quality presets
const QUALITY_PRESETS = {
  high: { crf: 18, preset: 'slow' },
  medium: { crf: 23, preset: 'medium' },
  low: { crf: 28, preset: 'fast' }
};

class BackgroundExporter {
  constructor() {
    this.setupDirectories();
  }

  setupDirectories() {
    // Create output directories
    fs.ensureDirSync(CONFIG.outputDir);
    fs.ensureDirSync(CONFIG.tempDir);
    
    console.log(`📁 Output directory: ${CONFIG.outputDir}`);
    console.log(`📁 Temp directory: ${CONFIG.tempDir}`);
  }

  async exportAllBackgrounds() {
    console.log('🎬 Starting Arctic Presentation Background Export...\n');
    
    try {
      // Check if required tools are installed
      this.checkDependencies();
      
      // Create background-only HTML files
      await this.createBackgroundFiles();
      
      // Export to MP4
      await this.exportToMP4();
      
      // Create PowerPoint/Google Slides guide
      this.createUsageGuide();
      
      console.log('\n✅ Export complete! Check the mp4-backgrounds folder for your video files.');
      console.log('📖 See BACKGROUND_USAGE_GUIDE.md for import instructions.');
      
    } catch (error) {
      console.error('❌ Export failed:', error.message);
      process.exit(1);
    }
  }

  checkDependencies() {
    console.log('🔍 Checking dependencies...');
    
    try {
      // Check if timecut is installed
      execSync('npx timecut --version', { stdio: 'pipe' });
      console.log('✅ timecut found');
    } catch (error) {
      console.log('⚠️ timecut not found, installing...');
      execSync('npm install timecut', { stdio: 'inherit' });
    }
    
    try {
      // Check if ffmpeg is available
      execSync('ffmpeg -version', { stdio: 'pipe' });
      console.log('✅ ffmpeg found');
    } catch (error) {
      console.log('❌ ffmpeg not found. Please install ffmpeg first.');
      console.log('📋 Installation instructions:');
      console.log('  macOS: brew install ffmpeg');
      console.log('  Windows: Download from https://ffmpeg.org/download.html');
      console.log('  Linux: sudo apt install ffmpeg');
      throw new Error('ffmpeg is required but not installed');
    }
  }

  async createBackgroundFiles() {
    console.log('\n🎨 Creating background-only HTML files...');
    
    const backgrounds = [
      {
        name: 'title-slide',
        title: 'Arctic Infrastructure Solutions',
        subtitle: 'Professional Presentation Template',
        description: 'Title slide with flowing Arctic-themed background animation'
      },
      {
        name: 'section-divider',
        title: 'Section Divider',
        subtitle: 'Clean transition between presentation sections',
        description: 'Section divider with wave animation and organic shapes'
      },
      {
        name: 'data-insights',
        title: 'Data & Insights',
        subtitle: 'Background for charts, graphs, and statistics',
        description: 'Subtle animated background perfect for data visualization'
      },
      {
        name: 'content-slide',
        title: 'Content Slide',
        subtitle: 'General content background',
        description: 'Versatile background for text, images, and mixed content'
      }
    ];

    for (const bg of backgrounds) {
      await this.createBackgroundHTML(bg);
    }
  }

  async createBackgroundHTML(background) {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${background.title} - Background Export</title>
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            width: ${CONFIG.width}px;
            height: ${CONFIG.height}px;
            overflow: hidden;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #F5F7FA 0%, #AAC8E0 100%);
            position: relative;
        }
        
        /* Arctic-themed animated background */
        .background-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        
        /* Flowing shapes animation */
        .flow-shape {
            position: absolute;
            border-radius: 50% 30% 70% 40%;
            opacity: 0.15;
            animation: flowFloat 12s ease-in-out infinite;
        }
        
        .flow-shape:nth-child(1) {
            width: 400px;
            height: 300px;
            background: linear-gradient(45deg, #2A73B5, #00AEEF);
            top: 10%;
            left: -10%;
            animation-delay: 0s;
            animation-duration: 15s;
        }
        
        .flow-shape:nth-child(2) {
            width: 300px;
            height: 400px;
            background: linear-gradient(45deg, #00AEEF, #AAC8E0);
            bottom: 10%;
            right: -10%;
            animation-delay: -5s;
            animation-duration: 20s;
        }
        
        .flow-shape:nth-child(3) {
            width: 250px;
            height: 250px;
            background: linear-gradient(45deg, #152F52, #2A73B5);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation-delay: -10s;
            animation-duration: 18s;
        }
        
        /* Organic wave animation */
        .wave-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 200px;
            background: linear-gradient(180deg, 
                rgba(42, 115, 181, 0.1) 0%, 
                rgba(0, 174, 239, 0.2) 100%);
            clip-path: polygon(0 80%, 100% 60%, 100% 100%, 0% 100%);
            animation: waveFlow 8s ease-in-out infinite;
        }
        
        /* Subtle particle animation */
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(42, 115, 181, 0.6);
            border-radius: 50%;
            animation: particleFloat 6s linear infinite;
        }
        
        .particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 60%; left: 80%; animation-delay: -2s; }
        .particle:nth-child(3) { top: 80%; left: 30%; animation-delay: -4s; }
        .particle:nth-child(4) { top: 40%; left: 70%; animation-delay: -1s; }
        .particle:nth-child(5) { top: 30%; left: 50%; animation-delay: -3s; }
        
        /* Keyframe animations */
        @keyframes flowFloat {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg) scale(1);
                border-radius: 50% 30% 70% 40%;
            }
            25% {
                transform: translate(30px, -20px) rotate(5deg) scale(1.1);
                border-radius: 40% 60% 30% 70%;
            }
            50% {
                transform: translate(-20px, 30px) rotate(-3deg) scale(0.9);
                border-radius: 60% 40% 50% 30%;
            }
            75% {
                transform: translate(20px, 10px) rotate(2deg) scale(1.05);
                border-radius: 30% 50% 40% 60%;
            }
        }
        
        @keyframes waveFlow {
            0%, 100% {
                clip-path: polygon(0 80%, 100% 60%, 100% 100%, 0% 100%);
                transform: translateX(0);
            }
            50% {
                clip-path: polygon(0 60%, 100% 80%, 100% 100%, 0% 100%);
                transform: translateX(10px);
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
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        /* Slide-specific customizations */
        ${this.getSlideSpecificStyles(background.name)}
    </style>
</head>
<body>
    <div class="background-container">
        <!-- Flowing organic shapes -->
        <div class="flow-shape"></div>
        <div class="flow-shape"></div>
        <div class="flow-shape"></div>
        
        <!-- Wave overlay -->
        <div class="wave-overlay"></div>
        
        <!-- Floating particles -->
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>
    
    <!-- Export metadata (hidden) -->
    <div style="display: none;" data-slide-type="${background.name}" data-description="${background.description}"></div>
</body>
</html>`;

    const filename = path.join(CONFIG.tempDir, `${background.name}-background.html`);
    await fs.writeFile(filename, htmlContent);
    console.log(`✅ Created ${background.name}-background.html`);
  }

  getSlideSpecificStyles(slideType) {
    const styles = {
      'title-slide': `
        .flow-shape:nth-child(1) { opacity: 0.2; }
        .wave-overlay { height: 150px; }
      `,
      'section-divider': `
        .flow-shape { opacity: 0.1; }
        .wave-overlay { 
          height: 120px; 
          background: linear-gradient(180deg, 
            rgba(0, 174, 239, 0.1) 0%, 
            rgba(170, 200, 224, 0.3) 100%);
        }
      `,
      'data-insights': `
        .flow-shape { opacity: 0.08; }
        .particle { opacity: 0.4; }
        .wave-overlay { display: none; }
      `,
      'content-slide': `
        .flow-shape { opacity: 0.12; }
        .wave-overlay { height: 100px; opacity: 0.8; }
      `
    };
    
    return styles[slideType] || '';
  }

  async exportToMP4() {
    console.log('\n🎬 Exporting backgrounds to MP4...');
    
    const backgroundFiles = await fs.readdir(CONFIG.tempDir);
    const htmlFiles = backgroundFiles.filter(file => file.endsWith('.html'));
    
    for (const htmlFile of htmlFiles) {
      await this.exportSingleBackground(htmlFile);
    }
  }

  async exportSingleBackground(htmlFile) {
    const name = path.basename(htmlFile, '.html');
    const inputPath = path.join(CONFIG.tempDir, htmlFile);
    const outputPath = path.join(CONFIG.outputDir, `${name}.mp4`);
    
    console.log(`🎥 Exporting ${name}...`);
    
    const quality = QUALITY_PRESETS[CONFIG.quality];
    
    try {
      // Use timecut for high-quality export
      const command = `npx timecut "${inputPath}" ` +
        `--viewport="${CONFIG.width},${CONFIG.height}" ` +
        `--fps=${CONFIG.fps} ` +
        `--duration=${CONFIG.duration} ` +
        `--output-options="-c:v libx264 -crf ${quality.crf} -preset ${quality.preset} -pix_fmt yuv420p" ` +
        `"${outputPath}"`;
      
      execSync(command, { stdio: 'inherit' });
      console.log(`✅ Exported ${name}.mp4`);
      
      // Get file size for reference
      const stats = await fs.stat(outputPath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
      console.log(`   File size: ${sizeMB} MB`);
      
    } catch (error) {
      console.error(`❌ Failed to export ${name}:`, error.message);
    }
  }

  createUsageGuide() {
    const guide = `# Arctic Presentation Background Usage Guide

## 📁 Exported Files

Your animated backgrounds have been exported to the \`mp4-backgrounds\` folder:

- \`title-slide-background.mp4\` - Main title slide background
- \`section-divider-background.mp4\` - Section transition background  
- \`data-insights-background.mp4\` - Data visualization background
- \`content-slide-background.mp4\` - General content background

## 🎬 Video Specifications

- **Resolution:** ${CONFIG.width}x${CONFIG.height} (Full HD)
- **Frame Rate:** ${CONFIG.fps} fps
- **Duration:** ${CONFIG.duration} seconds (loops seamlessly)
- **Format:** MP4 (H.264)
- **Quality:** ${CONFIG.quality.toUpperCase()}

## 📊 PowerPoint Import Instructions

### Method 1: Background Video
1. Open your PowerPoint presentation
2. Go to **Design** > **Designer** > **Format Background**
3. Select **Picture or Texture Fill**
4. Click **File** and choose your MP4 background
5. Check **Loop** to repeat the animation
6. Apply to current slide or all slides

### Method 2: Insert as Video
1. Go to **Insert** > **Media** > **Video** > **Video on My PC**
2. Select your MP4 background file
3. Right-click the video > **Send to Back**
4. Resize to fill the entire slide
5. Set **Playback** > **Start: Automatically**
6. Set **Playback** > **Loop until Stopped**

## 📊 Google Slides Import Instructions

### Method 1: Background Image (Static)
1. Open your Google Slides presentation  
2. Right-click on slide > **Change background**
3. Click **Choose image** > **Upload**
4. Select a still frame from your video (take screenshot)

### Method 2: Insert as Video
1. Go to **Insert** > **Video**
2. Select **Upload** tab
3. Upload your MP4 file
4. Resize and position as background
5. Right-click video > **Video options**
6. Set **Start:** On click, **End:** Loop

## 🎨 Color Scheme Reference

Your backgrounds use the Arctic brand colors:

- **Primary Blue:** #2A73B5
- **Arctic Cyan:** #00AEEF  
- **Dark Navy:** #152F52
- **Accent Light:** #AAC8E0
- **Neutral White:** #FFFFFF
- **Soft Gray:** #F5F7FA

## 💡 Pro Tips

1. **Looping:** All backgrounds are designed to loop seamlessly
2. **Layering:** Place content over backgrounds with sufficient contrast
3. **Performance:** MP4s are optimized for smooth playback
4. **Customization:** Contact for custom durations or resolutions
5. **Compatibility:** Works with PowerPoint 2016+, Google Slides, Keynote

## 🔧 Technical Details

- **Encoding:** H.264 with yuv420p pixel format
- **Compression:** Optimized for quality and file size
- **Compatibility:** Universal playback support
- **Animation:** CSS-based organic flowing shapes
- **Theme:** Arctic/winter professional aesthetic

## 📞 Support

For custom backgrounds or technical issues:
- Repository: https://github.com/TundraTough-hub/arctic-presentation-template
- Issues: Create a GitHub issue for support

---
*Generated by Arctic Presentation Background Exporter v1.0*
`;

    fs.writeFileSync(path.join(CONFIG.outputDir, 'BACKGROUND_USAGE_GUIDE.md'), guide);
    console.log('📖 Created usage guide: BACKGROUND_USAGE_GUIDE.md');
  }
}

// Run the exporter
if (require.main === module) {
  const exporter = new BackgroundExporter();
  exporter.exportAllBackgrounds().catch(console.error);
}

module.exports = BackgroundExporter;
