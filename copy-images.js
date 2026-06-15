const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\gowth\\.gemini\\antigravity-ide\\brain\\c0717346-8712-4a68-8cf0-9d290f77df70';
const destDir = path.join(__dirname, 'public', 'images', 'courses');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const filesToCopy = [
  { src: 'media__1781381419789.png', dest: 'transplant.png' },
  { src: 'media__1781381431126.png', dest: 'pg.png' },
  { src: 'media__1781381439208.png', dest: 'brainstem.png' },
  { src: 'media__1781381451335.png', dest: 'essential.png' },
  { src: 'media__1781381459841.png', dest: 'paramedical.png' },
  { src: 'media__1781378287220.jpg', dest: 'heart-dark.jpg' }
];

filesToCopy.forEach(({ src, dest }) => {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} to ${destPath}`);
  } else {
    console.log(`File not found: ${srcPath}`);
  }
});
