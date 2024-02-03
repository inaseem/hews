import { formatDistance, subDays, subHours } from 'date-fns';

export const timeAgo = (input: string) => {
  const date = new Date(input);
  return formatDistance(date, new Date(), { addSuffix: true });
};

export const getCreatedAtTimeFromSearchForValue = (searchFor: string) => {
  if (searchFor === 'allTime') {
    return null;
  } else if (searchFor === 'last24Hours') {
    return subHours(new Date(), 24).getTime();
  } else if (searchFor === 'pastWeek') {
    return subDays(new Date(), 7).getTime();
  } else if (searchFor === 'pastMonth') {
    return subDays(new Date(), 30).getTime();
  } else if (searchFor === 'pastYear') {
    return subDays(new Date(), 360).getTime();
  }
  return null;
};
