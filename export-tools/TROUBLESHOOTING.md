# 🔧 Troubleshooting Guide - Arctic Background Exporter

## ❌ **Issue Fixed: Dependency Conflicts**

If you encountered the error about puppeteer version conflicts, here's the **simple solution**:

## 🚀 **Quick Fix - Use the New Simplified Script**

Instead of the original setup, use the fixed version:

```bash
# 1. Use the fixed setup script
node setup-fixed.js

# 2. Run the simplified exporter (works without fs-extra)
node export-simple-fixed.js
```

## 📋 **Step-by-Step Solution**

### **Windows (Your System):**

1. **Open PowerShell in the export-tools folder**
2. **Run the fixed setup:**
   ```powershell
   node setup-fixed.js
   ```
3. **If setup succeeds, export backgrounds:**
   ```powershell
   node export-simple-fixed.js
   ```
4. **Alternative: Use the quick-start batch file:**
   ```powershell
   ./quick-start.bat
   ```

### **If You Still Get "Module Not Found" Errors:**

**Manual Installation (Most Reliable):**
```bash
# Install exact compatible versions
npm install puppeteer@19.0.0 puppeteer-screen-recorder@3.0.6

# Then run the exporter
node export-simple-fixed.js
```

## 🎯 **What the Fixed Version Does Differently**

1. **✅ Uses compatible puppeteer version (19.0.0)** - No more version conflicts
2. **✅ No fs-extra dependency** - Uses built-in Node.js `fs` module
3. **✅ No timecut dependency** - Uses simpler puppeteer-screen-recorder only
4. **✅ Better error handling** - Clear messages if something fails
5. **✅ Works with Node.js 18.12.1** - Your exact version

## 🔍 **Common Error Solutions**

### **Error: "ERESOLVE unable to resolve dependency tree"**
**Solution:** Use the fixed package.json with compatible versions
```bash
node setup-fixed.js
```

### **Error: "Cannot find module 'fs-extra'"**
**Solution:** The new script doesn't use fs-extra
```bash
node export-simple-fixed.js
```

### **Error: "Cannot find module 'puppeteer'"**
**Solution:** Install the specific version manually
```bash
npm install puppeteer@19.0.0 puppeteer-screen-recorder@3.0.6
```

### **Error: "Chrome not found" or "Browser launch failed"**
**Solutions:**
- Update Chrome/Edge browser
- Run PowerShell as Administrator
- Add `--no-sandbox` flag (already included in fixed script)

## 📁 **Expected Output**

After running `node export-simple-fixed.js`, you should get:

```
📁 mp4-backgrounds/
├── title-slide-background.mp4          (3-5 MB)
├── section-divider-background.mp4      (3-5 MB)  
├── data-insights-background.mp4        (3-5 MB)
├── content-slide-background.mp4        (3-5 MB)
└── BACKGROUND_USAGE_GUIDE.md
```

## ⚡ **Ultra-Simple Alternative**

If everything still fails, here's a **no-install** solution:

1. **Just run any browser** (Chrome, Edge, Firefox)
2. **Open the HTML files** from `temp-backgrounds/` folder
3. **Use built-in screen recording:**
   - **Windows:** Win + G (Xbox Game Bar)
   - **Mac:** Cmd + Shift + 5
   - **Online:** https://screenrecorder.io/

## 🎬 **Manual Screen Recording Steps**

1. Open `temp-backgrounds/title-slide.html` in browser
2. Press **F11** for fullscreen
3. Start screen recording
4. Record for 10 seconds
5. Save as `title-slide-background.mp4`
6. Repeat for other backgrounds

## 💡 **Pro Tips for Success**

- **Close other apps** before recording for better performance
- **Ensure stable internet** for Chromium download
- **Run as Administrator** if on Windows corporate network
- **Disable antivirus temporarily** if it blocks puppeteer

## 🆘 **Still Having Issues?**

### **Option 1: GitHub Issue**
Create an issue at: https://github.com/TundraTough-hub/arctic-presentation-template/issues

### **Option 2: Pre-made Backgrounds**
I can provide pre-exported MP4 files if the scripts don't work on your system.

### **Option 3: Cloud Export**
Use online tools like:
- https://html2video.com
- https://htmlcsstoimage.com
- Copy the HTML from `temp-backgrounds/` and upload

## 📞 **Contact Information**

For urgent presentation needs or custom backgrounds:
- **Repository:** https://github.com/TundraTough-hub/arctic-presentation-template
- **Issues:** Report technical problems on GitHub
- **Direct Support:** Create a GitHub issue with your error messages

---

## 🎯 **Bottom Line**

**The fixed script (`export-simple-fixed.js`) should work on your Windows system with Node.js 18.12.1.** 

If it doesn't, the manual screen recording method will definitely work as a backup!

*Last updated: June 2025*