import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import MainContainer from "@/components/MainContainer/MainContainer";
import { Providers } from "@/components/Providers";

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
        <Providers>
        <Header></Header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
