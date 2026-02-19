import React from "react";
import PostCard from "./PostCard";
import type { Post } from "@/types/post";

type Props = {
  posts: Post[];
};

const PostCardList = ({ posts }: Props) => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {posts.map(({ id, title, summary, date }) => (
        <PostCard
          key={id}
          id={id}
          title={title}
          summary={summary}
          date={date}
        />
      ))}
    </div>
  );
};

export default PostCardList;
