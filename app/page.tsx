"use client";

import { usePosts } from "@/context/posts-context";
import PostCardList from "@/components/post/PostCardList";

export default function Home() {
  const { posts } = usePosts();
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
      <PostCardList posts={posts} />
    </div>
  );
}
