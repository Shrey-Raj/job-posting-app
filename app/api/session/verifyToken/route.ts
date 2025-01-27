import { NextResponse , NextRequest } from "next/server";
import { apiCall } from "../../../utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    const response = await apiCall(`/api/v1/session/verifyToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
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
