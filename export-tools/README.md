# Arctic Presentation Background Exporter

Professional video background exporter for Arctic presentation templates. Export animated backgrounds from your slides to use in PowerPoint, Google Slides, Keynote, and other presentation software.

## 🎬 What This Does

Converts your beautiful Arctic slide animations into **MP4 video backgrounds** that you can use in any presentation software:

- **6 Different Background Styles**: Classic and modern variants
- **Multiple Resolutions**: HD, Full HD, 4K, and presentation-optimized
- **High Quality Videos**: Smooth 30fps animations with professional encoding
- **Still Frame Exports**: PNG images for static use
- **PowerPoint Ready**: Optimized for seamless integration

## 📁 Exported Backgrounds

### Classic Arctic Style (Dynamic & Flowing)
- `arctic-title-classic-background.mp4` - Flowing title slide with organic shapes
- `arctic-section-classic-background.mp4` - Wave-animated section divider
- `arctic-data-classic-background.mp4` - Subtle data visualization background

### Modern Arctic Style (Clean & Minimal)
- `arctic-title-modern-background.mp4` - Minimalist title with geometric elements
- `arctic-data-modern-background.mp4` - Clean data background with soft animations
- `arctic-section-modern-background.mp4` - Contemporary section divider

## 🚀 Quick Start

### 1. Setup (First Time Only)
```bash
cd export-tools
npm run setup
```

### 2. Export All Backgrounds
```bash
npm run export
```

### 3. Use Exported Videos
- Check `mp4-backgrounds-complete/` folder
- Import MP4 files into your presentation software
- See usage guide for detailed instructions

## 📋 Export Options

### Quick Commands
```bash
# Export everything (recommended)
npm run export

# Classic style only
npm run export-classic

# Modern style only  
npm run export-modern

# High-definition (720p)
npm run export-hd

# Ultra high quality 4K
npm run export-4k

# Quick 8-second export
npm run export-quick

# Premium quality with longer duration
npm run export-premium
```

### Advanced Options
```bash
# Custom resolution and quality
node export-all-backgrounds.js --resolution uhd --quality ultra

# Specific duration
node export-all-backgrounds.js --duration 15

# Skip still frame generation
node export-all-backgrounds.js --no-stills

# See all options
node export-all-backgrounds.js --help
```

## 🎯 Resolution Options

| Option | Resolution | Aspect Ratio | Best For |
|--------|------------|--------------|----------|
| `hd` | 1280×720 | 16:9 | Quick exports, smaller files |
| `fhd` | 1920×1080 | 16:9 | **Recommended** - Full HD quality |
| `uhd` | 3840×2160 | 16:9 | 4K presentations, maximum quality |
| `presentation` | 1366×768 | 16:9 | Standard presentation displays |

## 📊 PowerPoint Integration

### Method 1: Background Video (Recommended)
1. **Design** → **Format Background**
2. **Picture or Texture Fill** → **File**
3. Select your MP4 background
4. ✅ Check **Loop** 
5. **Apply to All Slides**

### Method 2: Insert as Video
1. **Insert** → **Media** → **Video** → **Video on My PC**
2. Select MP4 file
3. Right-click → **Send to Back**
4. Resize to fill slide
5. **Playback** → **Start: Automatically** + **Loop until Stopped**

## 📊 Google Slides Integration

1. **Insert** → **Video** → **Upload**
2. Select your MP4 background
3. Resize to fill slide
4. **Video options** → **Loop**
5. Right-click → **Send to back**

## 🛠️ Technical Specifications

### Video Output
- **Format**: MP4 (H.264)
- **Frame Rate**: 30 fps
- **Duration**: 12 seconds (seamless loop)
- **Audio**: None (silent)
- **Compression**: Optimized for quality and compatibility

### Quality Levels
- **Low**: Fast export, 1MB bitrate
- **Medium**: Balanced, 2MB bitrate  
- **High**: Recommended, 4MB bitrate
- **Ultra**: Maximum quality, 8MB bitrate

## 📁 File Structure

After export, you'll find:

