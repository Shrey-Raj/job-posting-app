"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchAllJobs, getSession } from "@/lib";

interface User {
  createdAt: string;
  email: string;
  emailverified: boolean;
  phoneverified: boolean;
  updatedAt: string;
  username: string;
  verificationToken: string;
  verificationTokenExpires: Date;
  __v: number;
  _id: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  experienceLevel: string;
  endDate: string;
  email: string;
}

interface UserContextType {
  user: User | null; 
  setUser: (user: User | null) => void; 
  isLoading: boolean; 
  allJobs: Job[]; 
  setAllJobs: (jobs: Job[]) => void; 
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
  allJobs: [],
  setAllJobs: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const pathname = usePathname(); 

  const fetchUser = async () => {
    try {
      const response = await getSession(); 
      console.log("USER = ", response);
      setUser(response); 
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null); 
    } finally {
      setIsLoading(false); 
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetchAllJobs();
      setAllJobs(response.data?.data?.data?.jobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setAllJobs([]); 
    }
  };

  useEffect(() => {
    fetchUser();
    fetchJobs();
  }, [pathname]);


  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, allJobs, setAllJobs }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
