import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A-to-z DSA",
  description: "A structured roadmap for mastering data structures and algorithms."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
