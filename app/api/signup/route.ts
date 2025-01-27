import { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, username } = body; 

    if (!email || !password || !username) {
      return NextResponse.json(
        { success: false, message: "Email, password, and username are required." },
        { status: 400 }
      );
    }

    // Use email, password, and username for signup logic
    // Example: const user = await createUser({ email, password, username });

    return NextResponse.json(
      { success: true, message: "User signed up successfully." },
      { status: 201 }
    );

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error.",
      },
      { status: 500 }
    );
  }
}
