import { timeAgo } from '../utils';

interface ArticaleProps {
  title: string;
  link?: string;
  upvotesCount: number;
  commentsCount: number;
  createdBy: string;
  createdAt: string;
  isComment: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Article = ({
  title,
  createdBy,
  upvotesCount,
  commentsCount,
  createdAt,
  link,
  onClick,
  isComment,
}: ArticaleProps) => {
  return (
    <div
      className="item cursor-pointer py-4 px-5 border bg-opacity-25 border-transparent transition hover:border-primary-500 dark:hover:bg-primary-600 dark:hover:bg-opacity-[0.1] border-b group"
      onClick={onClick}
    >
      <div className="w-full">
        <h4 className={`font-bold dark:font-semibold tracking-wide ${isComment?'text-sm':'text-lg'} leading-tight`} dangerouslySetInnerHTML={{__html: title}}/>
        {link ? (
          <div className="w-full overflow-hidden">
            <a
              className="inline-block mt-2 text-sm text-gray-600 dark:text-gray-400 leading-tight truncate min-w-0 font-medium"
              href={link}
              target="_blank"
              rel="noopener"
              onClick={(e) => e.stopPropagation()}
            >
              {link}
            </a>
          </div>
        ) : null}
        <div className="flex mt-1 items-center justify-between flex-wrap">
          <div className="font-semibold text-sm mr-2 flex items-center flex-shrink-0 text-primary-700 dark:text-primary-600 text-opacity-100">
            <span className="font-bold">{upvotesCount}</span>
            <span className="mx-2">•</span>
            <span className="opacity-90">{createdBy}</span>
            <span className="text-gray-400 dark:text-gray-500 mx-2">•</span>
            <span className="text-gray-500 text-xs font-medium">
              {timeAgo(createdAt)}
            </span>
          </div>
          {!isComment && (
            <div className="flex items-center">
              <div className="comments uppercase text-xs transition font-semibold group-hover:font-bold text-gray-600 dark:text-gray-400 group-hover:text-white">
                {commentsCount} Comments
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;
