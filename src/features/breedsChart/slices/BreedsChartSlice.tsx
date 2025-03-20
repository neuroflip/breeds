import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootThunkAPI, BreedsData } from "./types";
import { checkResponseAndThrowErrorIfNeedded, getFetchImageAPIUrl } from "./utils";

const BREAD_API = "https://dog.ceo/api/breeds/list/all"

const initialState: { breeds: BreedsData[]; isLoading: boolean; error: string | null } = {
  breeds: [],
  isLoading: false,
  error: null,
}

export const fetchBreeds = createAsyncThunk('breedsChart/fetchBreeds', async (_, thunkApi) => {
  const response = await fetch(BREAD_API);
  const data = await response.json();

  checkResponseAndThrowErrorIfNeedded(response.status, data, thunkApi as RootThunkAPI);

  const breeds: Array<BreedsData> = Object.keys(data.message).map((breed) => ({ name: breed, images: 0 }))
  const result = breeds.map(async (breed: BreedsData) => {
    const response = await fetch(getFetchImageAPIUrl(breed.name));
    const data = await response.json();

    checkResponseAndThrowErrorIfNeedded(response.status, data, thunkApi as RootThunkAPI);

    return { name: breed.name, images: data.message.length };
  })

  return await Promise.all(result);
});

export const breedsChartSlice = createSlice({
  name: "breedsChart",
  initialState,
  reducers: {
    fetchBreeds(state) {
      state.isLoading = true;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBreeds.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.breeds = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBreeds.rejected, (state, action) => {
        state.error = action.payload as string || "Failed to fetch breeds";
        state.isLoading = false;
      })
  }
});