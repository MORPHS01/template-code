import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Kaushan_Script } from "next/font/google";
import "./globals.css";
import Breadcrumbs from "@/components/breadcrumbs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Imported fonts; import from "next/font/google", add a "variable" to the const(variable has to come first), mirror that variable in the globals.css file, then add a "${font.variable}" to the body tag in layout.tsx.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: "400", 
  subsets: ["latin"], 
});

const kaushan_Script = Kaushan_Script({
  variable: "--font-kaushanScript", 
  weight: "400", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${kaushan_Script.variable} antialiased bg-slate-200 text-slate-900 px-[5%] py-7`}
      >
        <Breadcrumbs/>
        {children}
      </body>
    </html>
  );
}
