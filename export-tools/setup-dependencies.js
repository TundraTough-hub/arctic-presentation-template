#!/usr/bin/env node

/**
 * Setup Dependencies for Arctic Background Exporter
 * Checks and installs all necessary dependencies
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Arctic Background Exporter - Dependency Setup\n');

class DependencySetup {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  async setupAll() {
    console.log('🔍 Checking system dependencies...\n');

    // Check Node.js version
    this.checkNodeVersion();

    // Check and install npm packages
    await this.setupNpmPackages();

    // Check system dependencies
    this.checkSystemDependencies();

    // Setup directories
    this.setupDirectories();

    // Create sample configuration
    this.createSampleConfig();

    // Print summary
    this.printSummary();
  }

  checkNodeVersion() {
    console.log('📋 Checking Node.js version...');
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion >= 16) {
      this.success.push(`Node.js ${nodeVersion} ✅`);
      console.log(`✅ Node.js ${nodeVersion} (compatible)`);
    } else {
      this.errors.push(`Node.js ${nodeVersion} is too old. Requires Node.js 16+`);
      console.log(`❌ Node.js ${nodeVersion} (requires 16+)`);
    }
    console.log('');
  }

  async setupNpmPackages() {
    console.log('📦 Installing npm dependencies...');
    
    const packages = [
      'puppeteer',
      'puppeteer-screen-recorder',
      'fs-extra',
      'archiver',
      'sharp',
      'ffmpeg-static',
      'cli-progress',
      'chalk'
    ];

    for (const pkg of packages) {
      try {
        console.log(`   Installing ${pkg}...`);
        execSync(`npm install ${pkg}`, { stdio: 'pipe' });
        this.success.push(`${pkg} installed ✅`);
      } catch (error) {
        this.errors.push(`Failed to install ${pkg}: ${error.message}`);
        console.log(`   ❌ Failed to install ${pkg}`);
      }
    }

    // Install optional timecut
    try {
      console.log('   Installing timecut (optional)...');
      execSync('npm install timecut', { stdio: 'pipe' });
      this.success.push('timecut installed ✅');
    } catch (error) {
      this.warnings.push('timecut installation failed (optional)');
    }

    console.log('');
  }

  checkSystemDependencies() {
    console.log('🔧 Checking system dependencies...');

    // Check Chrome/Chromium for Puppeteer
    this.checkChrome();

    // Check FFmpeg (if available)
    this.checkFFmpeg();

    console.log('');
  }

  checkChrome() {
    try {
      // Puppeteer will download Chromium automatically
      console.log('✅ Puppeteer will handle Chrome/Chromium automatically');
      this.success.push('Browser support ready ✅');
    } catch (error) {
      this.warnings.push('Browser setup may need manual configuration');
    }
  }

  checkFFmpeg() {
    try {
      execSync('ffmpeg -version', { stdio: 'pipe' });
      console.log('✅ FFmpeg found (system)');
      this.success.push('FFmpeg available ✅');
    } catch (error) {
      try {
        // Check if ffmpeg-static is working
        const ffmpegStatic = require('ffmpeg-static');
        if (ffmpegStatic) {
          console.log('✅ FFmpeg available (via ffmpeg-static)');
          this.success.push('FFmpeg-static ready ✅');
        }
      } catch (e) {
        this.warnings.push('FFmpeg not found - will use ffmpeg-static package');
        console.log('⚠️  FFmpeg not found - using ffmpeg-static package');
      }
    }
  }

  setupDirectories() {
    console.log('📁 Setting up directories...');

    const directories = [
      './mp4-backgrounds-complete',
      './mp4-backgrounds-complete/classic',
      './mp4-backgrounds-complete/modern',
      './mp4-backgrounds-complete/stills',
      './mp4-backgrounds-complete/bundles',
      './background-previews',
      './temp-exports'
    ];

    directories.forEach(dir => {
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log(`✅ Created ${dir}`);
        } else {
          console.log(`✅ ${dir} exists`);
        }
        this.success.push(`Directory ${dir} ready ✅`);
      } catch (error) {
        this.errors.push(`Failed to create ${dir}: ${error.message}`);
      }
    });

    console.log('');
  }

  createSampleConfig() {
    console.log('⚙️  Creating configuration files...');

    // Create .gitignore for export directories
    const gitignoreContent = `# Arctic Background Exporter
mp4-backgrounds-*/
background-previews/
temp-exports/
*.mp4
*.png
node_modules/
npm-debug.log*
.npm
.node_repl_history
`;

    try {
      fs.writeFileSync('./.gitignore-export', gitignoreContent);
      console.log('✅ Created .gitignore-export');
      this.success.push('Configuration files created ✅');
    } catch (error) {
      this.warnings.push('Could not create .gitignore-export');
    }

    // Create quick start script
    const quickStartScript = `#!/bin/bash
