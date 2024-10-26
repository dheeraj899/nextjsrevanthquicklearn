// components/CommentForm.jsx
//"use client";

import { useForm } from 'react-hook-form';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createComment } from '@/lib/comments';

export default function CommentForm({ slug, title }) {
  // Initialize useForm with validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(data) {
    'use server';
    if (!data.user) {
      return { isError: true, message: 'Name field is required' };
    }
    const comment = await createComment({
      slug,
      user: data.user,
      message: data.message,
    });

    console.log('created:', comment);
    revalidatePath(`/reviews/${slug}`);
    redirect(`/reviews/${slug}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded">
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <div className="flex">
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <input
          id="userField"
          {...register('user', { required: true, maxLength: 50 })}
          className="border px-2 py-1 rounded w-48"
        />
        {errors.user && <span className="text-red-500">Name is required</span>}
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="shrink-0 w-32">
          Your comment
        </label>
        <textarea
          id="messageField"
          {...register('message', { required: true, maxLength: 500 })}
          className="border px-2 py-1 rounded w-full"
        />
        {errors.message && <span className="text-red-500">Comment is required</span>}
      </div>
      <button type="submit" className="bg-orange-800 rounded px-2 py-1 self-center">Submit</button>
    </form>
  );
}
