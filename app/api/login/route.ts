import { NextResponse , NextRequest } from "next/server";
import { apiCall } from "../../utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Simulating an external API call
    const response = await apiCall(`/api/v1/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return response;
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
