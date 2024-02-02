import Button from './Button';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Button onClick={onClick}>
      <div className="inline-flex items-center flex-shrink-0">
        <div className="h-auto !p-0 bg-primary-600 rounded">
          <div className="h-4 w-4 py-px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-full w-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <span className="text-xs uppercase font-semibold ml-2">back</span>
    </Button>
  );
};

export default BackButton;
