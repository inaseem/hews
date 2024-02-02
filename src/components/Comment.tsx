import { useState } from 'react';
import { GetStoryDetailsResponse } from '../api/types';
import { timeAgo } from '../utils';

interface CommentProps {
  data: GetStoryDetailsResponse;
}

const Comment = ({ data }: CommentProps) => {
  const [isReading, setIsReading] = useState(false);

  return (
    <div className="py-4 px-5">
      <div className="w-full">
        <div
          className="leading-relaxed whitespace-pre-line before:bg-gradient-to-b before:from-transparent before:to-white dark:before:to-gray-800 text-sm [&_a]:text-primary-600"
          dangerouslySetInnerHTML={{ __html: data.text || '' }}
        />
        <div className="flex justify-between mt-2">
          <div className="text-primary-700 dark:text-primary-600 font-semibold text-sm">
            <span className="opacity-90">{data.author}</span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-gray-500 text-xs font-medium">
              {timeAgo(data.created_at)}
            </span>
          </div>
          {data.children.length > 0 && (
            <button
              onClick={() => setIsReading((prev) => !prev)}
              className="border-none outline-none text-xs font-semibold uppercase text-primary-700 dark:text-primary-600"
            >
              {isReading ? 'Hide Replies' : 'View Replies'}
            </button>
          )}
        </div>
      </div>
      <div className="transition">
        {isReading && (
          <div className="flex flex-col mt-4 border-l border-r border-gray-800">
            {data.children.map((child) => (
              <Comment key={child.id} data={child} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
