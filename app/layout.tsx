import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Variable } from "lucide-react";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner"
const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "BookWise is a book borrowing system management for university.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}>
        {children}

        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout