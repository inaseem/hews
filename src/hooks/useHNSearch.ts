import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import { GetArticleResponse } from '../api/types';
import {
  hnAPIBaseURL,
  queryParamsMapping,
  searchInQueryParamToValueMapping,
} from '../constants';
import { apiParamMapping } from './../constants';
import { getCreatedAtTimeFromSearchForValue } from '../utils';

const useHNSearch = () => {
  const [searchParams] = useSearchParams();

  const searchBy = searchParams.get(queryParamsMapping.searchBy);

  const getQueryString = () => {
    const searchIn = searchParams.get(queryParamsMapping.searchIn) ?? 'all';
    const searchFor = searchParams.get(queryParamsMapping.searchFor);
    const searchQuery = searchParams.get(queryParamsMapping.query);
    const page = searchParams.get(queryParamsMapping.page) ?? '1';
    const params = new URLSearchParams();

    params.set(
      apiParamMapping.searchIn,
      `(${
        searchInQueryParamToValueMapping[
          searchIn as keyof typeof searchInQueryParamToValueMapping
        ]
      })`
    );
    params.set(apiParamMapping.page, (parseInt(page) - 1).toString());

    if (searchQuery) {
      params.set(
        apiParamMapping.restrictSearchableAttributes,
        'title,comment_text,url,story_text,author'
      );
      params.set(apiParamMapping.query, searchQuery);
    }

    if (searchFor) {
      const createdAtTime = getCreatedAtTimeFromSearchForValue(searchFor);
      if (createdAtTime) {
        params.set(
          apiParamMapping.numericFilters,
          `${apiParamMapping.createdAtI}>${createdAtTime}`
        );
      }
    }

    return params.toString();
  };

  const queryString = getQueryString();

  const searchType = searchBy === 'date' ? 'search_by_date' : 'search';

  const query = useQuery({
    queryKey: ['HN', queryString, searchType],
    queryFn: () =>
      api<GetArticleResponse>(`${hnAPIBaseURL}/${searchType}?${queryString}`),
  });
  return query;
};

export default useHNSearch;
