import { NextResponse } from 'next/server';
import { professionalCourses, generalCourses } from '@/data/courses';

export async function GET() {
  return NextResponse.json([...professionalCourses, ...generalCourses]);
}
