import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground flex items-center"
      >
        <ArrowLeftIcon className="w-4 h-4" /> <span>Back to posts</span>
      </Link>
      {children}
    </div>
  );
}
