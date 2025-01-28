"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "@/lib";
import { toast } from "sonner"
import Loader from "./(components)/Loader";


export default function SessionValidator({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        
        const session = await getSession();
        
        const currentPath = pathname.split("/")[1];  
        if (session) {
          // If session is present, redirect from /login or /signup to /dashboard
          if (currentPath === "login" || currentPath === "signup") {
            router.push("/dashboard/");
         } else {
            setIsLoading(false);
          }
        } else {
          // If session is not present, allow access only to /login or /signup or /

          if (currentPath !== "login" && currentPath !== "signup" && currentPath!=="") {
            toast("Session not found. Login Again"); 
            router.push("/");
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        toast(
          "Failed to verify session. Please try again.",
        )
        router.push("/login");
      } finally {
        if (isLoading) {
          setIsLoading(false);
        }
      }
    };

    checkSession();

  }, [pathname, router]);

  if (isLoading) {
    return <div><Loader/></div>; 
  }

  // window.location.reload(); 

  return (
    <>
      {children}
    </>
  );
}
