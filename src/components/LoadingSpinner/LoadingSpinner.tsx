
import styles from './styles/loadingSpinner.module.css'

const LoadingSpinner = () => {
  return <div className={ styles.loadingSpinner } role="progressbar" aria-label="Content loading" aria-busy="true" aria-live="polite"></div>
}

export default LoadingSpinner