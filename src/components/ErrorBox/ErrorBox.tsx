
import styles from './errorBox.module.css'

type ErrorBoxProps = {
  errorMessage: string
}

const ErrorBox = ({ errorMessage }: ErrorBoxProps) => {
  return (<div className={styles.errorBox}>
    <p>
      Oooops! { errorMessage }
    </p>
    <p>Please, retry again later</p>
  </div>)
}

export default ErrorBox