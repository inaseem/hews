import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useHNSearch from "../hooks/useHNSearch";
import Article from "../components/Article";
import { Progress } from "../components/Progress";
import EmptyView from "../components/EmptyView";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import { Pagination } from "../components/Pagination";
import QuickFilters from "../components/QuickFilters";
import FilterSidebar from "../components/FilterSidebar";
import SubFilters from "../components/SubFilters";
import { queryParamsMapping } from "../constants";
import { handleTabChange } from "../utils";

const Home = () => {
  const { data, isLoading, isError, isFetching, refetch } = useHNSearch();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore scroll position on mount
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("homeScrollPosition");
    if (savedScroll && scrollRef.current) {
      setTimeout(
        () => scrollRef.current?.scrollTo(0, parseInt(savedScroll)),
        50
      );
    }
  }, []);

  // Save scroll position before navigating
  const handleArticleClick = (objectID: string) => {
    if (scrollRef.current) {
      sessionStorage.setItem(
        "homeScrollPosition",
        scrollRef.current.scrollTop.toString()
      );
    }
    navigate(`/${objectID}`);
  };

  const [, setSearchParams] = useSearchParams();

  const setFilterValue = (filterName: string, filterValue?: string) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set(filterName, filterValue!);
      return newParams;
    });
  };

  const onTabChange = (searchIn: string) => {
    handleTabChange(searchIn, setSearchParams, queryParamsMapping);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="h-full flex flex-col lg:flex-row">
          {/* Mobile: Filters at top */}
          <div className="lg:hidden px-4 py-1 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <QuickFilters />
          </div>

          {/* Desktop: Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar onTabChange={onTabChange} />
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col min-h-0 relative">
            {/* Desktop: Search and filters at top */}
            <div className="hidden lg:block px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <SubFilters />
            </div>

            <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
              <div className="sticky top-0 z-10">
                <Progress isIntermediate={isFetching} />
              </div>
              <EmptyView
                title="Loading..."
                description="Loading your results. Please wait a moment"
              />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (isError || !data) {
    return (
      <PageLayout>
        <div className="h-full flex flex-col lg:flex-row">
          <div className="lg:hidden px-4 py-1.5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <QuickFilters />
          </div>

          <div className="hidden lg:block">
            <FilterSidebar onTabChange={onTabChange} />
          </div>

          <div className="flex-1 flex flex-col min-h-0 relative">
            <div className="hidden lg:block px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <SubFilters />
            </div>

            <div className="flex-1 bg-white dark:bg-gray-900">
              <EmptyView
                title="Error"
                description="There was an error in completing your request. Please try again"
                actions={
                  <Button onClick={() => refetch()} disabled={isFetching}>
                    Retry
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (data.hits.length === 0) {
    return (
      <PageLayout>
        <div className="h-full flex flex-col lg:flex-row">
          <div className="lg:hidden px-4 py-1 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <QuickFilters />
          </div>

          <div className="hidden lg:block">
            <FilterSidebar onTabChange={onTabChange} />
          </div>

          <div className="flex-1 flex flex-col min-h-0 relative">
            <div className="hidden lg:block px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <SubFilters />
            </div>

            <div className="flex-1 bg-white dark:bg-gray-900">
              <EmptyView
                title="No results found"
                description="There are no results available currently. Please try updating the filters and retry."
                actions={
                  <div className="flex gap-2 flex-wrap">
                    <Button onClick={() => refetch()} disabled={isFetching}>
                      Refresh
                    </Button>
                    <Button
                      onClick={() => setSearchParams()}
                      disabled={isFetching}
                    >
                      Clear Filters
                    </Button>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="h-full flex flex-col lg:flex-row">
        <div className="lg:hidden px-4 py-1 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <QuickFilters />
        </div>

        <div className="hidden lg:block">
          <FilterSidebar onTabChange={onTabChange} />
        </div>

        <div className="flex-1 flex flex-col min-h-0 relative">
          <div className="hidden lg:block px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <SubFilters />
          </div>

          <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-900">
            <div className="sticky top-0 z-10">
              <Progress isIntermediate={isFetching} />
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-auto lg:px-6 py-2 lg:py-4"
            >
              {data.hits.map((hit) => (
                <div key={hit.objectID}>
                  <Article
                    onClick={(e) => {
                      e.preventDefault();
                      handleArticleClick(hit.objectID);
                    }}
                    commentsCount={hit.num_comments}
                    createdAt={hit.created_at}
                    createdBy={hit.author}
                    title={hit.title || hit.comment_text || ""}
                    link={hit.url}
                    upvotesCount={hit.points}
                    isComment={Boolean(hit.comment_text)}
                  />
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-center w-full">
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
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
