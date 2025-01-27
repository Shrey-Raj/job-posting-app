"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

import { fetchAllJobs } from "@/lib";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log("fetching all jobs"); 
        
        const response = await fetchAllJobs(); 
        console.log("DATA = " , response); 
        // setJobs(response);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      {/* Search Section */}
      <div className="relative">
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex flex-col items-center gap-4 py-20">
            <h1 className="text-4xl font-bold tracking-tight">
              Find Your Dream Employees Here
            </h1>
            <div className="flex w-full max-w-3xl gap-2">
              <div className="flex-1 flex gap-2">
                <Input placeholder="Job title or keyword" className="flex-1" />
                <Input placeholder="Add country or city" className="flex-1" />
              </div>
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="container py-10">
        <h2 className="text-2xl font-semibold mb-6">Available Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <Card key={index} className="border rounded-lg shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Ends on: {new Date(job.endDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{job.description}</p>
                  <p className="text-sm font-medium">
                    Experience Level: <span className="font-normal">{job.experienceLevel}</span>
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground">No jobs available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
