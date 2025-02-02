"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchAllJobs, getSession } from "@/lib";

// Define the User type based on your API response
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

// Define the Job type based on your API response
interface Job {
  _id: string;
  title: string;
  description: string;
  experienceLevel: string;
  endDate: string;
  email: string;
}

// Define the context type
interface UserContextType {
  user: User | null; // The current user object or null if not logged in
  setUser: (user: User | null) => void; // Function to update the user
  isLoading: boolean; // Loading state while fetching user data
  allJobs: Job[]; // Array of all jobs fetched from the API
  setAllJobs: (jobs: Job[]) => void; // Function to update the jobs array
}

// Create the context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
  allJobs: [],
  setAllJobs: () => {},
});

// UserProvider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // State for user data
  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [allJobs, setAllJobs] = useState<Job[]>([]); // State for all jobs
  const pathname = usePathname(); // Get the current pathname for route-based logic

  // Fetch user data
  const fetchUser = async () => {
    try {
      const response = await getSession(); // Fetch session data
      console.log("USER = ", response);
      setUser(response); // Set the user data in state
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null); // Reset user state on error
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Fetch all jobs from the API
  const fetchJobs = async () => {
    try {
      const response = await fetchAllJobs(); // Fetch all jobs
      setAllJobs(response.data?.data?.data?.jobs); // Set the jobs array in state
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setAllJobs([]); // Reset jobs array on error
    }
  };

  // Fetch user and jobs on component mount or pathname change
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

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
