import { Component } from "react"

type ErrorBoundaryProps = { 
  children: Component[] 
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return <>
    <div>ErrorBoundary</div>
    { children }
  </>
}

export default ErrorBoundary