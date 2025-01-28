"use client";

import React, { useEffect, useState } from "react";
import { PencilIcon, Search, Trash2, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription} from "@/components/ui/dialog";
import { toast } from 'react-toastify';

import { deleteJob, fetchAllJobs, updatejob as updateJob } from "@/lib";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log("fetching all jobs"); 
        const response = await fetchAllJobs(); 
        console.log("DATA = " , response); 
        setJobs(response.data.data.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch jobs.");
      }
    };

    fetchJobs();
  },[]);

  const handleSearch = (e:any) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.experienceLevel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id:string)=>{
    try {
      const response = await deleteJob(id); 
      console.log("Job deleted successfully:", response);
      toast.success("Job deleted successfully.");
      // Update state to remove the deleted job
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job.");
    }
  }

  const handleEdit = (job: any) => {
    setSelectedJob(job);
  };

  const handleSave = async () => {
    try {
      if (selectedJob) {
        const response = await updateJob(selectedJob._id, {
          title: selectedJob.title,
          description: selectedJob.description,
          experienceLevel: selectedJob.experienceLevel,
          endDate: selectedJob.endDate,
        });
        console.log("Job updated successfully:", response);
        toast.success("Job updated successfully.");
        // Update state with the updated job
        setJobs(jobs.map(job => job._id === selectedJob._id ? selectedJob : job));
        setSelectedJob(null);
        
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job.");
    }
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
                <Input placeholder="Job title or keyword" className="flex-1" value={searchTerm} onChange={handleSearch} />
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
        <h2 className="text-2xl font-semibold mb-6">Available Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <Card key={index} className="border rounded-lg shadow-md relative">
                <div className="absolute flex  top-0 right-0 p-4 ">
                  <Trash2 onClick={()=>handleDelete(job._id)} className="h-3 w-3 text-red-500 cursor-pointer"/>
                    
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <PencilIcon onClick={()=>handleEdit(job)} className="text-slate-500 cursor-pointer h-3 w-3 ml-2" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Edit Job</DialogTitle>
                      <DialogDescription>
                        <Input placeholder="Job title" className="mb-2" value={selectedJob?.title} onChange={(e) => setSelectedJob({ ...selectedJob, title: e.target.value })} />
                        <Input placeholder="Job description" className="mb-2" value={selectedJob?.description} onChange={(e) => setSelectedJob({ ...selectedJob, description: e.target.value })} />
                        <Input placeholder="Experience Level" className="mb-2" value={selectedJob?.experienceLevel} onChange={(e) => setSelectedJob({ ...selectedJob, experienceLevel: e.target.value })} />
                        <Input  type="date" placeholder="End Date" className="mb-2" value={selectedJob?.endDate} onChange={(e) => setSelectedJob({ ...selectedJob, endDate: e.target.value })} />
                      </DialogDescription>
                      <Button onClick={handleSave}>Save</Button>
                      <Button onClick={() => setSelectedJob(null)}>Cancel</Button>
                    </DialogContent>
                  </Dialog>
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
