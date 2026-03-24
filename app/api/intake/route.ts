import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, currency, country, language, ...rest } = body;
    
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Prepare data for insertion
    const workerData = {
      name,
      email,
      phone,
      birth_date: rest.birth_date || null,
      address: rest.address || null,
      postal_code: rest.postal_code || null,
      city: rest.city || null,
      country: country || 'NL',
      bsn: rest.bsn || null,
      company: rest.company || null,
      cao_type: rest.cao_type || null,
      project_start: rest.project_start || null,
      project_end: rest.project_end || null,
      rate: rest.rate ? parseFloat(rest.rate) : null,
      currency: currency || 'EUR',
      language: language || 'nl',
    };

    // Insert into workers table
    const { data, error } = await supabase
      .from('workers')
      .insert([workerData])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Worker intake form submitted successfully',
      workerId: data?.[0]?.id,
    });
  } catch (error) {
    console.error('Intake API error:', error);
    return NextResponse.json(
      { error: 'Failed to process intake form' },
      { status: 500 }
    );
  }
}
