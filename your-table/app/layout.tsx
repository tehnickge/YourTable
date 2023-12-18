import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";
import { Providers } from "@/components/Providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

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
          <AppRouterCacheProvider>
            <Header></Header>
            {children}
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
