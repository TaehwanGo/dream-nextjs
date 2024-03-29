import Navbar from "@/components/Navbar";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";
import { PORTAL_ID } from "@/constants/ids";
import { Metadata } from "next";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Instagram",
    template: "%s | Instagram",
  },
  description: "Instagram",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full overflow-auto bg-neutral-50">
        <AuthContext>
          <header className="sticky top-0 z-10 bg-white border-b">
            <div className="max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>
          <main className="flex justify-center w-full max-w-screen-xl mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id={PORTAL_ID} />
      </body>
    </html>
  );
}
