# 🎬 Arctic Presentation Background Exporter

Export beautiful, animated slide backgrounds to MP4 files for seamless import into PowerPoint and Google Slides.

## ✨ Features

- **🎨 Modern Design**: Non-blocky, flowing organic shapes following 2025 design trends
- **🌊 Smooth Animations**: CSS-based flowing animations optimized for professional presentations
- **📱 High Quality**: Full HD (1920x1080) 60fps MP4 exports
- **🔄 Seamless Loops**: Backgrounds loop perfectly for continuous playback
- **🎯 Arctic Theme**: Uses Tundra Tough/Arctic Outlook brand colors
- **⚡ Easy Integration**: Direct import into PowerPoint and Google Slides

## 🚀 Quick Start

### 1. Install Dependencies

First, make sure you have Node.js installed, then:

```bash
cd export-tools
node setup.js
```

This will install all required Node packages and check for FFmpeg.

### 2. Export Backgrounds

```bash
npm run export
```

This creates 4 animated MP4 backgrounds:
- `title-slide-background.mp4`
- `section-divider-background.mp4` 
- `data-insights-background.mp4`
- `content-slide-background.mp4`

### 3. Import to PowerPoint/Google Slides

Check the generated `BACKGROUND_USAGE_GUIDE.md` for detailed import instructions.

## 📋 System Requirements

- **Node.js** 14+ 
- **FFmpeg** (for video encoding)
- **Memory**: 2GB+ RAM recommended
- **Storage**: ~100MB for exported videos

