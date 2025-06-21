# Arctic Presentation Template - Project Structure

## Current File Organization

This document outlines the clean, simplified structure of the Arctic Presentation Template project.

## Directory Structure

```
arctic-presentation-template/
├── README.md                 # 🏠 Main landing page and project overview
├── all-slides.html          # 👀 View all slides in one scrollable page
├── styles/
│   └── arctic-theme.css     # 🎨 Master stylesheet for all slides
├── slides/                  # 📄 Individual slide template files
│   ├── 01-title-slide.html
│   ├── 02-agenda.html
│   ├── 03-executive-summary.html
│   ├── 07-data-visualization.html
│   ├── 18-swot-analysis.html
│   ├── 25-thank-you.html
│   └── ... (25 total slides when complete)
├── scripts/
│   └── generate-slides.js   # 🔧 Automated slide generation script
├── USAGE.md                 # 📖 Detailed usage instructions
├── CUSTOMIZATION.md         # ⚙️ Advanced customization guide
└── PROJECT_STRUCTURE.md     # 📋 This file - organization reference
```

## File Purposes

### Core Files
- **README.md** - Main entry point, project overview, and getting started guide
- **all-slides.html** - Comprehensive viewer showing all slides in sequence with navigation
- **styles/arctic-theme.css** - Master stylesheet ensuring consistency across all slides

### Slide Templates (slides/)
Each file contains a single, focused slide template:
- Consistent HTML structure
- Links to master CSS file
- Ready for customization
- Proper presentation dimensions (1920x1080)

### Documentation
- **README.md** - Project overview, quick start, and complete slide list
- **USAGE.md** - Step-by-step usage instructions and examples
- **CUSTOMIZATION.md** - Advanced customization techniques and color schemes

### Development Tools
- **scripts/generate-slides.js** - Automated template generation for developers
- **PROJECT_STRUCTURE.md** - Project organization reference (this file)

## Simplified Structure Benefits

### ✅ **What We Removed:**
- `index.html` - Redundant navigation interface (13KB saved)
- `template.html` - Old monolithic template (15KB saved)  
- `templates/` directory - Obsolete organization pattern

### ✅ **Why This Is Better:**
1. **Cleaner Entry Point** - README.md serves as the natural GitHub landing page
2. **Direct Access** - Users go straight to the slides they need
3. **Less Maintenance** - Fewer files to keep updated
4. **Better User Experience** - `all-slides.html` provides superior slide browsing
5. **Simplified Navigation** - No confusion about which file to start with

## User Workflow

### **Primary Path (Most Users):**
1. **Land on README.md** (GitHub default)
2. **Click [`all-slides.html`](../all-slides.html)** to browse templates
3. **Navigate to specific slides** in [`slides/`](../slides/) folder
4. **Download/copy** desired templates

### **Developer Path:**
1. **Clone repository**
2. **Modify [`styles/arctic-theme.css`](../styles/arctic-theme.css)** for global changes
3. **Edit individual files** in [`slides/`](../slides/) as needed
4. **Use [`scripts/generate-slides.js`](../scripts/generate-slides.js)** for automation

### **Quick Access Path:**
1. **Direct link** to specific slide (e.g., `slides/01-title-slide.html`)
2. **Immediate editing** and customization
3. **Copy content** to presentation software

## Design Principles

1. **Modular Architecture** - Each slide is independent but consistent
2. **Single Source of Truth** - All styling controlled by master CSS
3. **Easy Maintenance** - Clear file organization and naming
4. **Scalable Structure** - Easy to add new slide types
5. **Professional Standards** - Government/business presentation ready
6. **Minimal Complexity** - No unnecessary navigation layers

## Development Workflow

1. **Modify Existing Slides** - Edit individual files in `slides/`
2. **Add New Slide Types** - Create new files following naming convention
3. **Update Global Styling** - Modify `styles/arctic-theme.css` for universal changes
4. **Generate Slides** - Use `scripts/generate-slides.js` for batch creation
5. **Preview Changes** - Use `all-slides.html` for comprehensive overview
6. **Update Documentation** - Keep README.md and guides current

## File Naming Conventions

### Slides
- **Format:** `##-descriptive-name.html`
- **Examples:** `01-title-slide.html`, `18-swot-analysis.html`
- **Numbers:** Zero-padded for proper sorting
- **Names:** Lowercase with hyphens

### Documentation
- **UPPERCASE.md** - Major documentation files
- **lowercase.html** - Template and viewer files
- **kebab-case** - Multi-word filenames

## Quality Standards

- **Consistent Structure** - All slides follow the same HTML pattern
- **Presentation Ready** - 1920x1080 dimensions, readable fonts
- **Professional Design** - Arctic color scheme appropriate for all audiences
- **Clean Code** - Well-formatted, commented, maintainable
- **Cross-Platform** - Works in all modern browsers

---

**Maintained by:** TundraTough-hub  
**Last Updated:** June 21, 2025  
**Structure Version:** 2.0 (Simplified)