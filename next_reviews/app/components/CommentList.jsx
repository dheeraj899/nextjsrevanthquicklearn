// components/CommentList.jsx
//import { UserCircleIcon } from '@heroicons/react/24/outline';
import { getComments } from '@/lib/comments';

//const comments = [
  //{ id: '1', user: 'Alice', message: 'Love this game!' },
  //{ id: '2', user: 'Bob', message: 'Ok but not really my genre' },
  //{ id: '3', user: 'Charlie', message: 'Can\'t stop playing it' },
//];

export default async function CommentList({ slug }) {
  const comments = await getComments(slug);
  if (comments.length === 0) {
    return <p className="italic mt-3">No comments yet.</p>;
  }
  return (
    <ul className="border mt-3 rounded">
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.user}: {comment.message}</p>
        </li>
      ))}
    </ul>
  );
}