#!/usr/bin/env node

/**
 * Fixed Setup Script for Arctic Presentation Background Exporter
 * Handles dependency conflicts and provides clear instructions
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎬 Arctic Presentation Background Exporter - Fixed Setup\n');

function checkNode() {
  console.log('🔍 Checking Node.js version...');
  const nodeVersion = process.version;
  console.log(`   Node.js version: ${nodeVersion}`);
  
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 14) {
    console.log('⚠️  Node.js 14+ recommended for best compatibility');
  } else {
    console.log('✅ Node.js version is compatible');
  }
}

function installDependencies() {
  try {
    console.log('\n📦 Installing dependencies with compatibility fixes...');
    
    // Try different installation methods
    console.log('   → Attempting installation with legacy peer deps...');
    
    try {
      execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
      console.log('✅ Dependencies installed successfully with legacy peer deps');
      return true;
    } catch (error) {
      console.log('⚠️  Legacy peer deps failed, trying alternative...');
      
      try {
        // Install specific versions that work together
        console.log('   → Installing specific compatible versions...');
        execSync('npm install puppeteer@19.0.0 puppeteer-screen-recorder@3.0.6', { stdio: 'inherit' });
        console.log('✅ Compatible versions installed');
        return true;
      } catch (error2) {
        console.log('❌ Automatic installation failed');
        return false;
      }
    }
  } catch (error) {
    console.error('❌ Installation failed:', error.message);
    return false;
  }
}

function checkFFmpeg() {
  console.log('\n🔍 Checking for FFmpeg...');
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
    console.log('✅ FFmpeg is installed');
    return true;
  } catch (error) {
    console.log('❌ FFmpeg not found');
    console.log('\n📋 Please install FFmpeg:');
    console.log('  🍎 macOS: brew install ffmpeg');
    console.log('  🪟 Windows: Download from https://ffmpeg.org/download.html');
    console.log('  🐧 Linux: sudo apt install ffmpeg');
    console.log('\n💡 FFmpeg is optional - the script will work without it but may have limitations');
    return false;
  }
}

function createQuickStart() {
  const quickStartScript = `@echo off
echo 🎬 Arctic Background Exporter - Quick Start
echo.
echo Running simplified export...
node export-simple-fixed.js
echo.
echo ✅ Check the mp4-backgrounds folder for your video files!
pause
`;

  const quickStartBash = `#!/bin/bash
echo "🎬 Arctic Background Exporter - Quick Start"
echo ""
echo "Running simplified export..."
node export-simple-fixed.js
echo ""
echo "✅ Check the mp4-backgrounds folder for your video files!"
`;

  fs.writeFileSync('quick-start.bat', quickStartScript);
  fs.writeFileSync('quick-start.sh', quickStartBash);
  
  try {
    execSync('chmod +x quick-start.sh', { stdio: 'pipe' });
  } catch (error) {
    // Ignore on Windows
  }
  
  console.log('📝 Created quick-start scripts');
}

function showUsageInstructions(dependenciesOK) {
  console.log('\n🚀 Setup Summary:');
  
  if (dependenciesOK) {
    console.log('✅ Dependencies installed successfully');
    console.log('\n📋 Usage Options:');
    console.log('   node export-simple-fixed.js     - Simplified export (recommended)');
    console.log('   ./quick-start.bat (Windows)      - Double-click to run');
    console.log('   ./quick-start.sh (Mac/Linux)     - Quick start script');
    
    console.log('\n🎯 What you\'ll get:');
    console.log('   • title-slide-background.mp4');
    console.log('   • section-divider-background.mp4');
    console.log('   • data-insights-background.mp4');
    console.log('   • content-slide-background.mp4');
    console.log('   • BACKGROUND_USAGE_GUIDE.md');
    
  } else {
    console.log('⚠️  Dependencies need manual installation');
    console.log('\n🔧 Manual Installation Steps:');
    console.log('1. npm install puppeteer@19.0.0');
    console.log('2. npm install puppeteer-screen-recorder@3.0.6');
    console.log('3. node export-simple-fixed.js');
  }
  
  console.log('\n📁 Output Location: ./mp4-backgrounds/');
  console.log('📖 Import Guide: See BACKGROUND_USAGE_GUIDE.md after export');
  
  console.log('\n💡 Troubleshooting:');
  console.log('   • If Chrome/Chromium errors: Update your browser');
  console.log('   • If permission errors: Run as administrator');
  console.log('   • If still failing: Try the manual installation steps above');
}

function main() {
  checkNode();
  
  const dependenciesOK = installDependencies();
  
  checkFFmpeg();
  
  createQuickStart();
  
  showUsageInstructions(dependenciesOK);
  
  console.log('\n🎬 Ready to create beautiful Arctic presentation backgrounds!');
}

main();
