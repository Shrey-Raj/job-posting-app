"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createJob } from "@/lib"
import { toast } from "react-toastify"

export function JobPostingDialog() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await createJob(title, description, experienceLevel, endDate)

    console.log(title, description, experienceLevel, endDate); 

    console.log(result); 

    if(result.success){
      toast.success("Job created Successfully");
    }else {
      toast.error("Failed to create job. Please try again.");
    }

    setOpen(false)
  }

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
            <DialogDescription>Fill in the job details below to post a new position.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea id="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
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
              <Input id="candidates" placeholder="Enter email addresses separated by commas" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Post Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

