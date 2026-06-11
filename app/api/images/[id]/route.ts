import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const map: Record<string, string> = {
    '1': "C:/Users/gowth/.gemini/antigravity-ide/brain/768f1cae-c71c-4019-b427-0793e5ecd3ad/hero_carousel_1_heart_1781179321775.png",
    '2': "C:/Users/gowth/.gemini/antigravity-ide/brain/768f1cae-c71c-4019-b427-0793e5ecd3ad/hero_carousel_2_doctors_1781179350679.png",
    '3': "C:/Users/gowth/.gemini/antigravity-ide/brain/768f1cae-c71c-4019-b427-0793e5ecd3ad/hero_carousel_3_connection_1781179365039.png",
    '4': "C:/Users/gowth/.gemini/antigravity-ide/brain/768f1cae-c71c-4019-b427-0793e5ecd3ad/hero_carousel_4_hope_1781179377034.png"
  };

  const file = map[id];
  if (!file || !fs.existsSync(file)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const buffer = fs.readFileSync(file);
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    }
  });
}