```
export-tools/
├── mp4-backgrounds-complete/
│   ├── classic/                    # Classic style backgrounds
│   │   ├── arctic-title-classic-background.mp4
│   │   ├── arctic-section-classic-background.mp4
│   │   └── arctic-data-classic-background.mp4
│   ├── modern/                     # Modern style backgrounds
│   │   ├── arctic-title-modern-background.mp4
│   │   ├── arctic-data-modern-background.mp4
│   │   └── arctic-section-modern-background.mp4
│   ├── stills/                     # High-res PNG frames
│   │   └── [slide-name]-still.png
│   └── COMPLETE_BACKGROUNDS_GUIDE.md
```

## 🎨 Background Descriptions

### Classic Arctic Backgrounds
Perfect for **dynamic, engaging presentations**:
- **Flowing organic shapes** with smooth animations
- **Wave elements** that create movement
- **Particle effects** for visual interest
- **Rich color gradients** with Arctic theme

### Modern Arctic Backgrounds  
Ideal for **corporate, professional presentations**:
- **Clean geometric elements** 
- **Subtle animations** that don't distract
- **Minimalist design** with plenty of white space
- **Contemporary Arctic color palette**

## 🔧 System Requirements

### Required
- **Node.js 16+** ([Download](https://nodejs.org/))
- **2GB+ RAM** for video processing
- **1GB+ free disk space** for exports

### Automatically Handled
- **Chrome/Chromium** (downloaded by Puppeteer)
- **FFmpeg** (included via ffmpeg-static)
- **All Node.js dependencies** (installed via npm)

## 🚨 Troubleshooting

### Setup Issues
```bash
# Check Node.js version
node --version  # Should be 16+

# Clean install
rm -rf node_modules
npm install

# Run setup again
npm run setup
```

### Export Issues
```bash
# Increase memory for large exports
node --max-old-space-size=8192 export-all-backgrounds.js

# Check disk space
df -h

# Export with basic settings
npm run export-quick
```

### Common Problems

**"Module not found" errors**
```bash
npm install
```

**"FFmpeg not found"**
- The exporter uses `ffmpeg-static` automatically
- No need to install FFmpeg separately

**Videos appear blank**
- Ensure slide HTML files exist in `../slides/` folder
- Check that CSS files are properly linked
- Verify paths in slide HTML files

**Export takes too long**
- Use `--duration 8` for shorter videos
- Use `--resolution hd` for faster processing
- Use `--no-stills` to skip PNG generation

## 📞 Support & Customization

### Documentation
- **Main Repository**: [Arctic Presentation Template](https://github.com/TundraTough-hub/arctic-presentation-template)
- **Usage Guide**: Check `USAGE_GUIDE.md` in main folder
- **Troubleshooting**: See `TROUBLESHOOTING.md`

### Getting Help
1. **Check existing issues**: [GitHub Issues](https://github.com/TundraTough-hub/arctic-presentation-template/issues)
2. **Create new issue**: Include error messages and system info
3. **Review documentation**: Most questions are answered in the guides

### Custom Requirements
- **Different durations**: Use `--duration <seconds>`
- **Custom resolutions**: Modify `CONFIG.resolutions` in the script
- **Additional formats**: Contact for WebM or GIF export options
- **Batch processing**: Script supports multiple slides automatically

## 🎯 Best Practices

### Choosing Backgrounds
- **Title slides**: Use title-specific backgrounds
- **Data slides**: Use data-optimized backgrounds
- **Section breaks**: Use section divider backgrounds
- **Content slides**: Use versatile content backgrounds

### PowerPoint Tips
- **Keep text readable**: Use sufficient contrast
- **Test playback**: Ensure videos loop smoothly
- **File size**: Balance quality vs. presentation file size
- **Compatibility**: Test with your PowerPoint version

### Performance
- **HD resolution** for most uses (good quality, reasonable file size)
- **Full HD** for professional presentations
- **4K only** when specifically needed (large files)
- **12-second duration** provides natural loops

---

*Arctic Presentation Background Exporter v2.0*  
*Professional video backgrounds for presentation software*  
*Compatible with PowerPoint, Google Slides, Keynote, and more*
