import { apiCall } from "@/app/utils/utils";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const response = await apiCall(`/api/v1/job/getalljobs`, {
      method: "GET",
    });

    const jobs = await response.json();

    return NextResponse.json(jobs); // Return the jobs data
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
