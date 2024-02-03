import { ValueChangeDetails } from '@zag-js/select';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  queryParamsMapping,
  searchByOptions,
  // searchForOptions,
  searchInOptions,
} from '../constants';
import useDebounce from '../hooks/useDebounce';
import { SelectOptionType } from '../types';
import SearchField from './SearchField';
import { Select } from './Select';

const QuickFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchIn = searchParams.get(queryParamsMapping.searchIn);
  const searchBy = searchParams.get(queryParamsMapping.searchBy);
  const searchQuery = searchParams.get(queryParamsMapping.query);

  const [query, setQuery] = useState(searchQuery ?? '');
  // const searchFor = searchParams.get(queryParamsMapping.searchFor);

  const handleSearchInValueChange = (
    e: ValueChangeDetails<SelectOptionType>
  ) => {
    setSearchParams((searchParams) => {
      searchParams.set(queryParamsMapping.searchIn, e.value.join(''));
      return searchParams;
    });
  };

  const handleSearchByValueChange = (
    e: ValueChangeDetails<SelectOptionType>
  ) => {
    setSearchParams((searchParams) => {
      searchParams.set(queryParamsMapping.searchBy, e.value.join(''));
      return searchParams;
    });
  };

  // TODO: Implement searchFor
  // const handleSearchForValueChange = (
  //   e: ValueChangeDetails<SelectOptionType>
  // ) => {
  //   searchParams.set(queryParamsMapping.searchFor, e.value.join(''));
  //   setSearchParams(searchParams);
  // };

  // DeBounce Function
  useDebounce(
    () => {
      setSearchParams((searchParams) => {
        if (query) {
          searchParams.set(queryParamsMapping.query, query);
        } else {
          searchParams.delete(queryParamsMapping.query);
        }
        return searchParams;
      });
    },
    [query],
    800
  );

  useEffect(() => {
    setQuery(searchQuery ?? '');
  }, [searchQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // const handleClear = () => {
  //   setQuery('');
  //   setSearchParams((searchParams) => {
  //     searchParams.delete(queryParamsMapping.searchIn);
  //     return searchParams;
  //   });
  // };

  return (
    <div className="flex flex-col gap-6 flex-wrap w-full">
      <SearchField value={query} onChange={handleQueryChange} />

      <div className="flex items-center flex-wrap gap-2 justify-end">
        <Select
          label="Search"
          value={searchIn ?? ''}
          items={searchInOptions}
          onValueChange={handleSearchInValueChange}
        />
        <Select
          label="by"
          value={searchBy ?? ''}
          items={searchByOptions}
          onValueChange={handleSearchByValueChange}
        />
        {/* <Select
        label="for"
        value={searchFor ?? ''}
        items={searchForOptions}
        onValueChange={handleSearchForValueChange}
      /> */}
      </div>
    </div>
  );
};

export default QuickFilters;
