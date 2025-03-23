
import ErrorBoxDiv from "./styled/ErrorBoxDiv"

type ErrorBoxProps = {
  errorMessage: string
}

const ErrorBox = ({ errorMessage }: ErrorBoxProps) => {
  return (<ErrorBoxDiv aria-label="Error content" role="alert" aria-live='polite'>
    <p>{ errorMessage }</p>
    <p>Please, retry again later</p>
  </ErrorBoxDiv>)
}

export default ErrorBox