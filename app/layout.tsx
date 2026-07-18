import type { Metadata } from "next";
import { IBM_Plex_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Health Emergency Response Portal",
  description:
    "Rapid access to emergency contacts, nearby healthcare facilities, and critical medical information when every second counts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSerif.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#0a0e1a] text-white">
        <Header />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