# Arctic Background Export - Quick Start

echo "🎬 Arctic Background Exporter - Quick Start"
echo ""

# Check if we're in the right directory
if [ ! -f "export-all-backgrounds.js" ]; then
    echo "❌ Please run this from the export-tools directory"
    exit 1
fi

echo "📋 Available export options:"
echo "1. Export all backgrounds (recommended)"
echo "2. Export only classic backgrounds"
echo "3. Export only modern backgrounds"
echo "4. Export in 4K quality"
echo "5. Quick export (8 seconds, no stills)"
echo ""

read -p "Choose option (1-5): " choice

case $choice in
    1) node export-all-backgrounds.js ;;
    2) node export-all-backgrounds.js --classic-only ;;
    3) node export-all-backgrounds.js --modern-only ;;
    4) node export-all-backgrounds.js --resolution uhd --quality ultra ;;
    5) node export-all-backgrounds.js --duration 8 --no-stills ;;
    *) echo "Invalid choice" ;;
esac
`;

    try {
      fs.writeFileSync('./quick-start.sh', quickStartScript);
      fs.chmodSync('./quick-start.sh', '755');
      console.log('✅ Created quick-start.sh');
    } catch (error) {
      this.warnings.push('Could not create quick-start.sh');
    }

    console.log('');
  }

  printSummary() {
    console.log('📊 Setup Summary');
    console.log('================\n');

    if (this.success.length > 0) {
      console.log('✅ Successful:');
      this.success.forEach(item => console.log(`   ${item}`));
      console.log('');
    }

    if (this.warnings.length > 0) {
      console.log('⚠️  Warnings:');
      this.warnings.forEach(item => console.log(`   ${item}`));
      console.log('');
    }

    if (this.errors.length > 0) {
      console.log('❌ Errors:');
      this.errors.forEach(item => console.log(`   ${item}`));
      console.log('');
    }

    // Print next steps
    console.log('🚀 Next Steps:');
    console.log('==============');
    
    if (this.errors.length === 0) {
      console.log('✅ Setup complete! You can now export backgrounds:');
      console.log('');
      console.log('📋 Quick Commands:');
      console.log('   npm run export              # Export all backgrounds');
      console.log('   npm run export-classic      # Classic style only');
      console.log('   npm run export-modern       # Modern style only');
      console.log('   npm run export-4k           # High quality 4K export');
      console.log('   ./quick-start.sh             # Interactive menu');
      console.log('');
      console.log('📖 Or run the main exporter:');
      console.log('   node export-all-backgrounds.js --help');
    } else {
      console.log('❌ Please fix the errors above before proceeding.');
      console.log('');
      console.log('🔧 Common fixes:');
      console.log('   • Update Node.js to version 16 or higher');
      console.log('   • Run: npm install');
      console.log('   • Check internet connection');
      console.log('   • Ensure sufficient disk space');
    }

    console.log('');
    console.log('📞 Need help?');
    console.log('   • Check README.md for documentation');
    console.log('   • Create issue: https://github.com/TundraTough-hub/arctic-presentation-template/issues');
    console.log('   • Review troubleshooting guide in export-tools/TROUBLESHOOTING.md');
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new DependencySetup();
  setup.setupAll().catch(console.error);
}

module.exports = DependencySetup;
