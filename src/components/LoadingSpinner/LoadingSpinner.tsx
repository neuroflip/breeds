
import SpinnerDiv from "./styled/SpinnerDiv"

const LoadingSpinner = () => {
  return <SpinnerDiv role="progressbar" aria-label="Content loading" aria-busy="true" aria-live="polite"></SpinnerDiv>
}

export default LoadingSpinner