### Installing FFmpeg

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from [ffmpeg.org](https://ffmpeg.org/download.html)

**Linux:**
```bash
sudo apt install ffmpeg
```

## 🎨 Background Types

### Title Slide Background
Perfect for presentation opening slides with:
- Prominent flowing shapes
- Professional gradient overlay
- Arctic-themed color palette

### Section Divider Background  
Clean transition backgrounds featuring:
- Subtle wave animations
- Minimal distractions
- Professional section breaks

### Data Insights Background
Optimized for charts and graphs with:
- Minimal animation interference
- High contrast support
- Data-friendly aesthetics

### Content Slide Background
Versatile background for any content:
- Balanced visual interest
- Text-friendly contrast
- General-purpose design

## ⚙️ Configuration

Edit `export-backgrounds.js` to customize:

```javascript
const CONFIG = {
  duration: 10,    // Video length in seconds
  fps: 60,         // Frame rate
  width: 1920,     // Video width
  height: 1080,    // Video height
  quality: 'high'  // 'high', 'medium', 'low'
};
```

## 🎨 Color Palette

All backgrounds use the Arctic brand colors:

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#2A73B5` | Main titles & headers |
| Arctic Cyan | `#00AEEF` | Highlight accents |
| Dark Navy | `#152F52` | Body text areas |
| Accent Light | `#AAC8E0` | Background fills |
| Neutral White | `#FFFFFF` | Text backgrounds |
| Soft Gray | `#F5F7FA` | Section dividers |

## 📁 File Structure

```
export-tools/
├── package.json              # Dependencies
├── setup.js                  # Installation script
├── export-backgrounds.js     # Main export script
├── temp-backgrounds/         # Generated HTML files
└── mp4-backgrounds/          # Exported MP4 files
    ├── title-slide-background.mp4
    ├── section-divider-background.mp4
    ├── data-insights-background.mp4
    ├── content-slide-background.mp4
    └── BACKGROUND_USAGE_GUIDE.md
```

## 🔧 Technical Details

### Export Process
1. **HTML Generation**: Creates background-only HTML files with CSS animations
2. **Browser Capture**: Uses timecut + puppeteer for frame-by-frame capture
3. **Video Encoding**: FFmpeg encodes frames to optimized MP4
4. **Quality Control**: H.264 encoding with yuv420p for universal compatibility

### Animation Features
- **Organic Shapes**: Flowing, non-blocky animations following 2025 design trends
- **Smooth Transitions**: CSS keyframes optimized for 60fps playback
- **Seamless Loops**: Animations designed to loop perfectly
- **Performance**: Lightweight CSS animations for smooth browser rendering

## 📊 PowerPoint Integration

### Background Video Method
1. Design → Format Background → Picture/Texture Fill
2. Select MP4 file → Check "Loop"
3. Apply to slide(s)

### Video Insert Method  
1. Insert → Media → Video → Video on My PC
2. Right-click → Send to Back
3. Resize to fill slide
4. Set Playback → Start: Automatically → Loop

## 📊 Google Slides Integration

### Video Insert Method
1. Insert → Video → Upload
2. Select MP4 file
3. Resize and position
4. Video Options → Loop

### Static Background Method
1. Take screenshot of video frame
2. Change Background → Upload image

## 🛠️ Troubleshooting

### Common Issues

**"FFmpeg not found"**
- Install FFmpeg using instructions above
- Ensure it's in your system PATH

**"timecut command failed"**
- Check Node.js version (14+ required)
- Try: `npm install timecut` manually

**Large file sizes**
- Reduce duration in CONFIG
- Lower quality setting to 'medium' or 'low'
- Reduce fps to 30

**Choppy animations**
- Increase fps to 60
- Set quality to 'high'
- Check available system memory

**PowerPoint won't play video**
- Use MP4 format (default)
- Check PowerPoint version (2016+ recommended)
- Try "Insert Video" method instead of background

## 🎯 Design Philosophy

Following 2025 presentation design trends, these backgrounds feature:

- **Flowing Organic Shapes**: Replacing blocky rectangular designs
- **Asymmetrical Layouts**: Breaking traditional grid patterns
- **Minimalist Aesthetics**: Clean, uncluttered visual space
- **Dynamic Movement**: Subtle animations that enhance without distracting
- **Professional Color Harmony**: Arctic-inspired palette for credibility

## 🌐 Browser Compatibility

The export process uses:
- **Chromium/Chrome**: For consistent rendering
- **Modern CSS**: Supported animations and transforms
- **Hardware Acceleration**: GPU-optimized where available

## 📈 Performance Optimization

### Export Speed
- Multi-threaded FFmpeg encoding
- Optimized CSS animations
- Efficient browser capture

### File Size
- H.264 compression optimization
- Quality vs. size balancing
- Configurable bitrate settings

## 🎭 Animation Types

### Flowing Shapes
- Organic border-radius morphing
- Smooth translation and rotation
- Layered depth effects

### Wave Overlays  
- Clip-path polygon animations
- Gradient color transitions
- Natural wave motion

### Particle Systems
- Floating element animations
- Staggered timing effects
- Subtle environmental details

## 🔄 Customization Options

### Timing Adjustments
```javascript
// Animation duration multipliers
flowFloat: '15s',     // Shape movement speed
waveFlow: '8s',       // Wave animation speed  
particleFloat: '6s'   // Particle movement speed
```

### Color Variations
```javascript
// Custom color schemes
primaryColor: '#2A73B5',
accentColor: '#00AEEF',
backgroundGradient: 'linear-gradient(135deg, #F5F7FA 0%, #AAC8E0 100%)'
```

### Shape Complexity
```javascript
// Shape border-radius variations
borderRadius: '50% 30% 70% 40%',  // Organic shapes
transform: 'scale(1.1)',          // Size variations
opacity: '0.15'                   // Transparency levels
```

## 📞 Support & Contribution

### Repository
- **GitHub**: [arctic-presentation-template](https://github.com/TundraTough-hub/arctic-presentation-template)
- **Issues**: Report bugs and feature requests
- **Discussions**: Community support and ideas

### Custom Requests
For custom backgrounds, different color schemes, or specific animation requirements:
1. Create a GitHub issue with your requirements
2. Include presentation context and target audience
3. Specify technical requirements (resolution, duration, etc.)

## 📄 License

MIT License - Use freely for commercial and personal presentations.

## 🏆 Credits

- **Design**: Arctic Outlook / Tundra Tough LLC
- **Development**: Arctic Presentation Template Team
- **Animation Inspiration**: 2025 web design trends
- **Technical Stack**: Node.js, Puppeteer, FFmpeg, CSS3

---

*Creating professional, modern presentation backgrounds for the Arctic business community.*