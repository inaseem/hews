import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { GetStoryDetailsResponse } from '../api/types';
import api from '../api';

const useHNSearchItem = () => {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ['HN_ITEM', id],
    queryFn: () =>
      api<GetStoryDetailsResponse>(`http://hn.algolia.com/api/v1/items/${id}`),
  });
  return query;
};

export default useHNSearchItem;
