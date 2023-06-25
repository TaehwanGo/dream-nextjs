import Navbar from "@/components/Navbar";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Instagram",
  description: "Instagram",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full max-w-screen-xl mx-auto overflow-auto">
        <header className="sticky top-0 z-10 bg-white border-b">
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
