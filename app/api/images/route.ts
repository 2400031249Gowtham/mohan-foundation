import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  if (!name) return new NextResponse('Missing name', { status: 400 });

  const artifactDir = 'C:\\Users\\gowth\\.gemini\\antigravity-ide\\brain\\e70589f2-4911-4776-801b-f54efb1a204a';
  const filePath = path.join(artifactDir, name);
  
  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not found', { status: 404 });
  }
  
  const fileBuffer = fs.readFileSync(filePath);
  return new NextResponse(fileBuffer, {
    headers: { 'Content-Type': 'image/png' },
  });
}
