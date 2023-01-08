import { BallTriangle } from "react-loader-spinner";

const Loader = ({isLoading, error}) => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          {isLoading && (
            <BallTriangle
              height="100"
              width="100"
              color="grey"
              ariaLabel="loading"
            />
          )}
        </div>
        <div style={{ color: "white" }}>{error && "Error"}</div>
      </div>
    );
  };

  export default Loader;