import React, { Component } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount(): void {
    window.onerror = ()=> {
      this.setState({ hasError: true })
      //Get the error parameters and send the error event to prometheus or Analytics
    }
  }

  componentDidCatch() {
    this.setState({ hasError: true });
    //Get the error parameters and send the error event to prometheus or Analytics
  }

  render() {
    if (this.state.hasError) {
      return <h1 className='errorBox'>Ups! something went wrong. Reload the page and try again.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;