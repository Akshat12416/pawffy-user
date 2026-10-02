import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "The Pawffy — Care that feels like family", template: "%s · The Pawffy" },
  description: "A trusted place for pet parents to discover thoughtful, reliable pet care.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
