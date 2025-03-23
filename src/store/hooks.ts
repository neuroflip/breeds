import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, AppState } from "./types"

const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<AppState>()

export { useAppDispatch, useAppSelector }
