import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const blueWinter = localFont({
  src: "../public/font/BlueWinter.otf",
  variable: "--font-blue-winter",
});

export const metadata: Metadata = {
  title: "Dogby",
  description: "The Squishiest Token",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Dogby",
    description: "The Squishiest Token",
    images: ["/open.jpg"],
  },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${blueWinter.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
