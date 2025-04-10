import { useNavigate } from "react-router-dom";
import { Component } from "react";
import ErrorIcon from "../shared/assets/icon/ErrorIcon";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }


  handleRefresh = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center gap-[8px] mt-[300px]">
           <ErrorIcon />
          <h1 className="text-[32px] text-white font-bold">Oops..</h1>
          <p className="text-[17px] font-normal text-white">
            Something went wrong.
          </p>
          <button
            aria-label="refresh"
            onClick={this.handleRefresh}
            className="flex py-2 px-4 rounded-[8px] bg-[#FDD835] hover:bg-[#FFEB3B] active:scale-[0.9]"
          >
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;