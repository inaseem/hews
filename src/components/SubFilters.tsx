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

  const searchIn = searchParams.get(queryParamsMapping.searchIn) ?? searchInOptions[0].value;
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
  }, [searchQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredSearchForOptions = getFilteredSearchForOptions(searchIn);

  // Don't show filters for Front Page
  if (searchIn === 'frontPage') {
    return null;
  }

  return (
    <div className="space-y-3">
      <div>
        <SearchField value={query} onChange={handleQueryChange} />
      </div>
      
      <div className="flex items-center flex-wrap gap-2 text-sm">
        <span className="text-gray-600 dark:text-gray-400 font-medium">Sort by</span>
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
  );
};

export default SubFilters;