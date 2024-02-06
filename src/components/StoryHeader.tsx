import { GetStoryDetailsResponse } from '../api/types';
import { timeAgo } from '../utils';

interface StoryHeaderProps {
  data: GetStoryDetailsResponse;
}

export const StoryHeader = ({ data }: StoryHeaderProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 relative">
      <div className="w-full py-4 px-5 border border-transparent shadow-xl">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <h4 className="font-bold dark:font-semibold tracking-wide text-lg leading-tight">
              {data.title}
            </h4>

            {data.url ? (
              <div className="w-full overflow-hidden">
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener"
                  className="text-sm text-gray-600 dark:text-gray-400 leading-tight w-full truncate min-w-0 font-medium"
                >
                  {data.url}
                </a>
              </div>
            ) : null}

            <div className="flex mt-1 items-center justify-between flex-wrap">
              <div className="font-semibold text-sm mr-2 flex items-center flex-shrink-0 text-primary-700 dark:text-primary-600 text-opacity-100">
                <span className="font-bold">{data.points}</span>
                <span className="mx-2">•</span>
                <span className="opacity-90">{data.author}</span>
                <span className="text-gray-400 dark:text-gray-500 mx-2">•</span>
                <span className="text-gray-500 text-xs font-medium">
                  {timeAgo(data.created_at)}
                </span>
              </div>
              <div className="flex items-center">
                <div className="uppercase text-xs transition font-bold text-gray-600 dark:text-gray-400">
                  {data.children.length} Comments
                </div>
              </div>
            </div>
            {data.text ? (
              <div
                className="overflow-x-auto mt-2 text-sm leading-relaxed whitespace-pre-line before:bg-gradient-to-b before:from-transparent before:to-white dark:before:to-gray-800 [&_a]:text-primary-600"
                dangerouslySetInnerHTML={{ __html: data.text }}
              />
            ) : null}
          </div>
        </div>
        <div className="leading-relaxed whitespace-pre-line before:bg-gradient-to-b before:from-transparent before:to-white dark:before:to-gray-800 limit-text"></div>
      </div>
    </div>
  );
};
