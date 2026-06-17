const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/shann/.gemini/antigravity-ide/brain/8d4db07f-bb62-434f-be14-1b1bd5cd4468';
const destDir = path.join(__dirname, 'public', 'courses-official');

const fileMapping = [
  { src: 'media__1781700300375.png', dest: 'course-5.jpg' },
  { src: 'media__1781700300465.png', dest: 'course-1.jpg' },
  { src: 'media__1781700300566.png', dest: 'course-4.jpg' },
  { src: 'media__1781700300645.jpg', dest: 'course-9.jpg' },
  { src: 'media__1781700300645.jpg', dest: 'course-13.jpg' },
  { src: 'media__1781700300693.png', dest: 'course-8.jpg' }
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
