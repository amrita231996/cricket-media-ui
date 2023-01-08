import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RadioBtn from "../radio-button/radioBtn";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

const styleDesktop = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const styleMobile = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function Report(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const [style, setStyle] = useState();
  useEffect(() => {
    if (!matches) {
      setStyle(styleMobile);
    } else {
      setStyle(styleDesktop);
    }
  }, [matches]);

  const {post_id} = props;
  const reportTypeRef = React.useRef();
  const [reportType, setReportType] = React.useState('');
  const handleChange = (e) => {
    setReportType(e.target.value);
  };
  
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{}}
          >
            Report Pitch
          </Typography>

          <RadioBtn>
            <FormControlLabel
              name="report_type"
              ref={reportTypeRef}
              value="Harassment"
              onChange={handleChange}
              control={<Radio />}
              label="Harassment"
            />
            <FormControlLabel 
              name="report_type" value="Spam" 
              ref={reportTypeRef} 
              control={<Radio />} 
              label="Spam"
              onChange={handleChange} />
            <FormControlLabel
              name="report_type"
              ref={reportTypeRef}
              value="Plagiarism"
              control={<Radio />}
              label="Plagiarism"
              onChange={handleChange}
            />
            <FormControlLabel
              name="report_type"
              value="Adult Content"
              ref={reportTypeRef}
              control={<Radio />}
              label="Adult Content"
              onChange={handleChange}
            />
          </RadioBtn>
          <div style={{ flexDirection: 'row' }}>
            <Button onClick={props.handleClose}>Cancel</Button>
            <Button onClick={() => props.handleReportPost(reportType)}>Submit</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
