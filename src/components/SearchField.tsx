import { useSearchParams } from 'react-router-dom';
import { queryParamsMapping } from '../constants';
import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

interface SearchFieldProps {
  initialValue: string;
}

const SearchField = ({ initialValue }: SearchFieldProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(initialValue);

  const updateSearchParam = () => {
    searchParams.delete(queryParamsMapping.tags);
    if (!query) {
      searchParams.delete(queryParamsMapping.query);
    } else {
      searchParams.set(queryParamsMapping.query, query);
    }
    setSearchParams(searchParams);
  };

  // DeBounce Function
  useDebounce(
    () => {
      if (query) {
        updateSearchParam();
      }
    },
    [query],
    800
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearchParam();
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value) {
      updateSearchParam();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex relative">
      <input
        onChange={handleQueryChange}
        value={query}
        className="flex border border-gray-800 transition focus:border-primary-500 bg-background px-2 py-1 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 w-full"
        placeholder="Search"
      />
      {Boolean(query) && (
        <button
          className="absolute w-8 right-0 top-0 bottom-0 p-2 h-full text-base leading-[16px]"
          type="reset"
          onClick={() => {
            searchParams.delete(queryParamsMapping.query);
            setSearchParams(searchParams);
          }}
        >
          X
        </button>
      )}
    </form>
  );
};

export default SearchField;
