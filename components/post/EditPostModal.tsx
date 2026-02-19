"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { EditIcon } from "lucide-react";
import PostForm from "./PostForm";
import type { PostFormValues } from "./PostForm";
import { usePosts } from "@/context/posts-context";

type Props = {
  postId: number;
};

export default function EditPostModal({ postId }: Props) {
  const [open, setOpen] = useState(false);
  const { getPost, updatePost } = usePosts();
  const post = getPost(postId);

  const handleSubmit = (data: PostFormValues) => {
    updatePost(postId, data);
    setOpen(false);
  };

  if (!post) return null;

  const defaultValues: PostFormValues = {
    title: post.title,
    summary: post.summary,
    text: post.text,
    author: post.author,
    authorEmail: post.authorEmail,
    date: post.date,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>Edit the post content here.</DialogDescription>
        </DialogHeader>
        <PostForm
          key={postId}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
