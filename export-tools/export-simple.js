#!/usr/bin/env node

/**
 * Alternative Background Exporter using puppeteer-screen-recorder
 * Simpler setup, good for users who have issues with timecut
 */

const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const fs = require('fs-extra');
const path = require('path');

// Configuration
const CONFIG = {
  duration: 10000, // 10 seconds in milliseconds
  fps: 30,         // Lower fps for smaller files
  width: 1920,
  height: 1080,
  outputDir: './mp4-backgrounds-simple',
  tempDir: './temp-backgrounds'
};

class SimpleBackgroundExporter {
  constructor() {
    this.setupDirectories();
  }

  setupDirectories() {
    fs.ensureDirSync(CONFIG.outputDir);
    fs.ensureDirSync(CONFIG.tempDir);
  }

  async exportAllBackgrounds() {
    console.log('🎬 Simple Arctic Background Exporter\n');
    
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      // Create HTML files first
      await this.createSimpleBackgroundFiles();
      
      // Export each background
      const backgrounds = ['title-slide', 'section-divider', 'data-insights', 'content-slide'];
      
      for (const bg of backgrounds) {
        await this.exportBackground(browser, bg);
      }

      console.log('\n✅ Export complete!');
      console.log(`📁 Files saved to: ${CONFIG.outputDir}`);

    } catch (error) {
      console.error('❌ Export failed:', error.message);
    } finally {
      await browser.close();
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
      fps: CONFIG.fps,
      ffmpeg_Path: null // Use system ffmpeg
    });

    const htmlFile = path.join(CONFIG.tempDir, `${backgroundName}-simple.html`);
    const outputFile = path.join(CONFIG.outputDir, `${backgroundName}-background.mp4`);

    try {
      // Start recording
      await recorder.start(outputFile);
      
      // Load the background HTML
      await page.goto(`file://${path.resolve(htmlFile)}`, {
        waitUntil: 'networkidle0'
      });

      // Record for the specified duration
      await page.waitForTimeout(CONFIG.duration);

      // Stop recording
      await recorder.stop();
      
      console.log(`✅ Saved ${backgroundName}-background.mp4`);
      
      // Get file size
      const stats = await fs.stat(outputFile);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
      console.log(`   File size: ${sizeMB} MB`);

    } catch (error) {
      console.error(`❌ Failed to record ${backgroundName}:`, error.message);
    } finally {
      await page.close();
    }
  }

  async createSimpleBackgroundFiles() {
    console.log('🎨 Creating background HTML files...');

    const backgrounds = [
      { name: 'title-slide', primaryColor: '#2A73B5', intensity: 'high' },
      { name: 'section-divider', primaryColor: '#00AEEF', intensity: 'medium' },
      { name: 'data-insights', primaryColor: '#152F52', intensity: 'low' },
      { name: 'content-slide', primaryColor: '#AAC8E0', intensity: 'medium' }
    ];

    for (const bg of backgrounds) {
      await this.createSimpleHTML(bg);
    }
  }

  async createSimpleHTML(background) {
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
        }
        
        .background-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .organic-shape {
            position: absolute;
            border-radius: 50% 30% 70% 40%;
            background: linear-gradient(45deg, ${background.primaryColor}, #00AEEF);
            opacity: ${this.getOpacityForIntensity(background.intensity)};
            animation: organicFlow 20s ease-in-out infinite;
        }
        
        .shape-1 {
            width: 400px;
            height: 300px;
            top: 10%;
            left: -10%;
            animation-delay: 0s;
        }
        
        .shape-2 {
            width: 300px;
            height: 400px;
            bottom: 10%;
            right: -10%;
            animation-delay: -7s;
        }
        
        .shape-3 {
            width: 250px;
            height: 250px;
            top: 40%;
            left: 30%;
            animation-delay: -14s;
        }
        
        .wave-element {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 150px;
            background: linear-gradient(180deg, 
                rgba(42, 115, 181, 0.1) 0%, 
                rgba(0, 174, 239, 0.2) 100%);
            clip-path: polygon(0 70%, 100% 50%, 100% 100%, 0% 100%);
            animation: gentleWave 12s ease-in-out infinite;
        }
        
        @keyframes organicFlow {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg) scale(1);
                border-radius: 50% 30% 70% 40%;
            }
            25% {
                transform: translate(40px, -30px) rotate(8deg) scale(1.1);
                border-radius: 40% 60% 30% 70%;
            }
            50% {
                transform: translate(-30px, 40px) rotate(-5deg) scale(0.9);
                border-radius: 60% 40% 50% 30%;
            }
            75% {
                transform: translate(30px, 20px) rotate(3deg) scale(1.05);
                border-radius: 30% 50% 40% 60%;
            }
        }
        
        @keyframes gentleWave {
            0%, 100% {
                clip-path: polygon(0 70%, 100% 50%, 100% 100%, 0% 100%);
            }
            50% {
                clip-path: polygon(0 50%, 100% 70%, 100% 100%, 0% 100%);
            }
        }
    </style>
</head>
<body>
    <div class="background-layer">
        <div class="organic-shape shape-1"></div>
        <div class="organic-shape shape-2"></div>
        <div class="organic-shape shape-3"></div>
        <div class="wave-element"></div>
    </div>
</body>
</html>`;

    const filename = path.join(CONFIG.tempDir, `${background.name}-simple.html`);
    await fs.writeFile(filename, htmlContent);
    console.log(`✅ Created ${background.name}-simple.html`);
  }

  getOpacityForIntensity(intensity) {
    const opacities = {
      'high': '0.18',
      'medium': '0.12', 
      'low': '0.08'
    };
    return opacities[intensity] || '0.12';
  }
}

// Run the exporter
if (require.main === module) {
  const exporter = new SimpleBackgroundExporter();
  exporter.exportAllBackgrounds().catch(console.error);
}

module.exports = SimpleBackgroundExporter;
