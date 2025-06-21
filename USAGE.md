# Usage Guide - Arctic Presentation Template

This guide will help you get the most out of your Arctic Presentation Template.

## 🎯 Getting Started

### Step 1: Download and Setup
1. Download the `index.html` file from this repository
2. Save it to your local computer
3. Open the file in any modern web browser (Chrome, Firefox, Safari, Edge)

### Step 2: Navigate the Template
- Use the **dropdown menu** in the top-left corner to jump to any slide
- **Scroll horizontally** to browse through all 25 slide types
- **Click and drag** to navigate if using a trackpad

## 📝 Customizing Your Presentation

### Basic Text Editing
1. **Right-click** on the HTML file and select "Edit with" your preferred text editor
2. **Find the slide** you want to modify using the slide comments (e.g., `<!-- Slide 1: Title Slide -->`)
3. **Edit the text** within the HTML tags
4. **Save the file** and refresh your browser to see changes

### Example: Updating the Title Slide
```html
<!-- Change this: -->
<h1 class="main-title">Presentation Title</h1>
<p class="main-subtitle">Subtitle or Focus Area</p>

<!-- To this: -->
<h1 class="main-title">Water Infrastructure Project</h1>
<p class="main-subtitle">Community Development Initiative 2025</p>
```

### Adding Your Organization Details

#### Update Headers
Replace `[Organization Name]` throughout the template:
```html
<h1 class="slide-title">[Organization Name]</h1>
<!-- Becomes: -->
<h1 class="slide-title">Tundra Tough LLC</h1>
```

#### Update Footers
Replace the confidentiality notice:
```html
<span>Confidential - [Organization Name]</span>
<!-- Becomes: -->
<span>Confidential - Tundra Tough LLC</span>
```

#### Add Your Logo
Replace the logo placeholder:
```html
<div class="logo-space">LOGO</div>
<!-- Becomes: -->
<div class="logo-space">
    <img src="logo.png" alt="Company Logo" style="max-width:100%; max-height:100%;">
</div>
```

## 🎨 Color Customization

### Changing the Color Scheme
To modify colors, update these CSS variables in the `<style>` section:

```css
/* Current Arctic Colors */
#1e3a5f  /* Deep Arctic Blue - Headers */
#2d5a87  /* Glacial Blue - Accents */
#f1f5f9  /* Ice Blue - Backgrounds */

/* Example: Warmer Color Scheme */
#2d4a3e  /* Forest Green */
#4a6b5c  /* Sage Green */
#f0f4f1  /* Light Green */
```

### Quick Color Replacements
Use Find & Replace in your text editor:
- Find: `#1e3a5f` Replace with: `#your-primary-color`
- Find: `#2d5a87` Replace with: `#your-secondary-color`
- Find: `#f1f5f9` Replace with: `#your-background-color`

## 📊 Working with Data Slides

### Data Tables
Update table content while maintaining structure:
```html
<tbody>
    <tr>
        <td>Your Category</td>
        <td>Your Amount</td>
        <td>Your Percentage</td>
    </tr>
    <!-- Add more rows as needed -->
</tbody>
```

### Metrics Cards
Modify statistics and labels:
```html
<div class="metric-card">
    <div class="metric-number">1,247</div>
    <div class="metric-label">People Served</div>
</div>
```

### Charts and Graphs
Replace placeholder content:
```html
<div class="chart-container">
    <!-- Insert your chart image or embed code here -->
    <img src="your-chart.png" alt="Data Visualization">
</div>
```

## 🖼️ Adding Images

### Image Placeholders
Replace image placeholders with actual images:
```html
<div class="image-placeholder">
    [Insert Image Here]
</div>
<!-- Becomes: -->
<div style="text-align: center;">
    <img src="your-image.jpg" alt="Description" style="max-width:100%; height:450px; object-fit:cover; border-radius:12px;">
</div>
```

### Image Sizing Tips
- **Recommended dimensions:** 1920x1080 for full-slide images
- **Aspect ratios:** 16:9 for landscape, 4:3 for charts
- **File formats:** JPG for photos, PNG for graphics with transparency

## 📱 Export and Usage

### For PowerPoint/Google Slides
1. **Take screenshots** of individual slides
2. **Use browser tools:** Right-click → "Save as image"
3. **Print to PDF:** Use browser print function
4. **Copy elements:** Select and copy text/layouts to recreate

### For PDF Export
1. **Open in browser**
2. **Press Ctrl+P** (or Cmd+P on Mac)
3. **Select "Save as PDF"**
4. **Choose landscape orientation**
5. **Select "More settings" → Custom scale to fit**

### For Live Presentations
1. **Open in full-screen browser mode** (F11)
2. **Use the navigation dropdown** to jump between slides
3. **Connect to projector** and display directly from browser

## 🎯 Best Practices

### Content Guidelines
- **Keep bullet points concise** (1-2 lines each)
- **Use high-contrast images** for better visibility
- **Limit text per slide** to maintain readability
- **Test on actual presentation screen** before presenting

### Technical Tips
- **Save backup copies** before major edits
- **Test in multiple browsers** for compatibility
- **Keep file sizes reasonable** if adding many images
- **Use web-safe fonts** for maximum compatibility

### Presentation Tips
- **Practice navigation** between slides beforehand
- **Have a backup plan** (PDF version, printed slides)
- **Test audio/video** if embedding multimedia
- **Bring your own device** when possible

## 🔧 Troubleshooting

### Common Issues

**Slides appear too small:**
- Check browser zoom level (should be 100%)
- Try different responsive breakpoints in CSS

**Navigation not working:**
- Ensure JavaScript is enabled in browser
- Check for any HTML syntax errors

**Colors not displaying correctly:**
- Verify hex color codes are properly formatted
- Check for CSS syntax errors

**Text overflowing slides:**
- Reduce font sizes in CSS
- Shorten content to fit available space
- Check responsive scaling settings

### Getting Help
- **Check the Issues section** of this repository
- **Review the README.md** for additional information
- **Submit a new issue** if you encounter problems

## 📈 Advanced Customization

### Adding New Slide Types
1. **Copy an existing slide** structure
2. **Modify the content** and styling as needed
3. **Update the navigation dropdown** to include the new slide
4. **Test the layout** across different screen sizes

### Custom CSS Animations
Add subtle animations for professional flair:
```css
.slide {
    transition: transform 0.3s ease;
}

.slide:hover {
    transform: scale(1.02);
}
```

### Integration with Other Tools
- **Export to PowerPoint:** Use screenshots or recreate layouts
- **Google Slides:** Import images or rebuild using template as reference
- **Canva/Figma:** Use as design inspiration for custom slides

---

**Need more help?** Check out the README.md or open an issue in this repository.