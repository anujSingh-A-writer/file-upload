import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Files Page",
    description: "This is the files page of the application.",
};

export default function FilesPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (children);
}