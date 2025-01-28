"use client";

import { LogOut, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobPostingDialog } from "./job-posting-dialog";
import { getSession, logout, emailverify } from "@/lib";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export function Sidebar() {
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [user,setUser] = useState<any>(null); 

  const fetchUser = async () => {
    const response = await getSession();
    console.log("USER = ", response);

    setIsEmailVerified(response.emailverified);

    setUser(response);
    return response;
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logout();

      console.log("RESULT FOR LOGOUT", result);

      if (result && result.success) {
        toast.success("Logout Successful!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const EmailVerify = async () => {
    try {
      const result = await emailverify(user.email);
      if (result && result.success) {
        toast.success("Verification email sent successfully!");
        fetchUser();
      } else {
        toast.error("Verification email could not be sent.");
      }
    } catch (error) {
      console.error("Error during email verification:", error);
      toast.error("An error occurred during email verification.");
    }
  };

  return (
    <div className="w-64 border-r bg-background flex flex-col">
      <div className="p-4 flex-1">
        {!isEmailVerified && (
          <Button className="w-full mb-2" variant="outline" onClick={EmailVerify}>
            <Mail className="mr-2 h-4 w-4" />
            Verify Email
          </Button>
        )}
        <JobPostingDialog />
      </div>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
