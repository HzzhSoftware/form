import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "Forms - Collect information easily",
  description: "Forms is a simple way to collect and manage information from your users",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_CDN_URL}/favicon.ico`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href={`${process.env.NEXT_PUBLIC_CDN_URL}/globals.css`}
        />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
