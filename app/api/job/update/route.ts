import { apiCall } from "@/app/utils/utils";
import { NextResponse, NextRequest } from "next/server";


export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    const body = await req.json(); 

    const { title, description, experienceLevel, endDate } = body ;

    const response = await apiCall(`/api/v1/job/update/${id}`, {
      method: "PUT",
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