import { AppResponse } from '../../AppResponse';

interface IPossibleHabits {
  id: string;
  title: string;
  created_at: string;
}

interface IGetDayResponse extends AppResponse {
  data?: {
    possibleHabits: IPossibleHabits[];
    completedHabits: string[];
  };
}

export type { IGetDayResponse, IPossibleHabits };
