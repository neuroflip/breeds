
import styles from './styles/errorBox.module.css'

type ErrorBoxProps = {
  errorMessage: string
}

const ErrorBox = ({ errorMessage }: ErrorBoxProps) => {
  return (<div className={ styles.errorBox } role="alert">
    <p>{ errorMessage }</p>
    <p>Please, retry again later</p>
  </div>)
}

export default ErrorBox