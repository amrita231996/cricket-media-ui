import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./index.scss";
import { Grid, Paper, Button } from "@mui/material";
// import useScroller from "../../commons/useScroller.js";
import { Box } from "@mui/system";
import UserCard from "../followers/followers";
import SearchPosts from "./search-posts"
import Loader from "../../commons/components/Loader";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import AppContext from "../../context/AppContext";
import useInfiniteScroll from "../../commons/useScroller_new";
import sagaActions from "../../redux/actions";
import { setSearchByProfileData } from "../../redux/reducers/searchByProfile";

const Search = (props) => {
  const appContext = useContext(AppContext);
  const { searchText } = appContext
  console.log('searchText',searchText);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = localStorage.getItem("token");
  const [searchByPostData, setSearchByPostData ] = useState([]);
  const followingUsers = useSelector((state) => state.followingUsers)
  const { followingUsersData, followingUsersError } = followingUsers
  let searchByPostSearchText = "";

  useEffect(() => {
    if (searchText) {
      fetchMoreListItems()
    }
  }, [searchText])

  const [toggleSubmenu, setToggleSubmenu] = useState("matchprofile");

  const searchProfile = () => {
    const option = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/auth/name-search",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      data: {
        searchText
      },
    };
    axios(option)
      .then((res) => {
        console.log('res.data',res.data);
        setSearchByPostData(res.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const fetchMoreListItems = () => {
    if (searchText) {
      let pageNum = searchByPostData.length === 0 ? 1 : 0
      let prevData = []
      if (searchByPostSearchText != searchText) {
        pageNum = 1 
        searchByPostSearchText = searchText;
      } else if ((searchByPostData.length % global.config.pagePerSize) === 0) {
        const ppg = Math.floor(searchByPostData.length / global.config.pagePerSize)
        const newPageNum = searchByPostData.length === 0
          ? 1
          : (ppg > 0 && searchByPostData.length % ppg === 0
            ? ppg + 1
            : 0)
        pageNum = newPageNum
        prevData = searchByPostData
      }

      if (pageNum > 0) {
        searchProfile()
        // dispatch(setSearchByProfileData(searchText))
        // dispatch({
        //   type: sagaActions.USERPROFILE_DATA_FETCH,
        //   payload: {
        //     data: {
        //       searchText: searchText,
        //       pageNumber: pageNum,
        //       pagePerSize: global.config.pagePerSize,
        //     },
        //     prevData: prevData,
        //   }
        // })
      }
    } else {
      setIsFetching(false)
    }
  }

  const [isFetching, setIsFetching] = useInfiniteScroll(
    () => {
      fetchMoreListItems();
    })


  useEffect(() => {
    if (followingUsersError?.response?.status == 401) {
      clearStorage()
      navigate('/login');
    }
  }, [followingUsersError])

  return (
    <div>
      <Grid container spacing={0} className="search_page">
        <Grid item xs={12} sm={6} md={6} style={{ margin: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: { xs: 'center', sm: 'left' } }}>
            <label className="recent_search">Recent Search</label>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} style={{ margin: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: { xs: 'center', sm: 'right' } }}>
            <Button
              variant={
                toggleSubmenu === "matchprofile" ? "contained" : "outlined"
              }
              className={
                toggleSubmenu === "matchprofile"
                  ? "matching_profilies_btn contained"
                  : "matching_profilies_btn outlined"
              }
              onClick={() => {
                setToggleSubmenu("matchprofile");
                // setUrl(global.config.ROOTURL.prod + "/auth/name-search");
              }}
            >
              Matching Profilies
            </Button>
          </Box>
        </Grid>
      </Grid>
      <div className={searchByPostData.length > 0 ? "search" : ""}>
        {toggleSubmenu === "matchprofile" &&
          <Grid container spacing={{ xs: 0, md: 2 }} className="search_page">
            {searchByPostData?.map(
              (element, index) => {
                if (searchByPostData.length === index + 1) {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                      <UserCard
                        following={element}
                        key={index}
                        followings={followingUsersData}
                      />
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <UserCard
                        following={element}
                        key={index}
                        followings={followingUsersData}
                      />
                    </Grid>
                  );
                }
              }
            )}
          </Grid>
        }
        {
          (toggleSubmenu === "matchprofile") && (
            <Loader isLoading={isFetching} error={followingUsersError} />
          )
        }
    
      </div>
    </div >
  );
};

export default Search;
