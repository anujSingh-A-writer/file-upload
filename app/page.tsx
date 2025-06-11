import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <article className="flex flex-col items-center justify-center min-h-screen p-4">
      <Link href="/login" className="mb-4">
        <Button>
          Login
        </Button>
      </Link>
    </article>
  );
}
