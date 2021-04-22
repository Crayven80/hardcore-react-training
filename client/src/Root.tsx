import { Global } from "@emotion/react";
import { FunctionComponent } from "react";
import App from "./components/App";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import backgroundImg from "./assets/money.jpg";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return <div>oh noes</div>;
};

const Root: FunctionComponent = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Global
          styles={{
            html: {
              fontFamily: "Comic Sans MS",
              backgroundImage: `url(${backgroundImg})`
            }
          }}
        />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
};

export default Root;
