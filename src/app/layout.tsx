import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "../components/common";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: "Conexa Challenge",
  description: "Ssr. Frontend Developer (NextJS) | Matias Molina",
  icons: {
    icon: '/icon.png'
  }
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
        <div className="px-6 md:px-5 my-5">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
