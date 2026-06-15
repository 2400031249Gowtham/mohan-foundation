import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const srcDir = "C:\\Users\\gowth\\.gemini\\antigravity-ide\\brain\\c0717346-8712-4a68-8cf0-9d290f77df70";
    const destDir = path.join(process.cwd(), 'public', 'images', 'courses');

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const filesToCopy = [
      { src: 'media__1781381419789.png', dest: 'transplant.png' },
      { src: 'media__1781381431126.png', dest: 'pg.png' },
      { src: 'media__1781381439208.png', dest: 'brainstem.png' },
      { src: 'media__1781381451335.png', dest: 'essential.png' },
      { src: 'media__1781381459841.png', dest: 'paramedical.png' },
      { src: 'media__1781378287220.jpg', dest: '../heart-dark.jpg' },
      { src: 'cream_antigravity_heart_1781379519369.png', dest: '../heart-cream.png' }
    ];

    for (const file of filesToCopy) {
      const srcPath = path.join(srcDir, file.src);
      const destPath = path.join(destDir, file.dest);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }

    return NextResponse.json({ success: true, message: 'All images copied successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
