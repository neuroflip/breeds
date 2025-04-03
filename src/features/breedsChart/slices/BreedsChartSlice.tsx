import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BreedsData } from "./types";
import { checkResponseAndThrowErrorIfNeedded, getFetchImageAPIUrl } from "./utils";
import { BREAD_API } from "./utils";

const initialState: { breeds: BreedsData[]; isLoading: boolean; error: string | null } = {
  breeds: [],
  isLoading: false,
  error: null,
}

const fetchBreeds = createAsyncThunk('breedsChart/fetchBreeds', async (_, thunkApi) => {
  const response = await fetch(BREAD_API);
  const data = await response.json();

  checkResponseAndThrowErrorIfNeedded(response.status, data, thunkApi.rejectWithValue);
  const result = Object.keys(data.message).map(async (breedName: string) => {
    const response = await fetch(getFetchImageAPIUrl(breedName));
    const data = await response.json();

    checkResponseAndThrowErrorIfNeedded(response.status, data, thunkApi.rejectWithValue);

    return {
      name: breedName,
      value: data.message.length
    };
  })

  return await Promise.all(result);
});

const breedsChartSlice = createSlice({
  name: "breedsChart",
  initialState,
  reducers: {
    initBreeds(state) {
      state.isLoading = true;
      state.error = null;
      state.breeds = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBreeds.pending, (state) => {
        state.isLoading = true
        state.error = null;
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.breeds = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchBreeds.rejected, (state, action) => {
        state.error = action.payload as string || "Failed to fetch breeds";
        state.isLoading = false;
      })
  }
});

export { fetchBreeds, breedsChartSlice }