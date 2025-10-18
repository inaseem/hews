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

export const tabConfig = {
  frontPage: {
    allowedForDropdownFilters: [], // No filters shown for front page
    defaultTimeRange: null,
  },
  stories: {
    allowedForDropdownFilters: ['allTime', 'last24Hours', 'pastWeek', 'pastMonth', 'pastYear'],
    defaultTimeRange: 'last24Hours',
  },
  askHn: {
    allowedForDropdownFilters: ['allTime', 'last24Hours', 'pastWeek', 'pastMonth', 'pastYear'],
    defaultTimeRange: 'last24Hours',
  },
  showHn: {
    allowedForDropdownFilters: ['allTime', 'last24Hours', 'pastWeek', 'pastMonth', 'pastYear'],
    defaultTimeRange: 'last24Hours',
  },
  launchHn: {
    allowedForDropdownFilters: ['allTime', 'pastMonth', 'pastYear'], // Exclude last24Hours, pastWeek
    defaultTimeRange: 'pastMonth',
  },
  jobs: {
    allowedForDropdownFilters: ['allTime', 'pastMonth', 'pastYear'], // Exclude last24Hours, pastWeek
    defaultTimeRange: 'pastMonth',
  },
  polls: {
    allowedForDropdownFilters: ['allTime', 'pastMonth', 'pastYear'], // Exclude last24Hours, pastWeek
    defaultTimeRange: 'pastMonth',
  },
  comments: {
    allowedForDropdownFilters: ['allTime', 'last24Hours', 'pastWeek', 'pastMonth', 'pastYear'],
    defaultTimeRange: 'last24Hours',
  },
} as const;

export const getTabConfig = (tabValue: string) => {
  return tabConfig[tabValue as keyof typeof tabConfig] || tabConfig.stories; // Default to stories config
};

export const getFilteredSearchForOptions = (tabValue: string): SelectOptionType[] => {
  const config = getTabConfig(tabValue);
  return searchForOptions.filter(option => 
    (config.allowedForDropdownFilters as readonly string[]).includes(option.value)
  );
};

export const getDefaultTimeRange = (tabValue: string): string | null => {
  const config = getTabConfig(tabValue);
  return config.defaultTimeRange;
};

export const hnAPIBaseURL = 'https://hn.algolia.com/api/v1';

export const baseURL = import.meta.env.BASE_URL;
