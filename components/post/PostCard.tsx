"use client";

import React from "react";
import {
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  Card,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import { formatDate } from "@/lib/helpers";

type Props = {
  id: number;
  title: string;
  summary: string;
  date: Date;
};

const PostCard = ({ id, title, summary, date }: Props) => {
  return (
    <Card className="group relative flex h-full w-full flex-col pt-0">
      <div className="relative z-20 flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-muted">
        <Image
          src="vercel.svg"
          alt="Cover Image"
          className="object-contain brightness-60 grayscale dark:brightness-40"
          width={150}
          height={150}
        />
      </div>
      <div className="absolute top-2 right-2 z-40 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <EditPostModal postId={id} />
        <DeletePostModal postId={id} />
      </div>
      <CardHeader className="min-h-[120px]">
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{summary}</CardDescription>
        <CardDescription>{formatDate(date)}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <div className="flex w-full items-center justify-end gap-2">
          <CardAction>
            <Button className="w-full" asChild>
              <Link href={`/posts/${id}`}>Read More</Link>
            </Button>
          </CardAction>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
