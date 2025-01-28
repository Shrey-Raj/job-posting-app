"use server"
import { NextResponse } from "next/server";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL; 
// const SERVER_BASE_URL = "http://localhost:4000"; 

export const apiCall = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(SERVER_BASE_URL + url, options);

    // console.log("SERVER BASE URL = " , SERVER_BASE_URL) ; 

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "Something went wrong.",
          data: null,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(
      {
        success: true,
        message: "Request successful.",
        data,
      },
      { status: res.status }
    );
  } catch (error: any) {
    console.error("API call error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An unexpected error occurred.",
        data: null,
      },
      { status: 500 }
    );
  }
};
