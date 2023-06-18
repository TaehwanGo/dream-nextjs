import Header from "@/components/Header";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | T_log",
    default: "Tony's Blog",
  },
  description: "프론트 개발자 토니의 블로그",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.className}>
      <body className="flex flex-col w-full mx-auto max-w-screen-2xl">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
