import { DogApiError, RootThunkAPI } from "./types";

const getFetchImageAPIUrl = (name: string) => {
    return `https://dog.ceo/api/breed/${name}/images`
}

const checkResponseAndThrowErrorIfNeedded = (responseStatus: number, data: DogApiError, thunkApi: RootThunkAPI) =>{
    if (responseStatus !== 200) {
      throw thunkApi.rejectWithValue(data.message);
    }
}

const BREAD_API = "https://dog.ceo/api/breeds/list/all"

export { getFetchImageAPIUrl, checkResponseAndThrowErrorIfNeedded, BREAD_API }
