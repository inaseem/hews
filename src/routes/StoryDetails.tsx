import { useNavigate } from 'react-router-dom';
import useHNSearchItem from '../hooks/useHNSearchItem';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Comment from '../components/Comment';
import EmptyView from '../components/EmptyView';
import PageLayout from '../components/PageLayout';
import { Progress } from '../components/Progress';
import { StoryHeader } from '../components/StoryHeader';

const StoryDetails = () => {
  const { data, isLoading, isFetching, isError, refetch } = useHNSearchItem();
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="sticky top-0">
          <Progress isIntermediate={isFetching} />
        </div>
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <BackButton onClick={handleBackClick} />
        </div>
        <EmptyView
          title="Loading..."
          description="Loading story details. Please wait a moment"
        />
      </PageLayout>
    );
  }

  if (isError || !data) {
    return (
      <PageLayout>
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <BackButton onClick={handleBackClick} />
        </div>
        <EmptyView
          title="Error"
          description="There was an error in completing your request. Please try again"
          actions={
            <Button onClick={() => refetch()} disabled={isFetching}>
              Retry
            </Button>
          }
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="sticky top-0">
        <Progress isIntermediate={isFetching} />
      </div>
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <BackButton onClick={handleBackClick} />
      </div>
      <StoryHeader data={data} />

      {data.children.length > 0 ? (
        <>
          {data.children.map((child) => (
            <Comment data={child} key={child.id} />
          ))}
        </>
      ) : (
        <EmptyView
          title="No comments yet"
          description="There are no comments available for this item. Please try refreshing below to load latest updates"
          actions={
            <Button onClick={() => refetch()} disabled={isFetching}>
              Refresh
            </Button>
          }
        />
      )}
    </PageLayout>
  );
};

export default StoryDetails;
