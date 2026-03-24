import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GOOGLE_GENERATIVE_AI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const { image } = await request.json();
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Extract the following information from this image/document:
1. Full name
2. Email address (if visible)
3. Phone number (if visible)
4. Date of birth (if visible)
5. Address (if visible)
6. Postal code (if visible)
7. City (if visible)
8. BSN/ID number (if visible)

Return the response in JSON format with keys: name, email, phone, birth_date, address, postal_code, city, bsn
Only include fields that are clearly visible. For missing fields, return empty strings.`;

    const response = await model.generateContent([
      {
        inlineData: {
          data: image,
          mimeType: 'image/jpeg',
        },
      },
      prompt,
    ]);

    const text = response.response.text();
    
    // Extract JSON from response (might be wrapped in markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const extracted = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return NextResponse.json(extracted);
  } catch (error) {
    console.error('Photo extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to extract photo data' },
      { status: 500 }
    );
  }
}
