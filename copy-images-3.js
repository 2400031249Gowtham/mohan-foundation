const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/shann/.gemini/antigravity-ide/brain/8d4db07f-bb62-434f-be14-1b1bd5cd4468';
const destDir = path.join(__dirname, 'public', 'courses-official');

const fileMapping = [
  { src: 'media__1781702326200.png', dest: 'course-7.jpg' }, // Brain with electric effect -> Course 7
  { src: 'media__1781702430515.jpg', dest: 'course-8.jpg' }, // Medical blocks -> Course 8
  { src: 'media__1781702316719.jpg', dest: 'course-6.jpg' }  // Classroom image -> Course 6
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
