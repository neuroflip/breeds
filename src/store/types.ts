import { store } from "./store"

type AppStore = typeof store
type AppState = ReturnType<AppStore["getState"]>
type AppDispatch = AppStore["dispatch"]

export type { AppStore, AppState, AppDispatch }