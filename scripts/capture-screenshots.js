const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const assetsDir = 'c:/Users/DELL/Downloads/frame-portfolio/frame-portfolio/product-assets/screenshots';
const previewDir = 'c:/Users/DELL/Downloads/frame-portfolio/frame-portfolio/product-assets/preview';

if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
if (!fs.existsSync(previewDir)) fs.mkdirSync(previewDir, { recursive: true });

const shots = [
  { name: '01-homepage.png', url: 'http://localhost:3000/', width: 1440, height: 900 },
  { name: '02-about.png', url: 'http://localhost:3000/about', width: 1440, height: 900 },
  { name: '03-work-projects.png', url: 'http://localhost:3000/work', width: 1440, height: 900 },
  { name: '04-case-study.png', url: 'http://localhost:3000/work/atlas-analytics', width: 1440, height: 900 },
  { name: '05-experience.png', url: 'http://localhost:3000/experience', width: 1440, height: 900 },
  { name: '06-blog.png', url: 'http://localhost:3000/blog', width: 1440, height: 900 },
  { name: '07-contact.png', url: 'http://localhost:3000/contact', width: 1440, height: 900 },
  { name: '08-customization-playground.png', url: 'http://localhost:3000/customization', width: 1440, height: 900 },
  { name: '09-style-guide.png', url: 'http://localhost:3000/style-guide', width: 1440, height: 900 },
  { name: '10-mobile-responsive.png', url: 'http://localhost:3000/', width: 390, height: 844 }
];

for (const shot of shots) {
  const dest = path.join(assetsDir, shot.name);
  console.log(`Capturing ${shot.name} (${shot.width}x${shot.height})...`);
  const cmd = `"${edgePath}" --headless=new --screenshot="${dest}" --window-size=${shot.width},${shot.height} --hide-scrollbars "${shot.url}"`;
  try {
    cp.execSync(cmd, { stdio: 'ignore', timeout: 20000 });
    console.log(`Captured: ${dest}`);
  } catch (e) {
    console.error(`Failed to capture ${shot.name}:`, e.message);
  }
}

// Copy social preview image
const ogSrc = 'c:/Users/DELL/Downloads/frame-portfolio/frame-portfolio/public/og-default.png';
const ogDest = path.join(previewDir, 'social-preview.png');
fs.copyFileSync(ogSrc, ogDest);
console.log('Social preview copied to:', ogDest);
