import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import type { PropsWithChildren } from "react";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "T-Rex Dinosaur Game",
  description: "Play the T-Rex Dinosaur Game",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="">
      <body className={`${roboto.className} antialiased dark:bg-dark-page`}>
        {children}
      </body>
    </html>
  );
}
