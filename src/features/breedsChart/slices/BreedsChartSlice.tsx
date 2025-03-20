import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BreedsData } from "./types";

const BREAD_API = "https://dog.ceo/api/breeds/list/all"

const getFetchImageAPIUrl = (name: string) => {
  return `https://dog.ceo/api/breed/${name}/images`
}

const initialState: { breeds: BreedsData[]; isLoading: boolean; error: string | null } = {
  breeds: [],
  isLoading: false,
  error: null,
}

export const fetchBreeds = createAsyncThunk('breedsChart/fetchBreeds', async () => {
  const response = await fetch(BREAD_API);
  const data = await response.json();
  const breeds: Array<BreedsData> = Object.keys(data.message).map((breed) => ({ name: breed, images: 0 }))

  const res = breeds.map(async (breed: BreedsData) => {
    const response = await fetch(getFetchImageAPIUrl(breed.name));
    const data = await response.json();
    
    return { name: breed.name, images: data.message.length } ;
  })

  return await Promise.all(res);
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
        state.error = action.error.message || "Failed to fetch breeds";
        state.isLoading = false;
      })
  }
});