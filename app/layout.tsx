import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "My personal portfolio website built with Next.js",
  icons: {
    icon: "https://website-file-manager.b-cdn.net/Website%20Assets/Screenshot%202025-11-06%20at%2012.59.43%E2%80%AFPM.png",
    shortcut: "https://website-file-manager.b-cdn.net/Website%20Assets/Screenshot%202025-11-06%20at%2012.59.43%E2%80%AFPM.png",
    apple: "https://website-file-manager.b-cdn.net/Website%20Assets/Screenshot%202025-11-06%20at%2012.59.43%E2%80%AFPM.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

