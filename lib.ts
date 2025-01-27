"use server";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { apiCall } from "@/app/utils/utils";

const APP_BASE_URL = "http://localhost:3000";

const session_signing_key = "oppenhomies";

const key = new TextEncoder().encode(session_signing_key);

export async function getSession() {
  const all_cookies = await cookies();
  const session = all_cookies.get("session")?.value;
  console.log("SESSION = ", session);

  if (!session) return null;
  return await decryptJWTToken(session);
}

export async function decryptJWTToken(token: any) {
  try {
    const response = await fetch(APP_BASE_URL + "/api/session/verifyToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} - ${response.statusText}`);
      throw new Error("Failed to verify token");
    }

    const result = await response.json();
    //   console.log("\n➡️ RESULT from decrypting jwt:", result);

    return result.data.data;
  } catch (error: any) {
    console.error("Error in decrypting token:", error.message);
    return null;
  }
}

export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h") // Set expiration time to 30 minutes
    .sign(key);
};

export async function logout() {
  try {
    const session = await getSession();

    if (!session) {
      console.error("No valid session found");
      return { success: false, message: "No valid session found" };
    }

    const cookieStore = await cookies();
    cookieStore.delete("session");
    return { success: true, message: "Logout Successful" };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "Logout Failed" };
  }
}

export const postLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(APP_BASE_URL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Parse the standardized response returned by the API
    const result = await response.json();

    const accessToken = result?.data?.data?.token;

    (await cookies()).set("session", accessToken, { httpOnly: true });

    return {
      success: result.success,
      message: result.message || "An unexpected error occurred.",
      data: result.data || null,
    };
  } catch (error: any) {
    console.error("Error in postLogin:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
      data: null,
    };
  }
};

export const emailverify = async (email: any) => {
  try {
    const response = await fetch(APP_BASE_URL + "/api/verifyemail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    return {
      success: result.success,
      message: result.message || "An unexpected error occurred.",
    };
  } catch (error: any) {
    console.error("Error in emailverify:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

export const createJob = async (
  title: string,
  description: string,
  experienceLevel: string,
  endDate: string
) => {
  try {
    const response = await fetch(APP_BASE_URL + "/api/job/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, experienceLevel, endDate }),
    });

    const result = await response.json();

    return {
      success: result.success,
      message: result.message || "An unexpected error occurred.",
    };
  } catch (error: any) {
    console.error("Error in emailverify:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

export const fetchAllJobs = async () => {
    try {
      const response = await fetch(APP_BASE_URL +'/api/job/getalljobs', {
        method: 'GET',
      });


      console.log("from all jobs , " , response); 
      return;
      const result = await response.json();
        return {
        success: result.success,
        message: result.message || "An unexpected error occurred.",
      };
    } catch (error: any) {
      console.error("Error in fetching jobs:", error);
      return {
        success: false,
        message: error.message || "An unexpected error occurred.",
      };
    }
  };