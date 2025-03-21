import { useAppDispatch, useAppSelector } from "../../store/store"
import { fetchBreeds } from "./slices/BreedsChartSlice"
import { selectIsLoading, selectError, selectBreedsByImagePercentage, selectBreeds } from "./slices/selectors"
import ResponsivePieChart from "./components/ResponsivePieChart/ResponsivePieChart"
import ErrorBox from "../../components/ErrorBox/ErrorBox"
import LoadingSpinner from "../../components/LoadingSpinner/LodingSpinner"

import styles from './breedsChart.module.css'
import img from './images/dogFingerprint.png'

const BreedsChart = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectError)
  const breeds = useAppSelector(selectBreeds)
  const breedImagesPercent = useAppSelector(selectBreedsByImagePercentage)

  if(!breeds.length && !isLoading && !error) {
    dispatch(fetchBreeds())
  }

  return (<>
    <div className={styles.breedsChart__title}>
      <img width={ 50 } height={ 50 } src={img} alt="dog fingerprint" />
      <h1>Breeds Chart</h1>
    </div>
    <div className={styles.breedsChart__content}>
      { isLoading ? <LoadingSpinner /> :
        error ? <ErrorBox errorMessage={error} /> :
          <ResponsivePieChart data={ breedImagesPercent } /> }
    </div>
  </>)
}

export default BreedsChart