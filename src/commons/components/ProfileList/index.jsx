import React from 'react'
import {
    Box,
    Paper,
} from "@mui/material";
import Masonry from '@mui/lab/Masonry';

import Post from "../../../components/posts/post";

const ProfileList = ({ list }) => (
    <Box sx={{ width: '100%', minHeight: '100%', padding: '20px' }}>
       <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={{ xs: 1, sm: 2, md: 2 }}>
            {list.map((element, index) => (
                <Paper className="component posts" key={index}>
                    <Post post={element} key={index} />
                </Paper>
            ))}
        </Masonry>
    </Box>
)

export default ProfileList
