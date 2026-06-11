import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const map: Record<string, string> = {
    '1': "hero_carousel_1_heart_1781179321775.png",
    '2': "hero_carousel_2_doctors_1781179350679.png",
    '3': "hero_carousel_3_connection_1781179365039.png",
    '4': "hero_carousel_4_hope_1781179377034.png"
  };

  const filename = map[id];
  if (!filename) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const file = path.join(process.cwd(), 'public', 'images', filename);
  
  if (!fs.existsSync(file)) {
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
