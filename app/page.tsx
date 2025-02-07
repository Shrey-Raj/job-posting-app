"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Download } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="p-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">Job Board.io</Link>
          <div className="hidden md:flex space-x-6">
            {/* <Link href="/top-job" className="text-gray-600">Top Job</Link>
            <Link href="/resume" className="text-gray-600">Resume</Link>
            <Link href="/event" className="text-gray-600">Event</Link> */}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost"><Link href='/login'>Log In</Link></Button>
          <Button variant="default" className="bg-black text-white hover:bg-gray-800">
            <Link href="/signup">Signup </Link>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex">
        <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">
          {/* Left Section */}
          <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-sm font-medium">Get Hired</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-4">
                The Quickest way<br />
                to <span className="relative">
                  Hire!
                  <span className="absolute -z-10 left-0 right-0 bottom-1 bg-orange-200 h-3"></span>
                </span>
              </h1>
              <p className="mt-6 text-gray-600 text-lg">
                We'll help you find Great Opportunities. Receive your<br />
                top new job matches directly in your inbox.
              </p>
            </div>

            <Link href="/login" className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button className="px-6 py-6 text-base">
                Join Our Platform
                <span className="ml-2">→</span>
              </Button>
            </Link>

            <div className="mt-12 flex items-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-bold text-xl">Many</p>
                <p className="text-sm text-gray-600">Candidates Placed In Top Companies</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 bg-slate-700 p-8 md:p-16 flex flex-col justify-center items-center">
            <div className="relative">
              <div className="flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-48 h-48">
                  <g stroke="white" strokeWidth="2" fill="none">
                    <path d="M20,50 L40,70 M60,30 L80,50" />
                  </g>
                </svg>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                <p className="text-4xl font-bold">2.5K+</p>
                <p className="text-xl">BRANDS</p>
              </div>
              <div className="absolute top-0 right-0 flex gap-2">
                {['G', 'in'].map((icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;