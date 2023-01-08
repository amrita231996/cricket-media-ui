
import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    useMediaQuery,
    Card,
    Box,
    Grid,
    Link,
    Container,
    main,
    Button,
    ThemeProvider,
    createTheme,
    Avatar,
} from "@mui/material";
import suitcase from "./../../assets/images/icons/suitcase.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularFaBookmark } from '@fortawesome/free-regular-svg-icons';
import { getStorageItem } from "../../utils/sessionStorage";

import config from "../../config";

const baseURL = config.ROOTURL.prod;

const userId = getStorageItem("user_id");
const accessToken = getStorageItem("token");

const pagePerSize = config.pagePerSize;
const PostedJob = () => {
    const navigate = useNavigate();
    const mobileView = useMediaQuery("(max-width:959px)");
    const [post, setPost] = useState([]);
    const [error, setError] = useState(null);
    let JobId;
    const getJobId = (id) => {
        JobId = id;
        console.log("this is getJobId function", JobId);
        window.location.href = `/job-description/${JobId}`
    }
    const saveJob = (id) => {
console.log("This is save function call:");
const saveJobInfo = {
    method: "POST",
    url: global.config.ROOTURL.prod + "/job/saveJob",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    data: {
        jobId:id,
        userId:userId,
    },
  };
axios(saveJobInfo).then((response) => {
    if (response) {
        fetchData();
    }
    else {
        console.log("error occured:");
    }

}).catch((error) => {
    console.log(error);
});

    }

    const deleteSavedJob = (id) => {
        let jobId = id;
        axios.delete(`${baseURL}/job/deleteSavedJob/${jobId}/${userId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            }
        }).then((response) => {
            if (response.data.deletedCount) {
                fetchData();
            }
            else {
                console.log("error occured:");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const fetchData = async () => {

        const postedJob = axios.get(`${baseURL}/job/getAll`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            }
        });

        let pageNumber = 1;
        const savedJob = axios.get(`${baseURL}/job/getSavedjobsByUserId/${userId}/${pageNumber}/${20}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            }
        });
        const results = await Promise.all([postedJob, savedJob])
        console.log(results);
        const postedJobData = results[0].data.data;
        const savedJobData = results[1].data.data;
        const savedJobDataJobIds = savedJobData.map(s => (s.jobId))
        const updatePostedJobData = postedJobData.map(d => {
            console.log("hey i am active")
            if (savedJobDataJobIds.includes(d._id.toString())) {
                d.isSaved = true;
            }
            return d;
        })
        console.log(updatePostedJobData,"updatedfdafja;t")

        setPost(updatePostedJobData)

    }

    useEffect(() => {

        fetchData();
    }, []);
    if (error) return `Error: ${error.message}`;
    if (!post) return "No post!"
    const theme = createTheme(
        {
            typography: {
                fontFamily: 'poppins, Arial',
            },
        }
    );

    return post.map((data) => {
        // {console.log("post poste",post)}
        return (
              
                
                <ThemeProvider theme={theme}>
                {/* <main className="Feed-main"> */}
                <Card variant="outlined" sx={{ minWidth: 275, mb: .3, borderRadius: 3 }}  >
                    {/* <React.Fragment> */}
                    <Grid container spacing={mobileView ? 0 : 2}>
                        {/* spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} */}

                        <Grid item textAlign={'center'} xs={3} sm={2} md={2} lg={2} sx={{ borderRadius: "12px solid purple" }}>
                            <img src={data.companyLogo ? data.companyLogo : suitcase} alt='' width={55} height={55} style={{ margin: 23, border: "2px solid purple", borderRadius: 50 }} />
                        </Grid>
                        <Grid item xs={9} sm={10} md={10} lg={10} >
                            <CardContent>

                                {/* <Link onClick={(event) => window.location.href = '/job-description'} about='_blank' sx={{ textDecoration: 'none' }}> */}
                                <Box sx={{display:"flex"}}>

                                    <Link onClick={() => getJobId(data._id)} about='_blank' underline="hover" >
                                    {/* {console.log( "id",data._id)} */}
                                        <Typography variant="h6" component="div" sx={{ display: 'inline-block', color: '#0C5BA0', cursor: "pointer" }}>
                                            {data.jobTitle}
                                        </Typography>
                                    </Link>

                                    <Typography variant="h6" sx={{ textAlign: 'right', float: 'right', display: 'inline-block', ml: 'auto', color: '#870499', }} component="div">


                                        <Link onClick={() => { data.isSaved ? deleteSavedJob(data._id) : (saveJob(data._id)) }}>

                                            <FontAwesomeIcon icon={data.isSaved ? faBookmark : regularFaBookmark} />

                                        </Link>
                                    </Typography>
                                </Box>

                                <Box sx={{fontSize:"0.9rem" }}>
                                    <Typography sx={{ display: 'inline-block' }}> {data.companyName} </Typography>
                                    <Typography sx={{ display: 'inline-block' }}  >({data.jobLocation})</Typography>
                                </Box>
                                <Box sx={{ display: 'flex',fontSize:"0.9rem",height:50 }}>
                                    <Box sx={{ display: 'inline-block' }} >
                                        <Typography sx={{ display: 'inline-block', color: '#870499' }}  ><FontAwesomeIcon icon={faMoneyBill} />&nbsp;  </Typography>
                                        <br />
                                        <Typography sx={{ display: 'inline-block', color: '#870499' }}> <FontAwesomeIcon icon={faFolderOpen} />&nbsp; </Typography>

                                    </Box>
                                    <Box sx={{ display: 'inline-block' }} >
                                        <Typography sx={{ display: 'inline-block'}} > {data.Remuneration}</Typography>
                                        <br />
                                        <Typography sx={{ display: 'inline-block' }} > {data.Experience}
                                        </Typography>
                                    </Box>
                                </Box>

                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>

               </ThemeProvider >
          
          
            );
    })
};
export default PostedJob;