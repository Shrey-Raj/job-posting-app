import { NextResponse, NextRequest } from "next/server";
import { apiCall } from "../../utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const response = await apiCall(`/api/v1/verification/sendVerificationEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
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
