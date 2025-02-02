"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createJob, getSession, sendjobemail } from "@/lib";
import { toast } from "react-toastify";
import { useUser } from "../utils/UserContext";

export function JobPostingDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [endDate, setEndDate] = useState("");
  const [candidateEmails, setCandidateEmails] = useState("");
  const { user, allJobs, setAllJobs } = useUser();

  //create job
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createJob(
      title,
      description,
      experienceLevel,
      endDate,
      user?.email || ""
    );

    const arrayOfEmails = candidateEmails.split(",");

    console.log(title, description, experienceLevel, endDate);

    const job = result?.data?.data?.data?.job || null;

    if (job) {
      setAllJobs([...allJobs, job]);
    }

    if (result.success) {
      toast.success("Job created Successfully");
    } else {
      toast.error("Failed to create job. Please try again.");
    }

    setOpen(false);

    if (candidateEmails.length > 0) {
      const result = await sendjobemail(
        { title, description, experienceLevel, endDate },
        arrayOfEmails
      );
      if (result.success) {
        toast.success("Candidates have been notified successfully!");
      }
      console.log(arrayOfEmails);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Post Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Post a New Job</DialogTitle>
            <DialogDescription>
              Fill in the job details below to post a new position.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="candidates">Candidate Emails</Label>
              <Input
                id="candidates"
                placeholder="Enter email addresses separated by commas"
                onChange={(e) => {
                  setCandidateEmails(e.target.value);
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Post Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
