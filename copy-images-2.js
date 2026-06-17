const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/shann/.gemini/antigravity-ide/brain/8d4db07f-bb62-434f-be14-1b1bd5cd4468';
const destDir = path.join(__dirname, 'public', 'courses-official');

const fileMapping = [
  { src: 'media__1781701071375.jpg', dest: 'course-3.jpg' }, // Puzzle pieces -> Course 3
  { src: 'media__1781701087438.jpg', dest: 'course-6.jpg' }  // Medical professionals -> Course 6
];

fileMapping.forEach(({ src, dest }) => {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} to ${dest}`);
  } else {
    console.error(`Missing file: ${srcPath}`);
  }
});
