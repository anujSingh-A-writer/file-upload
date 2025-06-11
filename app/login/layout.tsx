import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
  description: "This is the login page of the application.",
};

export default function LoginPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (children);
}