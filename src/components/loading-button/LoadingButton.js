import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";

const LoadingButton = (props) => {
  const {
    loading,
    success,
    setSuccess,
    setLoading,
    buttonValue,
    handleClick,
    setButtonValue,
    style,
    disabled
  } = props;
  const timer = React.useRef();

  let buttonSx = '';
  const isDisabled = disabled;
  
  if(style) {
     buttonSx = style
  } else {
      buttonSx = {
        borderRadius: 2,
        width: "45%",
        height: "35px",
        m: "2.5%",
        backgroundColor: "transparent",
        border: "1px solid",
        mt: "18px",
        color: "white",
        display: "flex",
        alignItems: "flex-start",
        minWidth: "136px",
        // maxWidth: "100%"
      };
   }
//   React.useEffect(() => {
//     return () => {
//       clearTimeout(timer.current);
//     };
//   }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      handleClick();
    //   timer.current = window.setTimeout(() => {
    //     setLoading(false);
    //   }, 2000);
    }
  };
  

  return (
    // <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ position: "relative" }}>
        <Button
          variant="outlined"
          type="submit"
          sx={buttonSx}
          disabled={loading || isDisabled}
          onClick={() => handleButtonClick()}
        >
          {buttonValue}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
       </Box> 
    // </Box>
  );
};

export default LoadingButton;
