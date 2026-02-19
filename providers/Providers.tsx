"use client";

import { PostsProvider } from "@/context/posts-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <PostsProvider>{children}</PostsProvider>;
}
