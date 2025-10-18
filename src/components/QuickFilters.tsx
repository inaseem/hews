import { useSearchParams } from "react-router-dom";
import { queryParamsMapping, searchInOptions } from "../constants";
import FilterTabs from "./FilterTabs";
import FilterSidebar from "./FilterSidebar";
import SubFilters from "./SubFilters";

const QuickFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchIn = searchParams.get(queryParamsMapping.searchIn) ?? searchInOptions[0].value;
  const isFrontPage = searchIn === 'frontPage';

  const handleTabChange = (value: string) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set(queryParamsMapping.searchIn, value);
      return newParams;
    });
  };

  return (
    <div className="w-full h-full">
      {/* Mobile: Tabs */}
      <div className="lg:hidden">
        <div className={isFrontPage ? "" : "mb-3"}>
          <FilterTabs onTabChange={handleTabChange} />
        </div>
        {!isFrontPage && <SubFilters />}
      </div>

      {/* Desktop: Sidebar + Content */}
      <div className="hidden lg:flex h-full">
        <FilterSidebar onTabChange={handleTabChange} />
        {!isFrontPage && (
          <div className="flex-1 p-6 bg-white dark:bg-gray-900">
            <SubFilters />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickFilters;
