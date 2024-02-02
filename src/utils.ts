import { formatDistance } from 'date-fns';

export const timeAgo = (input: string) => {
  const date = new Date(input);
  return formatDistance(date, new Date(), { addSuffix: true });
};
