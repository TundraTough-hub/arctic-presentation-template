# Customization Guide - Arctic Presentation Template

Detailed instructions for customizing the Arctic Presentation Template to match your organization's branding and needs.

## 🎨 Brand Customization

### Organization Identity

#### 1. Replace Organization Name
Find and replace all instances of `[Organization Name]` throughout the template:

**In slide headers:**
```html
<h1 class="slide-title">[Organization Name]</h1>
```

**In slide footers:**
```html
<span>Confidential - [Organization Name]</span>
```

**Quick replacement:** Use your text editor's Find & Replace function to update all instances at once.

#### 2. Add Your Logo

**Simple logo replacement:**
```html
<!-- Replace this: -->
<div class="logo-space">LOGO</div>

<!-- With this: -->
<div class="logo-space">
    <img src="assets/your-logo.png" alt="Organization Logo" 
         style="max-width: 100%; max-height: 100%; object-fit: contain;">
</div>
```

**Advanced logo styling:**
```css
.logo-space img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1); /* Makes logo white for dark headers */
}
```

## 🌈 Color Scheme Customization

### Arctic Color Variants

#### Warmer Arctic (Brown/Tan)
```css
/* Replace these colors: */
#1e3a5f → #3d2914  /* Deep Brown */
#2d5a87 → #5c4033  /* Medium Brown */
#f1f5f9 → #f7f3ef  /* Warm White */
#94a3b8 → #a69080  /* Tan */
#64748b → #6b5b47  /* Dark Tan */
```

#### Cool Arctic (Blue-Gray)
```css
/* Replace these colors: */
#1e3a5f → #1e3a3a  /* Teal Blue */
#2d5a87 → #2d5a5a  /* Medium Teal */
#f1f5f9 → #f1f7f7  /* Cool White */
#94a3b8 → #94b3b3  /* Light Teal */
#64748b → #64807f  /* Medium Gray-Teal */
```

#### Forest Arctic (Green)
```css
/* Replace these colors: */
#1e3a5f → #1e3a2e  /* Forest Green */
#2d5a87 → #2d5a47  /* Medium Green */
#f1f5f9 → #f1f7f4  /* Light Green */
#94a3b8 → #94b3a3  /* Sage Green */
#64748b → #64806b  /* Medium Green-Gray */
```

### Federal Agency Colors

#### U.S. Government Standard
```css
/* Official Government Colors */
#1e3a5f → #112e51  /* Official Blue */
#2d5a87 → #205493  /* Medium Blue */
#f1f5f9 → #f1f1f1  /* Light Gray */
#94a3b8 → #5b616b  /* Medium Gray */
#64748b → #323a45  /* Dark Gray */
```

### Tribal-Inspired Colors

#### Earth Tones
```css
/* Natural Earth Palette */
#1e3a5f → #4a3728  /* Rich Brown */
#2d5a87 → #8b4513  /* Saddle Brown */
#f1f5f9 → #faf6f0  /* Cream */
#94a3b8 → #cd853f  /* Peru */
#64748b → #a0522d  /* Sienna */
```

## 📝 Typography Customization

### Font Changes

#### System Fonts
```css
body {
    font-family: 'Arial', sans-serif; /* Simple and universal */
    /* or */
    font-family: 'Times New Roman', serif; /* Traditional and formal */
    /* or */
    font-family: 'Calibri', sans-serif; /* Modern and clean */
}
```

#### Government-Standard Fonts
```css
body {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}
```

### Font Size Adjustments

#### For Smaller Rooms/Screens
```css
.slide-title { font-size: 42px; }     /* Was 48px */
.main-title { font-size: 60px; }      /* Was 72px */
.bullet-list { font-size: 28px; }     /* Was 32px */
.column-header { font-size: 30px; }   /* Was 36px */
```

#### For Larger Auditoriums
```css
.slide-title { font-size: 54px; }     /* Was 48px */
.main-title { font-size: 84px; }      /* Was 72px */
.bullet-list { font-size: 36px; }     /* Was 32px */
.column-header { font-size: 42px; }   /* Was 36px */
```

## 📏 Layout Customization

### Slide Dimensions

#### 4:3 Aspect Ratio (Older Projectors)
```css
.slide {
    width: 1440px;  /* Was 1920px */
    height: 1080px; /* Remains the same */
}
```

#### Ultra-wide (21:9)
```css
.slide {
    width: 2560px;  /* Was 1920px */
    height: 1080px; /* Remains the same */
}
```

### Content Spacing

#### Tighter Spacing (More Content)
```css
.slide-content { padding: 40px; }     /* Was 60px */
.bullet-list li { margin-bottom: 20px; } /* Was 30px */
.two-column { gap: 40px; }            /* Was 60px */
.metrics-grid { gap: 30px; }          /* Was 45px */
```

