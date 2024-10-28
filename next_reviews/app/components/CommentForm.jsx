// components/CommentForm.jsx

'use client';
import { useFormState } from '@/lib/hooks';
//import { useState } from 'react';
import { createCommentAction } from '@/reviews/actions';

export default function CommentForm({ slug, title }) {
  //const [state, setState] = useState({ loading: false, error: null });
  const [state, handleSubmit] = useFormState(createCommentAction);

  return (
    <form onSubmit={handleSubmit}
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded">
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <input type="hidden" name="slug" value={slug} />
      <div className="flex">
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <input id="userField" name="user"
          className="border px-2 py-1 rounded w-48"
        />
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="shrink-0 w-32">
          Your comment
        </label>
        <textarea id="messageField" name="message"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      {Boolean(state.error) && (
        <p className="text-red-700">{state.error.message}</p>
      )}
      <button type="submit" disabled={state.loading}
        className="bg-orange-800 rounded px-2 py-1 self-center
                   text-slate-50 w-32 hover:bg-orange-700
                   disabled:bg-slate-500 disabled:cursor-not-allowed">
         {state.loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}