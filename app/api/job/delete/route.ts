import { apiCall } from "@/app/utils/utils";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    const response = await apiCall(`/api/v1/job/delete/${id}`, {
      method: "DELETE",
    });

    console.log("response = ", response);
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
