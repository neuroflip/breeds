import { AppState, AppDispatch } from "../../../store/store"

type BreedsData = {
  name: string,
  value: number
}

type breedsChartAction = {
  type: string
  payload: Array<string>
}

type DogApiError = {
  status: string,
  message: string,
  code: number
}

type RootThunkAPI = {
  getState: () => AppState;
  dispatch: AppDispatch;
  rejectWithValue: (value: string) => void;
};

export type { BreedsData, breedsChartAction, DogApiError, RootThunkAPI }