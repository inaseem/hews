import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import { GetArticleResponse } from '../api/types';
import { hnAPIBaseURL, queryParamsMapping } from '../constants';

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

  const searchBy = searchQuery || tags ? 'search_by_date' : 'search';

  const query = useQuery({
    queryKey: ['HN', queryString],
    queryFn: () =>
      api<GetArticleResponse>(`${hnAPIBaseURL}/${searchBy}?${queryString}`),
  });
  return query;
};

export default useHNSearch;
