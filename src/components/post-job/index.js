import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { FormControl, Grid, MenuItem, InputLabel, Container, CssBaseline, Button } from '@mui/material';
import Select from '@mui/material/Select';
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getStorageItem } from "../../utils/sessionStorage";
import config from '../../config';
import { useNavigate } from "react-router-dom";
import { TouchAppRounded } from "@material-ui/icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CodeSnippet } from "carbon-components-react";
import Crop from "./Crop";

import cancel from "../../assets/images/icons/cancel-logo.svg";
import JobCancelPopuP from "./JobCancelPopup";

const baseURL = config.ROOTURL.prod;

const PostJob = () => {
    const navigate = useNavigate();
    const navigateToJobs = () => {
        navigate('/jobs');
    };
    const [companyName, setCompanyName] = useState("");
    const [companyLogo, setCompanyLogo] = useState("");
    const [department, setDepartment] = useState("");
    const [jobTitle, setjobTitle] = useState("");
    const [workPlaceType, setWorkPlaceType] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [experience, setExperience] = useState("");
    const [qualification, setQualification] = useState("");
    const [remuneration, setRemuneration] = useState("");
    const [otherRequirements, setOtherRequirements] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [image, setImage] = useState("");
    const [next, setNext] = useState("true");
    const userID = getStorageItem("user_id");
    const userName = getStorageItem("full_name");
    const userEmail = getStorageItem("user_email");
    const accessToken = getStorageItem("token");
    const [message, setMessage] = useState("");
    const [disable, setDisable] = useState(true);
    const [jobValue, setjobValue] = useState("");
    const [ValidationFirst, setValidationFirst] = useState(false);
    const [ValidationSecoundPage, setValidationSecound] = useState(false);
    const [openlogoCrop, setlogocrop] = useState(false);
    const [isopen, setisopen] = useState(false);
    const [popupData, setpopupData] = useState(false);


    const handleNext = () => {
        if (companyName === "" || department === "" || workPlaceType === "" || jobLocation === "" || jobTitle === "" || employmentType === "") {
            console.log(companyLogo)
            setValidationFirst(true)

            return;
        }
        setNext(false);
        uploadImage();
    }
    let handleSubmit = async (e) => {
        if (remuneration === "" || experience === "" || qualification === "" || jobValue === "") {
            setValidationSecound(true)

            return;
        }


        //...call save file api if we will add file
        const option = {
            "jobTitle": jobTitle,
            "userId": userID,
            "userName": userName,
            "companyName": companyName,
            "companyLogo": companyLogo,
            "companyEmail": userEmail,
            "jobLocation": jobLocation,
            "companyContact": "",
            "employmentType": employmentType,
            "jobDescription": jobValue,
            "workPlaceType": workPlaceType,
            "Experience": experience,
            "Qualification": qualification,
            "Remuneration": remuneration,
            "OtherJobrequirements": otherRequirements,
            'Department': department,
            'jobDescriptionsFileName': jobValue,
            
        }
        console.log(option.jobDescription, "option")

        console.log("this is option", option);
        let postData = {
            method: "POST",
            url: `${baseURL}/job/createJob`,
            data: option,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };
        axios(postData).then((response) => {
            console.log("this is post response:", response)
            if (response) {
                toast.success("Job Posted Successfully", { theme: "colored" });
                setTimeout(() => {
                    window.location.href = "/jobs";
                }, 1000);

            }
            else {
                toast.error("Some Error Occured", { theme: "colored" });
                console.log("error occured:");
            }
        }).catch((error) => {
            console.log(error);
        });
    };
    const theme = createTheme(
        {
            typography: {
                fontFamily: 'poppins, Arial',
            },
        }
    );
    const uploadImage = () => {
        console.log(companyLogo)
        const formData = new FormData();
        formData.append("uploader", companyLogo);
        console.log("This is upload img function call:");
        axios.post(`${baseURL}/upload-file`, formData, {
            headers: {
                Authorization: "Bearer " + accessToken,
            }
        }).then((response) => {
            if (response.data) {
                console.log("Image saved successfully");
                console.log(response.data[0].location)
                setCompanyLogo(response.data[0].location);
            }
            else {
                console.log("error occured:");
            }

        }).catch((error) => {
            console.log(error);
        });
    }

    const opencrop = () => {
        setlogocrop(true);
    }
    const onChangeprofilepic = (file) => {
        setCompanyLogo(file);
        setlogocrop(false);
    }
    const handleClose = () => {
        setisopen(false);
        setpopupData(false)
       
      }
      const handlePOpup=()=>{
        setisopen(true);
        setpopupData(true);
      }
      useEffect(()=>{},[popupData])
    return (
        <ThemeProvider theme={theme} >
            {console.log(popupData)}
            {(next) &&
                <Grid>

                    <Container component="main" maxWidth="sm" >

                        <CssBaseline />

                        <Box sx={{ marginTop: 6, padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', border: 1, borderRadius: 3, backgroundColor: 'white' }}>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField id="standard-basic" label="Company Name*" size="small" variant="outlined" fullWidth sx={{ marginBottom: 2 }}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    value={companyName}
                                    onClick={(e) => { setlogocrop(false) }}

                                    error={ValidationFirst && companyName === ""}

                                />

                                <TextField id="standard-basic" label="Department*" size="small" variant="outlined" fullWidth sx={{ marginBottom: 2 }}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    value={department}
                                    error={ValidationFirst && department === ""}
                                    onClick={(e) => { setlogocrop(false) }}
                                />

                                <TextField id="standard-basic" label="Job Title*" size="small" variant="outlined" fullWidth sx={{ marginBottom: 2 }}
                                    onChange={(e) => setjobTitle(e.target.value)}
                                    value={jobTitle}
                                    error={ValidationFirst && jobTitle === ""}
                                    onClick={(e) => { setlogocrop(false) }}
                                />

                                <TextField id="standard-basic" label="Job Location*" size="small" variant="outlined" fullWidth sx={{ marginBottom: 2 }}
                                    onChange={(e) => setJobLocation(e.target.value)}
                                    value={jobLocation}
                                    error={ValidationFirst && jobLocation === ""}
                                    onClick={(e) => { setlogocrop(false) }}
                                />

                                <FormControl size="small" fullWidth sx={{ marginBottom: 2 }} onClick={(e) => { setlogocrop(false) }}>
                                    <InputLabel id="demo-select-small">Workplace Type*</InputLabel>
                                    <Select error={ValidationFirst && workPlaceType === ""}
                                        labelId="demo-select-small" id="demo-select-small" label="Workplace Type" value={workPlaceType}
                                        onChange={(e) => setWorkPlaceType(e.target.value)} required >
                                        <MenuItem value="Onsite" >On-site</MenuItem>
                                        <MenuItem value="Hybrid">Hybrid</MenuItem>
                                        <MenuItem value="Remote">Remote</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl size="small" fullWidth sx={{ marginBottom: 2 }} onClick={(e) => { setlogocrop(false) }}>
                                    <InputLabel id="demo-select-small">Employement Type*</InputLabel>
                                    <Select error={ValidationFirst && employmentType === ""}
                                        labelId="demo-select-small" id="demo-select-small" value={employmentType} label="Employement type*"
                                        onChange={(e) => setEmploymentType(e.target.value)} >
                                        <MenuItem value="Full-Time" >Full-Time</MenuItem>
                                        <MenuItem value="Part-Time" >Part-Time</MenuItem>
                                        <MenuItem value="Contract" >Contract</MenuItem>
                                        <MenuItem value="Internship">Internship</MenuItem>
                                        <MenuItem value="Volunteer">Volunteer</MenuItem>
                                    </Select>
                                </FormControl>
                                <Crop onChangeprofilepic={onChangeprofilepic} />
                                <Box component="span" m={1} sx={{ mt: 3, textAlign: 'center' }} >
                                    <Button variant="contained" sx={{ mt: 3, ml: 'auto', float: 'left' }} color="primary" onClick={navigateToJobs}> Cancel</Button>
                                    <Button variant="contained" sx={{ mt: 3, ml: 'auto', float: 'right' }} onClick={handleNext} >
                                        Next
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Grid>
            }

            {(!next) &&
                <Grid>

                    <Container Container component="main" maxWidth="sm" >

                        <CssBaseline />
                        <Box sx={{ marginTop: 6, padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', border: 1, borderRadius: 3, backgroundColor: 'white' }}>

                            <Box sx={{width:'100%',margin: '-3% 0% 0% 7%;'}}> 
                            <img
                                src={cancel}
                                className="icon-btn"
                                alt=""
                                role="button"
                                style={{height:20,marginLeft:"96%",cursor: "pointer"}}
                                onClick={handlePOpup}
                            />
                            {popupData &&  <JobCancelPopuP open={isopen} setOpen={setisopen} handleclose={handleClose} />}
                              

                            </Box>

                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField id="standard-basic" label="Experience*" size="small" variant="outlined" fullWidth sx={{ marginBottom: 2 }}
                                    onChange={(e) => setExperience(e.target.value)} value={experience} error={ValidationSecoundPage && experience === ""}
                                />

                                <TextField id="standard-basic" label="Qualification*" size="small" variant="outlined" fullWidth sx={{ marginBottom: 2 }}
                                    onChange={(e) => setQualification(e.target.value)} value={qualification} error={ValidationSecoundPage && qualification === ""}
                                />

                                <TextField id="standard-basic" label="Remuneration*" size="small" variant="outlined" fullWidth sx={{ marginBottom: 2 }}
                                    onChange={(e) => setRemuneration(e.target.value)} value={remuneration} error={ValidationSecoundPage && remuneration === ""}
                                />

                                <TextField id="standard-basic" label="Other requirements" size="small" variant="outlined" fullWidth sx={{ marginBottom: 2 }}
                                    onChange={(e) => setOtherRequirements(e.target.value)} value={otherRequirements}
                                />

                                <div>
                                    <ReactQuill
                                        theme="snow"
                                        value={jobValue}
                                        placeholder="PLEASE FILL JOB DESCRIPTION"
                                        onChange={setjobValue}
                                    />
                                    {(ValidationSecoundPage && jobValue === "") ? <p style={{ color: "red", marginTop: 0, fontSize: 12 }}>please fill the job description*</p> : ""}
                                </div>



                                <Button variant="contained" sx={{ mt: 3 }} onClick={() => setNext(true)}>
                                    Previous
                                </Button>
                                <Button variant="contained" sx={{ mt: 3, float: 'right' }} onClick={handleSubmit}>
                                    Publish the job
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Grid>
            }
        </ThemeProvider >
    );
};


export default PostJob;
