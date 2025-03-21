
type ErrorBoxProps = { 
  errorMessage: string
} 

const ErrorBox = ({ errorMessage }: ErrorBoxProps) => {
  return (<>
    <p>
      { errorMessage }
    </p>
    <p>Please, retry again later</p>
  </>)
}

export default ErrorBox