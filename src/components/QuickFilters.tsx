import { useSearchParams } from 'react-router-dom';
import FilterTag from './FilterTag';
import { queryParamsMapping } from '../constants';

const QuickFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTag = searchParams.get(queryParamsMapping.tags);

  const setFilterValue = (filterName: string, filterValue?: string) => {
    if (currentTag === filterValue) {
      searchParams.delete(queryParamsMapping.tags);
      searchParams.delete(queryParamsMapping.page);
    } else {
      searchParams.set(filterName, filterValue!);
    }
    searchParams.delete(queryParamsMapping.query);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex gap-2">
      <FilterTag
        isActive={currentTag === 'show_hn'}
        name="Show HN"
        onClick={() => setFilterValue(queryParamsMapping.tags, 'show_hn')}
      />
      <FilterTag
        isActive={currentTag === 'ask_hn'}
        name="Ask HN"
        onClick={() => setFilterValue(queryParamsMapping.tags, 'ask_hn')}
      />
      <FilterTag
        isActive={currentTag === 'story'}
        name="Stories"
        onClick={() => setFilterValue(queryParamsMapping.tags, 'story')}
      />
    </div>
  );
};

export default QuickFilters;
