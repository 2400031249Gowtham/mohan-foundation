const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\gowth\\.gemini\\antigravity-ide\\brain\\e70589f2-4911-4776-801b-f54efb1a204a';
const destDir = 'd:\\Projexts\\mohan-foundation-temp-third\\public\\images';

const files = [
  { src: 'hero_slide_1_heart_1781631245625.png', dest: 'hero_slide_1.png' },
  { src: 'hero_slide_2_coordinator_1781631259035.png', dest: 'hero_slide_2.png' },
  { src: 'hero_slide_3_counselling_1781631272935.png', dest: 'hero_slide_3.png' },
  { src: 'hero_slide_4_law_1781631299123.png', dest: 'hero_slide_4.png' },
  { src: 'hero_slide_5_brain_1781631311160.png', dest: 'hero_slide_5.png' }
];

files.forEach(f => {
  try {
    fs.copyFileSync(path.join(srcDir, f.src), path.join(destDir, f.dest));
    console.log(`Copied ${f.src}`);
  } catch (err) {
    console.error(`Failed to copy ${f.src}:`, err);
  }
});
