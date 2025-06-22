#!/usr/bin/env node

/**
 * Interactive Arctic Background Exporter
 * User-friendly interface for exporting presentation backgrounds
 */

const readline = require('readline');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class InteractiveExporter {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async start() {
    console.log('🎬 Arctic Presentation Background Exporter');
    console.log('==========================================\n');

    // Check if setup is needed
    const needsSetup = await this.checkSetup();
    if (needsSetup) {
      const runSetup = await this.askYesNo('Setup required. Run setup now? (y/n): ');
      if (runSetup) {
        await this.runSetup();
      } else {
        console.log('Please run setup first: npm run setup');
        this.exit();
        return;
      }
    }

    // Show main menu
    await this.showMainMenu();
  }

  async checkSetup() {
    // Check if node_modules exists and has key dependencies
    const nodeModulesExists = fs.existsSync('./node_modules');
    const puppeteerExists = fs.existsSync('./node_modules/puppeteer');
    
    return !nodeModulesExists || !puppeteerExists;
  }

  async runSetup() {
    console.log('\n🚀 Running setup...\n');
    try {
      execSync('npm run setup', { stdio: 'inherit' });
      console.log('\n✅ Setup complete!\n');
    } catch (error) {
      console.log('\n❌ Setup failed. Please run: npm install\n');
      this.exit();
      return;
    }
  }

  async showMainMenu() {
    console.log('📋 Export Options:');
    console.log('==================');
    console.log('1. Export all backgrounds (recommended)');
    console.log('2. Export classic style only');
    console.log('3. Export modern style only');
    console.log('4. Quick export (8 seconds, smaller files)');
    console.log('5. Premium export (4K, maximum quality)');
    console.log('6. Custom export options');
    console.log('7. View existing exports');
    console.log('8. Help & information');
    console.log('9. Exit');
    console.log('');

    const choice = await this.askQuestion('Choose an option (1-9): ');
    await this.handleMainChoice(choice);
  }

  async handleMainChoice(choice) {
    switch (choice.trim()) {
      case '1':
        await this.exportAll();
        break;
      case '2':
        await this.exportClassic();
        break;
      case '3':
        await this.exportModern();
        break;
      case '4':
        await this.exportQuick();
        break;
      case '5':
        await this.exportPremium();
        break;
      case '6':
        await this.customExport();
        break;
      case '7':
        await this.viewExports();
        break;
      case '8':
        await this.showHelp();
        break;
      case '9':
        this.exit();
        return;
      default:
        console.log('Invalid choice. Please try again.\n');
        await this.showMainMenu();
    }
  }

  async exportAll() {
    console.log('\n🎬 Exporting all Arctic backgrounds...');
    console.log('This will create 6 video backgrounds (classic + modern styles)');
    console.log('Estimated time: 3-5 minutes\n');

    const confirm = await this.askYesNo('Continue? (y/n): ');
    if (confirm) {
      await this.runExport('node export-all-backgrounds.js');
    }
    
    await this.showContinueMenu();
  }

  async exportClassic() {
    console.log('\n🎨 Exporting classic Arctic backgrounds...');
    console.log('Flowing, dynamic backgrounds with organic animations');
    console.log('Estimated time: 2-3 minutes\n');

    const confirm = await this.askYesNo('Continue? (y/n): ');
    if (confirm) {
      await this.runExport('node export-all-backgrounds.js --classic-only');
    }

    await this.showContinueMenu();
  }

  async exportModern() {
    console.log('\n🏢 Exporting modern Arctic backgrounds...');
    console.log('Clean, minimal backgrounds perfect for corporate presentations');
    console.log('Estimated time: 2-3 minutes\n');

    const confirm = await this.askYesNo('Continue? (y/n): ');
    if (confirm) {
      await this.runExport('node export-all-backgrounds.js --modern-only');
    }

    await this.showContinueMenu();
  }

  async exportQuick() {
    console.log('\n⚡ Quick export settings:');
    console.log('• 8-second duration');
    console.log('• HD resolution (1280x720)');
    console.log('• No still frames');
    console.log('• Estimated time: 1-2 minutes\n');

    const confirm = await this.askYesNo('Continue? (y/n): ');
    if (confirm) {
      await this.runExport('node export-all-backgrounds.js --duration 8 --resolution hd --no-stills');
    }

    await this.showContinueMenu();
  }

  async exportPremium() {
    console.log('\n💎 Premium export settings:');
    console.log('• 4K resolution (3840x2160)');
    console.log('• Ultra quality');
    console.log('• 15-second duration');
    console.log('• Large file sizes');
    console.log('• Estimated time: 10-15 minutes\n');

    const confirm = await this.askYesNo('Continue? (y/n): ');
    if (confirm) {
      await this.runExport('node export-all-backgrounds.js --resolution uhd --quality ultra --duration 15');
    }

    await this.showContinueMenu();
  }

  async customExport() {
    console.log('\n⚙️  Custom Export Options');
    console.log('=========================\n');

    // Resolution choice
    console.log('Resolution options:');
    console.log('1. HD (1280x720) - Fast, smaller files');
    console.log('2. Full HD (1920x1080) - Recommended');
    console.log('3. 4K (3840x2160) - Maximum quality');
    console.log('4. Presentation (1366x768) - Standard displays');
    
    const resChoice = await this.askQuestion('\nChoose resolution (1-4): ');
    const resolutions = ['hd', 'fhd', 'uhd', 'presentation'];
    const resolution = resolutions[parseInt(resChoice) - 1] || 'fhd';

    // Quality choice
    console.log('\nQuality options:');
    console.log('1. Low - Fast export');
    console.log('2. Medium - Balanced');
    console.log('3. High - Recommended');
    console.log('4. Ultra - Maximum quality');
    
    const qualChoice = await this.askQuestion('\nChoose quality (1-4): ');
    const qualities = ['low', 'medium', 'high', 'ultra'];
    const quality = qualities[parseInt(qualChoice) - 1] || 'high';

    // Duration choice
    const duration = await this.askQuestion('\nDuration in seconds (8-30, default 12): ');
    const durationNum = parseInt(duration) || 12;

    // Style choice
    console.log('\nStyle options:');
    console.log('1. All backgrounds');
    console.log('2. Classic only');
    console.log('3. Modern only');
    
    const styleChoice = await this.askQuestion('\nChoose style (1-3): ');
    let styleFlag = '';
    if (styleChoice === '2') styleFlag = '--classic-only';
    if (styleChoice === '3') styleFlag = '--modern-only';

    // Build command
    let command = `node export-all-backgrounds.js --resolution ${resolution} --quality ${quality} --duration ${durationNum}`;
    if (styleFlag) command += ` ${styleFlag}`;

    console.log(`\n📋 Export command: ${command}\n`);
    const confirm = await this.askYesNo('Run export with these settings? (y/n): ');
    
    if (confirm) {
      await this.runExport(command);
    }

    await this.showContinueMenu();
  }

  async viewExports() {
    console.log('\n📁 Checking for existing exports...\n');

    const exportDirs = [
      './mp4-backgrounds-complete',
      './mp4-backgrounds-real',
      './mp4-backgrounds'
    ];

    let foundExports = false;

    for (const dir of exportDirs) {
      if (fs.existsSync(dir)) {
        foundExports = true;
        console.log(`✅ Found exports in: ${dir}`);
        
        try {
          const files = fs.readdirSync(dir, { recursive: true })
            .filter(file => file.endsWith('.mp4') || file.endsWith('.png'));
          
          if (files.length > 0) {
            console.log(`   Files (${files.length}):`);
            files.slice(0, 10).forEach(file => console.log(`   • ${file}`));
            if (files.length > 10) console.log(`   ... and ${files.length - 10} more`);
          }
        } catch (error) {
          console.log('   (Could not read directory contents)');
        }
        console.log('');
      }
    }

    if (!foundExports) {
      console.log('❌ No exports found. Run an export first.\n');
    }

    await this.showContinueMenu();
  }

  async showHelp() {
    console.log('\n📖 Arctic Background Exporter Help');
    console.log('===================================\n');
    
    console.log('🎯 What this does:');
    console.log('• Converts Arctic slide animations to MP4 video backgrounds');
    console.log('• Creates files you can use in PowerPoint, Google Slides, etc.');
    console.log('• Exports both classic (flowing) and modern (minimal) styles\n');

    console.log('📊 Background types:');
    console.log('• Title slides - For presentation openings');
    console.log('• Section dividers - For transitions between sections');
    console.log('• Data slides - For charts, graphs, and statistics\n');

    console.log('💡 Usage tips:');
    console.log('• Start with "Export all backgrounds" for complete set');
    console.log('• Use Full HD resolution for best quality/size balance');
    console.log('• Classic style: Dynamic, engaging presentations');
    console.log('• Modern style: Corporate, professional presentations\n');

    console.log('🔧 System requirements:');
    console.log('• Node.js 16 or higher');
    console.log('• 2GB+ RAM for video processing');
    console.log('• 1GB+ free disk space\n');

    console.log('📞 Need more help?');
    console.log('• Check README.md for detailed documentation');
    console.log('• Visit: https://github.com/TundraTough-hub/arctic-presentation-template');
    console.log('• Create an issue for problems or questions\n');

    await this.showContinueMenu();
  }

  async runExport(command) {
    console.log('\n🎬 Starting export...\n');
    console.log('═'.repeat(50));
    
    try {
      execSync(command, { stdio: 'inherit' });
      console.log('\n═'.repeat(50));
      console.log('✅ Export completed successfully!\n');
      
      // Show where files were saved
      const outputDirs = ['./mp4-backgrounds-complete', './mp4-backgrounds-real'];
      for (const dir of outputDirs) {
        if (fs.existsSync(dir)) {
          console.log(`📁 Files saved to: ${path.resolve(dir)}`);
        }
      }
      
    } catch (error) {
      console.log('\n═'.repeat(50));
      console.log('❌ Export failed!\n');
      console.log('Common solutions:');
      console.log('• Ensure all dependencies are installed: npm run setup');
      console.log('• Check available disk space');
      console.log('• Try a smaller resolution or duration');
      console.log('• Check the error message above for specific issues\n');
    }
  }

  async showContinueMenu() {
    console.log('📋 What would you like to do next?');
    console.log('1. Return to main menu');
    console.log('2. View exports');
    console.log('3. Exit');
    console.log('');

    const choice = await this.askQuestion('Choose option (1-3): ');
    
    switch (choice.trim()) {
      case '1':
        await this.showMainMenu();
        break;
      case '2':
        await this.viewExports();
        break;
      case '3':
      default:
        this.exit();
        break;
    }
  }

  async askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  async askYesNo(question) {
    const answer = await this.askQuestion(question);
    return answer.toLowerCase().startsWith('y');
  }

  exit() {
    console.log('\n👋 Thanks for using Arctic Background Exporter!');
    console.log('🎨 Your exported backgrounds are ready for PowerPoint, Google Slides, and more.\n');
    this.rl.close();
  }
}

// ASCII art banner function
function showBanner() {
  console.log('');
  console.log('   ❄️  ARCTIC PRESENTATION BACKGROUNDS  ❄️');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║          Professional Video          ║');
  console.log('  ║       Background Exporter v2.0       ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
}

// Run the interactive exporter
if (require.main === module) {
  showBanner();
  const exporter = new InteractiveExporter();
  exporter.start().catch(console.error);
}

module.exports = InteractiveExporter;
