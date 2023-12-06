import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import MainContainer from "@/components/MainContainer/MainContainer";

export const metadata: Metadata = {
  title: "Search restaurant",
  description: "Select your restaurants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
          {children}
      </body>
    </html>
  );
}