#### Looser Spacing (Cleaner Look)
```css
.slide-content { padding: 80px; }     /* Was 60px */
.bullet-list li { margin-bottom: 40px; } /* Was 30px */
.two-column { gap: 80px; }            /* Was 60px */
.metrics-grid { gap: 60px; }          /* Was 45px */
```

## 🖼️ Visual Elements

### Custom Bullet Styles

#### Arrow Bullets (Current)
```css
.bullet-list li:before {
    content: "▶";
    color: #2d5a87;
}
```

#### Circle Bullets
```css
.bullet-list li:before {
    content: "●";
    color: #2d5a87;
}
```

#### Square Bullets
```css
.bullet-list li:before {
    content: "■";
    color: #2d5a87;
}
```

#### Custom Icon Bullets
```css
.bullet-list li:before {
    content: "🔹"; /* Diamond */
    /* or */
    content: "➤";  /* Arrow */
    /* or */
    content: "✓";  /* Checkmark */
}
```

### Border and Shadow Styles

#### Minimal Style (No Borders)
```css
.slide {
    border: none;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}
```

#### Bold Style (Thicker Borders)
```css
.slide {
    border: 5px solid #1e3a5f;
    box-shadow: 0 12px 48px rgba(30,58,95,0.25);
}
```

## 📊 Data Visualization Customization

### Chart Container Styling

#### Solid Background
```css
.chart-container {
    background: #ffffff;
    border: 2px solid #2d5a87;
    border-radius: 8px;
}
```

#### Gradient Background
```css
.chart-container {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    border: none;
    box-shadow: inset 0 2px 8px rgba(0,0,0,0.1);
}
```

### Table Styling

#### Striped Tables
```css
.data-table tr:nth-child(odd) {
    background: #ffffff;
}
.data-table tr:nth-child(even) {
    background: #f8fafc;
}
```

#### Minimal Tables
```css
.data-table {
    border: none;
}
.data-table th,
.data-table td {
    border: none;
    border-bottom: 1px solid #e2e8f0;
}
```

## 🎯 Slide-Specific Customization

### Title Slide Variations

#### Centered Layout
```css
.title-slide .slide-content {
    align-items: center;
    text-align: center;
}
```

#### Left-Aligned Layout
```css
.title-slide .slide-content {
    align-items: flex-start;
    text-align: left;
    padding-left: 120px;
}
```

### Contact Slide Layouts

#### Single Column
```css
.contact-grid {
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: 0 auto;
}
```

#### Four Columns
```css
.contact-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
}
```

## 🔧 Advanced Customization

### Adding Custom CSS Classes

#### Highlight Boxes
```css
.highlight-box {
    background: linear-gradient(135deg, #fef3cd, #fde68a);
    border: 2px solid #f59e0b;
    border-radius: 12px;
    padding: 30px;
    margin: 20px 0;
}
```

#### Warning Alerts
```css
.warning-box {
    background: linear-gradient(135deg, #fef2f2, #fecaca);
    border: 2px solid #ef4444;
    border-radius: 12px;
    padding: 30px;
    margin: 20px 0;
}
```

#### Success Indicators
```css
.success-box {
    background: linear-gradient(135deg, #f0fdf4, #bbf7d0);
    border: 2px solid #22c55e;
    border-radius: 12px;
    padding: 30px;
    margin: 20px 0;
}
```

### Custom Animations

#### Fade-in Effect
```css
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.slide-content {
    animation: fadeIn 0.6s ease-out;
}
```

#### Slide-in Effect
```css
@keyframes slideIn {
    from { transform: translateX(-50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.bullet-list li {
    animation: slideIn 0.4s ease-out;
    animation-fill-mode: both;
}

.bullet-list li:nth-child(1) { animation-delay: 0.1s; }
.bullet-list li:nth-child(2) { animation-delay: 0.2s; }
.bullet-list li:nth-child(3) { animation-delay: 0.3s; }
```

## 🎨 Creating Custom Slide Types

### Basic Structure Template
```html
<!-- Slide X: Your Custom Slide -->
<div class="slide">
    <div class="slide-header">
        <div>
            <h1 class="slide-title">Your Title</h1>
            <p class="slide-subtitle">Your Subtitle</p>
        </div>
        <div class="logo-space">LOGO</div>
    </div>
    <div class="slide-content">
        <!-- Your custom content here -->
    </div>
    <div class="slide-footer">
        <span>Confidential - [Organization Name]</span>
        <span class="slide-number">X</span>
    </div>
</div>
```

### Custom Grid Layouts

#### Four-Column Grid
```css
.four-column {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    height: 100%;
}
```

#### Mixed Layout (1/3 + 2/3)
```css
.mixed-layout {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 45px;
    height: 100%;
}
```

---

**Questions about customization?** Open an issue in this repository or check the USAGE.md guide for additional help.