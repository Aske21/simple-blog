"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Post } from "@/types/post";
import type { PostFormValues } from "@/components/post/PostForm";
import { seedPosts } from "@/constants/posts";

type PostsContextValue = {
  posts: Post[];
  getPost: (id: number) => Post | undefined;
  createPost: (data: PostFormValues) => Post;
  updatePost: (id: number, data: Partial<PostFormValues>) => void;
  deletePost: (id: number) => void;
};

const PostsContext = createContext<PostsContextValue | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(seedPosts);

  const getPost = useCallback(
    (id: number) => posts.find((p) => p.id === id),
    [posts],
  );

  const createPost = useCallback((data: PostFormValues): Post => {
    const newPost: Post = {
      id: Math.floor(Math.random() * 1000000),
      ...data,
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  }, []);

  const updatePost = useCallback(
    (id: number, data: Partial<PostFormValues>) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p)),
      );
    },
    [],
  );

  const deletePost = useCallback((id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value: PostsContextValue = {
    posts,
    getPost,
    createPost,
    updatePost,
    deletePost,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export function usePosts(): PostsContextValue {
  const ctx = useContext(PostsContext);
  if (!ctx) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return ctx;
}
