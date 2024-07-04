import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/components/providers/ToastProvider";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin | Dashboard",
  description: "Welcome to the Oragnic Admin page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="mt-[8vh] m-auto md:pl-[300px] flex">
            <Sidebar />
            {children}
          </main>
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
