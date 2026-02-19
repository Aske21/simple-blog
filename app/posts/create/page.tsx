"use client";

import { useRouter } from "next/navigation";
import PostForm from "@/components/post/PostForm";
import type { PostFormValues } from "@/components/post/PostForm";
import { usePosts } from "@/context/posts-context";

export default function CreatePostPage() {
  const router = useRouter();
  const { createPost } = usePosts();

  const handleSubmit = (data: PostFormValues) => {
    const newPost = createPost(data);
    router.push(`/posts/${newPost.id}`);
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Create Post</h1>
      <PostForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}
