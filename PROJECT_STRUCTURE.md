# Arctic Presentation Template - Project Structure

## Current File Organization

This document outlines the clean, organized structure of the Arctic Presentation Template project.

## Directory Structure

```
arctic-presentation-template/
├── index.html                 # Master controller and navigation hub
├── all-slides.html           # View all slides in one scrollable page
├── styles/
│   └── arctic-theme.css      # Master stylesheet for all slides
├── slides/                   # Individual slide template files
│   ├── 01-title-slide.html
│   ├── 02-agenda.html
│   ├── 03-executive-summary.html
│   ├── 07-data-visualization.html
│   ├── 18-swot-analysis.html
│   ├── 25-thank-you.html
│   └── ... (25 total slides when complete)
├── scripts/
│   └── generate-slides.js    # Automated slide generation script
├── README.md                 # Main project documentation
├── USAGE.md                  # Detailed usage instructions
├── CUSTOMIZATION.md          # Advanced customization guide
└── PROJECT_STRUCTURE.md      # This file
```

## File Purposes

### Core Files
- **index.html** - Main entry point with navigation to all slide templates
- **all-slides.html** - Comprehensive viewer showing all slides in sequence
- **styles/arctic-theme.css** - Master stylesheet ensuring consistency

### Slide Templates (slides/)
Each file contains a single, focused slide template:
- Consistent HTML structure
- Links to master CSS file
- Ready for customization
- Proper presentation dimensions (1920x1080)

### Documentation
- **README.md** - Project overview and quick start
- **USAGE.md** - Step-by-step usage instructions
- **CUSTOMIZATION.md** - Advanced customization techniques

### Development Tools
- **scripts/generate-slides.js** - Automated template generation
- **PROJECT_STRUCTURE.md** - Project organization reference

## Removed Files

The following files were removed during project cleanup:
- `template.html` - Old monolithic template (replaced by modular system)
- `templates/` directory - Obsolete directory (replaced by `slides/`)

## Design Principles

1. **Modular Architecture** - Each slide is independent but consistent
2. **Single Source of Truth** - All styling controlled by master CSS
3. **Easy Maintenance** - Clear file organization and naming
4. **Scalable Structure** - Easy to add new slide types
5. **Professional Standards** - Government/business presentation ready

## Development Workflow

1. **Modify Existing Slides** - Edit individual files in `slides/`
2. **Add New Slide Types** - Create new files following naming convention
3. **Update Styling** - Modify `styles/arctic-theme.css` for global changes
4. **Generate Slides** - Use `scripts/generate-slides.js` for batch creation
5. **Test Changes** - Use `all-slides.html` for comprehensive preview

---

**Maintained by:** TundraTough-hub  
**Last Updated:** June 21, 2025