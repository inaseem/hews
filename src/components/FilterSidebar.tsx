import { useSearchParams } from "react-router-dom";
import { queryParamsMapping, searchInOptions } from "../constants";
import { SelectOptionType } from "../types";

interface FilterSidebarProps {
  onTabChange: (value: string) => void;
}

const FilterSidebar = ({ onTabChange }: FilterSidebarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get(queryParamsMapping.searchIn) ?? searchInOptions[0].value;

  const handleTabClick = (option: SelectOptionType) => {
    onTabChange(option.value);
  };

  const handleTitleClick = () => {
    setSearchParams();
  };

  return (
    <div className="w-56 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full relative z-20">
      <div className="p-6">
        <h3 
          className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-4 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          onClick={handleTitleClick}
        >
          HEWS
        </h3>
        <nav className="space-y-1">
          {searchInOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => handleTabClick(option)}
              className={`
                w-full text-left px-4 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 border
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
        </nav>
      </div>
    </div>
  );
};

export default FilterSidebar;