import { apiCall } from "@/app/utils/utils";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, experienceLevel, endDate } = body;

    if (!title || !description || !experienceLevel || !endDate) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const response = await apiCall(`/api/v1/job/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, experienceLevel, endDate }),
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
