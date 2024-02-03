import { SelectOptionType } from './types';

export const queryParamsMapping = {
  query: 'query',
  searchIn: 'searchIn',
  page: 'page',
  searchFor: 'searchFor',
  searchBy: 'searchBy',
};

export const apiParamMapping = {
  searchIn: 'tags',
  page: 'page',
  query: 'query',
  restrictSearchableAttributes: 'restrictSearchableAttributes',
  numericFilters: 'numericFilters',
  createdAtI: 'created_at_i',
};

export const searchInQueryParamToValueMapping = {
  frontPage: 'front_page',
  all: 'story,comment,poll,job',
  stories: 'story',
  comments: 'comment',
  askHn: 'ask_hn',
  showHn: 'show_hn',
  launchHn: 'launch_hn',
  jobs: 'job',
  polls: 'poll',
};

export const searchInOptions: SelectOptionType[] = [
  { key: 'all', label: 'All', value: 'all' },
  {
    key: 'front_page',
    label: 'Front Page',
    value: 'frontPage',
  },
  {
    key: 'stories',
    label: 'Stories',
    value: 'stories',
  },
  {
    key: 'comments',
    label: 'Comments',
    value: 'comments',
  },
  {
    key: 'askhn',
    label: 'Ask HN',
    value: 'askHn',
  },
  {
    key: 'showhn',
    label: 'Show HN',
    value: 'showHn',
  },
  {
    key: 'launchhn',
    label: 'Launch HN',
    value: 'launchHn',
  },
  { key: 'jobs', label: 'Jobs', value: 'jobs' },
  {
    key: 'polls',
    label: 'Polls',
    value: 'polls',
  },
];

export const searchByOptions: SelectOptionType[] = [
  { key: 'popularity', label: 'Popularity', value: 'popularity' },
  { key: 'date', label: 'Date', value: 'date' },
];

export const searchForOptions: SelectOptionType[] = [
  { key: 'allTime', label: 'All Time', value: 'allTime' },
  { key: 'last24Hours', label: 'Last 24h', value: 'last24Hours' },
  { key: 'pastWeek', label: 'Past Week', value: 'pastWeek' },
  { key: 'pastMonth', label: 'Past Month', value: 'pastMonth' },
  { key: 'pastYear', label: 'Past Year', value: 'pastYear' },
];

export const hnAPIBaseURL = 'https://hn.algolia.com/api/v1';

export const baseURL = import.meta.env.BASE_URL;
