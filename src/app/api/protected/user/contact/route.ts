import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { firstName, lastName, email, phone, message } = await request.json();

  try {
    const contact = await prisma.contact.create({
      data: { firstName, lastName, email, phone, message },
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}
