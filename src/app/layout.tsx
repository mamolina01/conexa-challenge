import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "./components/common";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: "Conexa Challenge",
  description: "Ssr. Frontend Developer (NextJS)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <div className=" w-10/12 mt-10 mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
