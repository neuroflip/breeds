import { DogApiError, RootThunkAPI } from "./types";

export const getFetchImageAPIUrl = (name: string) => {
    return `https://dog.ceo/api/breed/${name}/images`
}

export const checkResponseAndThrowErrorIfNeedded = (responseStatus: number, data: DogApiError, thunkApi: RootThunkAPI) =>{
    if (responseStatus !== 200) {
      throw thunkApi.rejectWithValue(data.message);
    }
}
