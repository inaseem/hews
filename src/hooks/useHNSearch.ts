import { useQuery } from 'react-query';
import { GetArticleResponse } from '../api/types';
import { useSearchParams } from 'react-router-dom';
import { queryParamsMapping } from '../constants';
import api from '../api';

const useHNSearch = () => {
  const [searchParams] = useSearchParams();

  const tags = searchParams.get(queryParamsMapping.tags);
  const searchQuery = searchParams.get(queryParamsMapping.query);
  const page = searchParams.get(queryParamsMapping.page);

  const getQueryString = () => {
    const params = new URLSearchParams(searchParams);

    params.set(queryParamsMapping.tags, `(${tags || 'front_page'})`);
    params.set(queryParamsMapping.page, (parseInt(page ?? '1') - 1).toString());

    if (searchQuery) {
      params.set(
        queryParamsMapping.restrictSearchableAttributes,
        'title,comment_text,url,story_text,author'
      );
      params.set(queryParamsMapping.tags, 'story');
      params.set(queryParamsMapping.query, searchQuery);
    }

    return params.toString();
  };

  const queryString = getQueryString();

  const searchBy = searchQuery ? 'search_by_date' : 'search';

  const query = useQuery({
    queryKey: ['HN', queryString],
    queryFn: () =>
      api<GetArticleResponse>(
        `http://hn.algolia.com/api/v1/${searchBy}?${queryString}`
      ),
  });
  return query;
};

export default useHNSearch;
