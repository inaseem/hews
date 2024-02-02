import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import api from '../api';
import { GetStoryDetailsResponse } from '../api/types';
import { hnAPIBaseURL } from '../constants';

const useHNSearchItem = () => {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ['HN_ITEM', id],
    queryFn: () => api<GetStoryDetailsResponse>(`${hnAPIBaseURL}/items/${id}`),
  });
  return query;
};

export default useHNSearchItem;
