import { useAppDispatch, useAppSelector } from "../../../store/store"
import { fetchBreeds } from "../slices/BreedsChartSlice"
import { selectBreeds, selectBreedsByImagePercentage, selectError, selectIsLoading } from "../slices/selectors"

import styles from '../breedsChart.module.css'
import img from '../images/dogFingerprint.png'

const useBreedsChart = () => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(selectIsLoading)
    const error = useAppSelector(selectError)
    const breeds = useAppSelector(selectBreeds)
    const breedImagesPercent = useAppSelector(selectBreedsByImagePercentage)

    if(!breeds.length && !isLoading && !error) {
      dispatch(fetchBreeds())
    }

    const renderTitle = () =>
      <div className={styles.breedsChart__title}>
        <img width={ 50 } height={ 50 } src={ img } alt="dog fingerprint" />
        <h1>Breeds Chart</h1>
      </div>

    return { renderTitle, breedImagesPercent }
}

export default useBreedsChart