import { apiCall } from "@/app/utils/utils";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, username } = body;

    console.log(email , password , username) ;

    if (!email || !password || !username) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, password, and username are required.",
        },
        { status: 400 }
      );
    }
     const response = await apiCall(`/api/v1/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password , username}),
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
