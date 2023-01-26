import { api } from '../../lib/axios';
import { IGetDayResponse } from './types';

const getDay = async (date: string): Promise<IGetDayResponse> => {
  console.log(date);
  const response = await api
    .get(`/day?date=${date}`)
    .then((response) => response)
    .catch((error) => error.response);

  return response.data;
};

export { getDay };
