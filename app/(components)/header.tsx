"use client";

import React, { useState, useEffect } from "react";
import { Bell, GithubIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getSession } from "@/lib";
import { useUser } from "../utils/UserContext";

export function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, allJobs } = useUser();


  return (
    <>
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-full" />
            <span className="font-semibold">Job Board</span>
          </Link>
          <nav className="flex-1 flex items-center gap-6 text-sm">
            <Link href="https://github.com/Shrey-Raj/job-posting-app" className="text-foreground/60 hover:text-foreground">
              <GithubIcon />
            </Link>
          </nav>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
            <AvatarImage src="https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>View and update your details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Name</label>
              <Input value={user?.username || "John Doe"} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Email</label>
              <Input value={user?.email || "johndoe@example.com"} readOnly />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
