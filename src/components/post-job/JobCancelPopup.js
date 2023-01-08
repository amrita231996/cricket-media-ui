
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";

export default function JobCancelPopuP({ open, setOpen, handleclose }) {
    const mobileView = useMediaQuery("(max-width:768px)");
    const navigate = useNavigate();
    const navigateToJobs = () => {
        navigate('/jobs');
    };
    const handleClose = () => {
        setOpen(false);
        handleclose();
    }
    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box class={mobileView ? 'styleMobile' : 'style'}>

                <div id="box1">

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure to Cancel This Form
                    </Typography>
                </div>

                <div id="box2">

                    <Button variant="contained" sx={{ float: 'left' }} onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" sx={{ float: 'right' }} onClick={navigateToJobs}>Ok</Button>
                </div>


            </Box>
        </Modal>
    );
}
