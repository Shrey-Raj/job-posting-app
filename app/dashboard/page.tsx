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
  const [jobs, setJobs] = useState<any[]>(allJobs || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [filteredMyJobs, setFilteredMyJobs] = useState<any[]>([]);
  const [filteredOtherJobs, setFilteredOtherJobs] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setJobs(allJobs || []);
  }, [allJobs]);

  useEffect(() => {
    const myJobs = allJobs.filter((item) => item.email === user?.email);
    const otherJobs = allJobs.filter((item) => item.email !== user?.email);

    const filteredMy = myJobs.filter((job) =>
      searchTerm
        ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.experienceLevel.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );
    setFilteredMyJobs(filteredMy);

    const filteredOther = otherJobs.filter((job) =>
      searchTerm
        ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.experienceLevel.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );
    setFilteredOtherJobs(filteredOther);
  }, [searchTerm, allJobs, user?.email]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id);
      toast.success("Job deleted successfully.");
      const updatedJobs = jobs.filter((job) => job._id !== id);
      setJobs(updatedJobs);
      setAllJobs(updatedJobs);
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job.");
    }
  };

  const handleEdit = (job: any) => {
    setSelectedJob({ ...job }); // Create a copy of the job object
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedJob) return;
    try {
      await updateJob(selectedJob._id, {
        title: selectedJob.title,
        description: selectedJob.description,
        experienceLevel: selectedJob.experienceLevel,
        endDate: selectedJob.endDate,
      });

      // Update the jobs state and allJobs with the edited job
      const updatedJobs = jobs.map((job) =>
        job._id === selectedJob._id ? { ...job, ...selectedJob } : job
      );
      setJobs(updatedJobs);
      setAllJobs(updatedJobs);

      toast.success("Job updated successfully.");
      setIsDialogOpen(false);
      setSelectedJob(null);
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job.");
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedJob(null);
  };

  const JobCard = ({ job }: { job: any }) => (
    <Card className="border rounded-lg shadow-md relative">
      <div className="absolute flex top-0 right-0 p-4">
        <Trash2
          onClick={() => handleDelete(job._id)}
          className="h-3 w-3 text-red-500 cursor-pointer"
        />
        <PencilIcon
          onClick={() => handleEdit(job)}
          className="text-slate-500 cursor-pointer h-3 w-3 ml-2"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Ends on: {new Date(job.endDate).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{job.description}</p>
        <p className="text-sm font-medium">
          Experience Level:{" "}
          <span className="font-normal">{job.experienceLevel}</span>
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col min-h-full">
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

      <div className="container p-10">
        <h2 className="text-2xl font-semibold mb-6">My Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredMyJobs.length > 0 ? (
            filteredMyJobs.map((job, index) => (
              <JobCard key={job._id || index} job={job} />
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No matching jobs found.
            </p>
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-6">Other Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOtherJobs.length > 0 ? (
            filteredOtherJobs.map((job, index) => (
              <JobCard key={job._id || index} job={job} />
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No matching jobs found.
            </p>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Edit Job</DialogTitle>
          <DialogDescription>
            <Input
              placeholder="Job title"
              className="mb-2"
              value={selectedJob?.title || ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  title: e.target.value,
                })
              }
            />
            <Input
              placeholder="Job description"
              className="mb-2"
              value={selectedJob?.description || ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  description: e.target.value,
                })
              }
            />
            <Input
              placeholder="Experience Level"
              className="mb-2"
              value={selectedJob?.experienceLevel || ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  experienceLevel: e.target.value,
                })
              }
            />
            <Input
              type="date"
              placeholder="End Date"
              className="mb-2"
              value={selectedJob?.endDate || ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  endDate: e.target.value,
                })
              }
            />
          </DialogDescription>
          <div className="flex justify-end gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}