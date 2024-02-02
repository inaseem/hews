export const queryParamsMapping = {
  query: 'query',
  tags: 'tags',
  restrictSearchableAttributes: 'restrictSearchableAttributes',
  page: 'page',
};

export const hnAPIBaseURL = 'http://hn.algolia.com/api/v1';

export const baseURL = import.meta.env.PROD ? '/hews' : '/';
