"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { usePosts } from "@/context/posts-context";
import EditPostModal from "@/components/post/EditPostModal";
import DeletePostModal from "@/components/post/DeletePostModal";
import { formatDate } from "@/lib/helpers";

export default function PostPage() {
  const params = useParams();
  const id = Number(params.id);
  const { getPost } = usePosts();
  const post = getPost(id);

  if (!post) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Post not found.</p>
      </div>
    );
  }

  return (
    <article className="flex min-w-0 flex-col gap-6">
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-muted">
        <Image
          src="/vercel.svg"
          alt="Cover Image"
          className="object-contain brightness-60 grayscale dark:brightness-40"
          width={320}
          height={320}
        />
      </div>
      <header className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-sm text-muted-foreground">
              Author: <span className="font-bold">{post.author}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Author Email:{" "}
              <span className="font-bold">{post.authorEmail}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Date published:{" "}
              <span className="font-bold">{formatDate(post.date)}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <EditPostModal postId={post.id} />
            <DeletePostModal postId={post.id} />
          </div>
        </div>
      </header>
      <div className="prose prose-neutral dark:prose-invert max-w-none min-w-0 wrap-break-word whitespace-pre-wrap">
        {post.text}
      </div>
    </article>
  );
}
