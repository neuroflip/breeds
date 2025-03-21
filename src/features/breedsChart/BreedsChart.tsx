import { useAppDispatch, useAppSelector } from "../../store/store"
import { fetchBreeds } from "./slices/BreedsChartSlice"
import { selectIsLoading, selectError, selectBreedsByImagePercentage, selectBreeds } from "./slices/selectors"
import BreedsPieChart from "./components/BreedsPieChart"
import ErrorBox from "./components/ErrorBox"
import LoadingSpinner from "./components/LoadingSpinner/LodingSpinner"

import './breedsChart.css'
import img from './images/dogFingerprint.png'

const BreedsChart = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectError)
  const breeds = useAppSelector(selectBreeds)
  const breedsByPercent = useAppSelector(selectBreedsByImagePercentage)

  if(!breeds.length && !isLoading && !error) {
    dispatch(fetchBreeds())
  }

  return (<><div className="breedsChart--title">
      <img width={ 50 } height={ 50 } src={img} alt="dog fingerprint" />
      <h1>Breeds Chart</h1>
    </div>
    { isLoading ? <LoadingSpinner /> :
        error ? <ErrorBox errorMessage={error} /> : <BreedsPieChart data={ breedsByPercent } /> }
    </>)
}

export default BreedsChart