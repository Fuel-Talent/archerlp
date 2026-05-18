import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Archer — Autonomous SRE that lives in your infrastructure",
  description:
    "Archer.sre is an autonomous AI-powered SRE that triages incidents, isolates root causes, and resolves issues — entirely within your private cloud. Create a free account for instant sandbox access. A product of FuelWorks AI.",
  openGraph: {
    title: "Archer — Autonomous SRE",
    description:
      "Deploy an autonomous SRE inside your VPC. Cut MTTR by 60%. Free account for instant demo access. A product of FuelWorks AI.",
    type: "website",
  },
  metadataBase: new URL("https://archer.example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono@master/web/css/jetbrains-mono.css"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
