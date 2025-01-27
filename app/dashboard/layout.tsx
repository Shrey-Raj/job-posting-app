import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "../(components)/sidebar";
import { Header } from "../(components)/header";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Board",
  description: "Find Your Dream Job Here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
        <ToastContainer />
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
