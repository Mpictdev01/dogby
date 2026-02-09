import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const blueWinter = localFont({
  src: "../public/font/BlueWinter.otf",
  variable: "--font-blue-winter",
});

export const metadata: Metadata = {
	title: "DOGBY",
	description: "The Squishiest Pup in the Cosmos",
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "DOGBY",
		description: "The Squishiest Pup in the Cosmos",
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
