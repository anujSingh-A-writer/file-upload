import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Page",
  description: "This is the upload page of the application.",
};

export default function UploadPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (children);
}