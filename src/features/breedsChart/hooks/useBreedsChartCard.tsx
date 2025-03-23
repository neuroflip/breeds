import { useAppSelector } from "../../../store/hooks"
import { selectBreedsByTotalImagePercentage } from "../slices/selectors"

import styles from '../styles/breedsChartCard.module.css'
import img from '../images/dogFingerprint.png'

const useBreedsChartCard = () => {
    const breedImagesPercent = useAppSelector(selectBreedsByTotalImagePercentage)

    const renderTitle = () =>
      <div className={styles.breedsChartCard__title}>
        <img width={ 35 } height={ 35 } src={ img } alt="dog fingerprint" />
        <h1>Breeds Chart</h1>
      </div>

    return { renderTitle, breedImagesPercent }
}

export default useBreedsChartCard