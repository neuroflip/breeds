import { AppState, AppDispatch } from "../../../store/store"

export type BreedsData = {
  name: string,
  value: number
}

export type breedsChartAction = {
  type: string
  payload: Array<string>
}

export type DogApiError = {
  status: string,
  message: string,
  code: number
}

export type RootThunkAPI = {
  getState: () => AppState;
  dispatch: AppDispatch;
  rejectWithValue: (value: string) => void;
};