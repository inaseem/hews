import { formatDistance, subDays, subHours } from 'date-fns';
import { getDefaultTimeRange } from './constants';

export const timeAgo = (input: string) => {
  const date = new Date(input);
  return formatDistance(date, new Date(), { addSuffix: true });
};

export const getCreatedAtTimeFromSearchForValue = (searchFor: string) => {
  if (searchFor === 'allTime') {
    return null;
  } else if (searchFor === 'last24Hours') {
    return subHours(new Date(), 24).getTime() / 1000;
  } else if (searchFor === 'pastWeek') {
    return subDays(new Date(), 7).getTime() / 1000;
  } else if (searchFor === 'pastMonth') {
    return subDays(new Date(), 30).getTime() / 1000;
  } else if (searchFor === 'pastYear') {
    return subDays(new Date(), 360).getTime() / 1000;
  }
  return null;
};

export const handleTabChange = (
  value: string, 
  setSearchParams: (updater: (prev: URLSearchParams) => URLSearchParams) => void,
  queryParamsMapping: {
    searchIn: string;
    searchBy: string;
    searchFor: string;
    query: string;
    page: string;
  }
) => {
  setSearchParams((prevParams) => {
    const newParams = new URLSearchParams(prevParams);
    newParams.set(queryParamsMapping.searchIn, value);
    newParams.delete(queryParamsMapping.page);
    
    if (value === 'frontPage') {
      newParams.delete(queryParamsMapping.searchBy);
      newParams.delete(queryParamsMapping.searchFor);
      newParams.delete(queryParamsMapping.query);
    } else {
      const defaultSearchFor = getDefaultTimeRange(value) || 'pastMonth'; // Fallback to pastMonth
      
      newParams.set(queryParamsMapping.searchBy, 'date');
      newParams.set(queryParamsMapping.searchFor, defaultSearchFor);
    }
    
    return newParams;
  });
};
