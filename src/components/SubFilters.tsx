import { ValueChangeDetails } from "@zag-js/select";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  queryParamsMapping,
  searchByOptions,
  searchInOptions,
  getFilteredSearchForOptions,
} from "../constants";
import useDebounce from "../hooks/useDebounce";
import { SelectOptionType } from "../types";
import SearchField from "./SearchField";
import { Select } from "./Select";

const SubFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const searchIn =
    searchParams.get(queryParamsMapping.searchIn) ?? searchInOptions[0].value;
  const searchBy = searchParams.get(queryParamsMapping.searchBy);
  const searchQuery = searchParams.get(queryParamsMapping.query);
  const searchFor = searchParams.get(queryParamsMapping.searchFor);

  const [query, setQuery] = useState(searchQuery ?? "");

  const handleSearchByValueChange = (
    e: ValueChangeDetails<SelectOptionType>
  ) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set(queryParamsMapping.searchBy, e.value.join(""));
      return newParams;
    });
  };

  const handleSearchForValueChange = (
    e: ValueChangeDetails<SelectOptionType>
  ) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set(queryParamsMapping.searchFor, e.value.join(""));
      return newParams;
    });
  };

  // Debounce Function
  useDebounce(
    () => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (query) {
          newParams.set(queryParamsMapping.query, query);
        } else {
          newParams.delete(queryParamsMapping.query);
        }
        return newParams;
      });
    },
    [query],
    800
  );

  useEffect(() => {
    setQuery(searchQuery ?? "");
    setIsSearchExpanded(Boolean(searchQuery));
  }, [searchQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleQueryClear = () => {
    setQuery("");
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete(queryParamsMapping.query);
      return newParams;
    });
  };

  const filteredSearchForOptions = getFilteredSearchForOptions(searchIn);

  if (searchIn === "frontPage") {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="hidden lg:block">
        <SearchField value={query} onChange={handleQueryChange} />
      </div>

      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-2 text-sm">
          {isSearchExpanded ? (
            <SearchField
              value={query}
              onChange={handleQueryChange}
              collapsible={true}
              expanded={isSearchExpanded}
              onToggle={setIsSearchExpanded}
              onClear={handleQueryClear}
            />
          ) : (
            <>
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Sort by
                </span>
                <Select
                  label=""
                  value={searchBy ?? ""}
                  items={searchByOptions}
                  onValueChange={handleSearchByValueChange}
                />
                <span className="text-gray-600 dark:text-gray-400">for</span>
                <Select
                  label=""
                  value={searchFor ?? ""}
                  items={filteredSearchForOptions}
                  onValueChange={handleSearchForValueChange}
                />
              </div>

              <button
                onClick={() => setIsSearchExpanded(true)}
                className="flex items-center justify-center p-2 rounded-sm border border-gray-800 bg-background hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400 flex-shrink-0"
                type="button"
                title="Open search"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex items-center flex-wrap gap-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400 font-medium">
            Sort by
          </span>
          <Select
            label=""
            value={searchBy ?? ""}
            items={searchByOptions}
            onValueChange={handleSearchByValueChange}
          />
          <span className="text-gray-600 dark:text-gray-400">for</span>
          <Select
            label=""
            value={searchFor ?? ""}
            items={filteredSearchForOptions}
            onValueChange={handleSearchForValueChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SubFilters;
