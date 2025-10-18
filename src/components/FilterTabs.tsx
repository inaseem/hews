import { useSearchParams } from "react-router-dom";
import { queryParamsMapping, searchInOptions } from "../constants";
import { SelectOptionType } from "../types";

interface FilterTabsProps {
  onTabChange: (value: string) => void;
}

const FilterTabs = ({ onTabChange }: FilterTabsProps) => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get(queryParamsMapping.searchIn) ?? searchInOptions[0].value;

  const handleTabClick = (option: SelectOptionType) => {
    onTabChange(option.value);
  };

  const handleTitleClick = () => {
    onTabChange('frontPage');
  };

  return (
    <div className="space-y-3">
      <h3 
        className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-widest cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        onClick={handleTitleClick}
      >
        HEWS
      </h3>
      <div className="flex overflow-x-auto scrollbar-hide pb-2">
        <div className="flex gap-1 min-w-max px-1">
        {searchInOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => handleTabClick(option)}
            className={`
              px-3 py-2 text-xs font-medium rounded-sm whitespace-nowrap transition-all duration-200 border
              ${
                activeTab === option.value
                  ? "bg-primary-600 text-white border-primary-600"
                  : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-800 hover:border-primary-600 hover:bg-primary-600 hover:bg-opacity-10 dark:hover:bg-primary-600 dark:hover:bg-opacity-10"
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FilterTabs;