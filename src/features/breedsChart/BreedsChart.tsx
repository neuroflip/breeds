import { useAppDispatch, useAppSelector } from "../../store/store"
import { fetchBreeds } from "./slices/BreedsChartSlice"
import { BreedsData } from "./slices/types"
import { selectIsLoading, selectBreeds, selectError } from "./slices/selectors"

const BreedsChart = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectError)
  const breeds = useAppSelector(selectBreeds)

  if(!breeds.length) {
    dispatch(fetchBreeds())
  }

  return (<div>
    <h1>Breeds Chart</h1>
    { isLoading ? <p>Loading...</p> :
        error ? <p>{ error }</p> :
          <>{ breeds.map((breed: BreedsData)=><div> { breed.name }: { breed.images }</div>)}</> }
  </div>)
}

export default BreedsChart