#!/usr/bin/env node

/**
 * Quick Setup Script for Arctic Presentation Background Exporter
 * This script sets up everything you need to export backgrounds to MP4
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎬 Arctic Presentation Background Exporter Setup\n');

function checkAndInstall() {
  try {
    console.log('📦 Installing dependencies...');
    
    // Install Node dependencies
    console.log('   → Installing Node.js packages...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('\n🔍 Checking system requirements...');
    
    // Check for ffmpeg
    try {
      execSync('ffmpeg -version', { stdio: 'pipe' });
      console.log('✅ FFmpeg is installed');
    } catch (error) {
      console.log('❌ FFmpeg not found');
      console.log('\n📋 Please install FFmpeg:');
      console.log('  🍎 macOS: brew install ffmpeg');
      console.log('  🪟 Windows: Download from https://ffmpeg.org/download.html');
      console.log('  🐧 Linux: sudo apt install ffmpeg');
      console.log('\n   Then run this setup again.');
      process.exit(1);
    }
    
    console.log('\n✅ Setup complete!');
    console.log('\n🚀 Usage:');
    console.log('   npm run export     - Export all backgrounds');
    console.log('   node export-backgrounds.js - Direct script execution');
    console.log('\n📁 MP4 files will be saved to: ./mp4-backgrounds/');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

checkAndInstall();
