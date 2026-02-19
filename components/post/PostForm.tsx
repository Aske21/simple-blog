"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { DatePicker } from "../ui/date-picker";

const postFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be at most 50 characters"),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(250, "Summary must be at most 250 characters"),
  text: z.string().min(1, "Text is required"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(40, "Author must be at most 40 characters"),
  authorEmail: z.string().email("Please enter a valid email address"),
  date: z.date({
    message: "Date is required",
  }),
});

export type PostFormValues = z.infer<typeof postFormSchema>;

interface PostFormProps {
  onSubmit: (data: PostFormValues) => void;
  defaultValues?: Partial<PostFormValues>;
  onCancel?: () => void;
}

const PostForm = ({ onSubmit, onCancel, defaultValues }: PostFormProps) => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field data-invalid={!!errors.title}>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          placeholder="Title"
          maxLength={50}
          aria-invalid={!!errors.title}
          {...register("title")}
        />
        {errors.title && <FieldError errors={[errors.title]} />}
      </Field>

      <Field data-invalid={!!errors.summary}>
        <FieldLabel htmlFor="summary">Summary</FieldLabel>
        <Textarea
          className="max-h-[120px] overflow-y-auto"
          id="summary"
          placeholder="Summary"
          aria-invalid={!!errors.summary}
          {...register("summary")}
        />
        {errors.summary && <FieldError errors={[errors.summary]} />}
      </Field>

      <Field data-invalid={!!errors.text}>
        <FieldLabel htmlFor="text">Text</FieldLabel>
        <Textarea
          className="max-h-[120px] overflow-y-auto"
          id="text"
          placeholder="Write your blog post here..."
          aria-invalid={!!errors.text}
          {...register("text")}
        />
        {errors.text && <FieldError errors={[errors.text]} />}
      </Field>

      <Field data-invalid={!!errors.author}>
        <FieldLabel htmlFor="author">Author</FieldLabel>
        <Input
          id="author"
          placeholder="Author name"
          maxLength={40}
          aria-invalid={!!errors.author}
          {...register("author")}
        />
        {errors.author && <FieldError errors={[errors.author]} />}
      </Field>

      <Field data-invalid={!!errors.authorEmail}>
        <FieldLabel htmlFor="authorEmail">Author’s Email</FieldLabel>
        <Input
          id="authorEmail"
          type="email"
          placeholder="Author email"
          autoComplete="email"
          aria-invalid={!!errors.authorEmail}
          {...register("authorEmail")}
        />
        {errors.authorEmail && <FieldError errors={[errors.authorEmail]} />}
      </Field>

      <Field data-invalid={!!errors.date}>
        <FieldLabel htmlFor="date">Date</FieldLabel>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker selected={field.value} onSelect={field.onChange} />
          )}
        />
        {errors.date && <FieldError errors={[errors.date]} />}
      </Field>

      <Field orientation="horizontal" className="gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </Field>
    </form>
  );
};

export default PostForm;
