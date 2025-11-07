import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['300'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Service Cost Estimate - Gross Domestic Potables",
  description: "Calculate estimated event bar costs for your organization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
