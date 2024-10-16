import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Todo-List Drag n Drop",
  description:
    "Apps Todo-List Drag n Drop adalah solusi manajemen tugas yang intuitif dan interaktif, dirancang untuk membantu pengguna mengorganisir dan mengelola daftar tugas mereka dengan mudah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="./manifest.json" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
