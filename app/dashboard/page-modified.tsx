"use client";

import React, { useEffect, useState } from "react";
import { PencilIcon, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { deleteJob, updatejob as updateJob } from "@/lib";
import { useUser } from "../utils/UserContext";

export default function Home() {
  const { user, allJobs, setAllJobs } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [myJobs, setMyJobs] = useState<any[]>([]);
  const [otherJobs, setOtherJobs] = useState<any[]>([]);

  // Update jobs and filter them whenever `allJobs` or `user` changes
  useEffect(() => {
    if (!user) {
      setMyJobs([]);
      setOtherJobs(allJobs || []);
      return;
    }

    setMyJobs(allJobs.filter((job) => job.email === user.email));
    setOtherJobs(allJobs.filter((job) => job.email !== user.email));
  }, [allJobs, user]);

  // Filtered jobs based on search term
  const filteredMyJobs = myJobs.filter((job) =>
    [job.title, job.description, job.experienceLevel]
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredOtherJobs = otherJobs.filter((job) =>
    [job.title, job.description, job.experienceLevel]
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
                <Input
                  placeholder="Job title or keyword"
                  className="flex-1"
                  value={searchTerm}
                  onChange={handleSearch}
                />
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
      <div className="container p-10">
        <h2 className="text-2xl font-semibold mb-6">My Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredMyJobs.length > 0 ? (
            filteredMyJobs.map((job, index) => (
              <Card key={index} className="border rounded-lg shadow-md relative">
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

        <h2 className="text-2xl font-semibold mb-6">Other Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOtherJobs.length > 0 ? (
            filteredOtherJobs.map((job, index) => (
              <Card key={index} className="border rounded-lg shadow-md relative">
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
