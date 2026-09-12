import {NextResponse, NextRequest} from 'next/server';

export default async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    try {
        const data = await req.json();
        // Process the data as needed
        return NextResponse.json({ message: 'Data received successfully', data });
    }
    catch (error) {
        return NextResponse.json(
          {
            message: 'Error processing data',
            error: error instanceof Error ? error.message : 'Unknown error',
          },
          { status: 400 },
        );
    }

    } else {
    }
}