const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const root = 'c:/Users/DELL/Downloads/frame-portfolio/frame-portfolio';
const stagingRoot = 'c:/Users/DELL/Downloads/frame-portfolio/staging';
const packageDir = path.join(stagingRoot, 'FRAME-Portfolio');
const zipPath = 'c:/Users/DELL/Downloads/frame-portfolio/FRAME-Portfolio-v1.0.0.zip';

// Clean staging
if (fs.existsSync(stagingRoot)) fs.rmSync(stagingRoot, { recursive: true, force: true });
fs.mkdirSync(packageDir, { recursive: true });

// Subdirectories
const sourceCodeDir = path.join(packageDir, 'source-code');
const docDir = path.join(packageDir, 'documentation');
const assetsDir = path.join(packageDir, 'product-assets');

fs.mkdirSync(sourceCodeDir, { recursive: true });
fs.mkdirSync(docDir, { recursive: true });
fs.mkdirSync(assetsDir, { recursive: true });

// Copy source-code
function copyDirFiltered(src, dest, ignoreList = []) {
  for (const item of fs.readdirSync(src, { withFileTypes: true })) {
    if (ignoreList.includes(item.name)) continue;
    const sPath = path.join(src, item.name);
    const dPath = path.join(dest, item.name);
    if (item.isDirectory()) {
      fs.mkdirSync(dPath, { recursive: true });
      copyDirFiltered(sPath, dPath, ignoreList);
    } else {
      fs.copyFileSync(sPath, dPath);
    }
  }
}

// 1. Copy source code items
copyDirFiltered(root, sourceCodeDir, [
  'node_modules',
  '.next',
  '.git',
  '.env.local',
  'staging',
  'product-assets',
  'scripts',
  'LICENSE_REVIEW.md',
  'RELEASE_AUDIT.md',
  'RELEASE_NOTES.md',
  'PRODUCT_DESCRIPTION.md'
]);

// 2. Copy documentation
const docFiles = [
  'README.md',
  'DOCUMENTATION.md',
  'CUSTOMIZATION.md',
  'DEPLOYMENT.md',
  'CONTACT-SETUP.md',
  'TROUBLESHOOTING.md',
  'LICENSE.md',
  'LICENSE_REVIEW.md',
  'CHANGELOG.md',
  'RELEASE_AUDIT.md',
  'RELEASE_NOTES.md'
];

for (const doc of docFiles) {
  const sPath = path.join(root, doc);
  if (fs.existsSync(sPath)) {
    fs.copyFileSync(sPath, path.join(docDir, doc));
  }
}

// 3. Copy product-assets
copyDirFiltered(path.join(root, 'product-assets'), assetsDir);

// 4. Copy top-level START-HERE.md and PRODUCT_DESCRIPTION.md
fs.copyFileSync(path.join(root, 'START-HERE.md'), path.join(packageDir, 'START-HERE.md'));
fs.copyFileSync(path.join(root, 'PRODUCT_DESCRIPTION.md'), path.join(packageDir, 'PRODUCT_DESCRIPTION.md'));

console.log('Staging prepared successfully at:', packageDir);

// 5. Create ZIP archive using PowerShell
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

console.log('Creating ZIP archive at:', zipPath);
const psCmd = `powershell -Command "Compress-Archive -Path '${packageDir}\\*' -DestinationPath '${zipPath}' -CompressionLevel Optimal -Force"`;
cp.execSync(psCmd, { stdio: 'inherit' });

const stats = fs.statSync(zipPath);
console.log('ZIP archive created successfully!');
console.log('File size:', (stats.size / (1024 * 1024)).toFixed(2), 'MB (' + stats.size + ' bytes)');
