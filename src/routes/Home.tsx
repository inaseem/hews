import { useNavigate, useSearchParams } from 'react-router-dom';
import useHNSearch from '../hooks/useHNSearch';
import Article from '../components/Article';
import { Progress } from '../components/Progress';
import EmptyView from '../components/EmptyView';
import Button from '../components/Button';
import PageLayout from '../components/PageLayout';
import { Pagination } from '../components/Pagination';
import { queryParamsMapping } from '../constants';

const Home = () => {
  const { data, isLoading, isError, isFetching, refetch } = useHNSearch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const setFilterValue = (filterName: string, filterValue?: string) => {
    searchParams.set(filterName, filterValue!);
    setSearchParams(searchParams);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="sticky top-0">
          <Progress isIntermediate={isFetching} />
        </div>
        <EmptyView
          title="Loading..."
          description="Loading your results. Please wait a moment"
        />
      </PageLayout>
    );
  }

  if (isError || !data) {
    return (
      <PageLayout>
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

  if (data.hits.length === 0) {
    return (
      <PageLayout>
        <EmptyView
          title="No results found"
          description="There are no results available currently. Please try updating the filters and retry."
          actions={
            <div className="flex gap-2 flex-wrap">
              <Button onClick={() => refetch()} disabled={isFetching}>
                Refresh
              </Button>
              <Button onClick={() => setSearchParams()} disabled={isFetching}>
                Clear Filters
              </Button>
            </div>
          }
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="grid grid-rows-[auto_1fr_auto] overflow-auto">
        <div className="sticky top-0">
          <Progress isIntermediate={isFetching} />
        </div>

        <ol className="overflow-auto">
          {data.hits.map((hit) => (
            <li key={hit.objectID}>
              <Article
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${hit.objectID}`);
                }}
                commentsCount={hit.num_comments}
                createdAt={hit.created_at}
                createdBy={hit.author}
                title={hit.title || hit.comment_text || ''}
                link={hit.url}
                upvotesCount={hit.points}
                isComment={Boolean(hit.comment_text)}
              />
            </li>
          ))}
        </ol>
        <div className="sticky bottom-0 bg-gray-100 dark:bg-gray-900 dark:text-gray-300 grid place-items-center w-full">
          <Pagination
            page={data.page + 1}
            pageSize={data.hitsPerPage}
            totalItems={data.nbPages * data.hitsPerPage}
            onPageChange={({ page }) => {
              setFilterValue(queryParamsMapping.page, page.toString());
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
