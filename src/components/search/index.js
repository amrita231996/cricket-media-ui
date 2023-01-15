import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Grid, Paper, Button } from "@mui/material";
import useScroller from "../../commons/useScroller.js";
import { Box } from "@mui/system";
import UserCard from "../followers/followers";
import SearchPosts from "./search-posts"
import Loader from "../../commons/components/Loader";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import AppContext from "../../context/AppContext";
import useInfiniteScroll from "../../commons/useScroller_new";

const Search = (props) => {
  const [state, setState] = useState({
    listItems: [],
    error: null,
    pageNum: 1,
    loadMore: true,
    searchText: props.searchText,
  })
  const didMount = useRef(false);
  const navigate = useNavigate()
  const accessToken = getStorageItem("token");
  const [searchTerm, setSearchTerm] = useState(props.searchText);
  const [followings, setFollowings] = useState([]);
  const [url, setUrl] = useState(
    global.config.ROOTURL.prod + "/auth/name-search"
  );
  const [query, setQuery] = useState(props.searchText);
  const [toggleSubmenu, setToggleSubmenu] = useState("matchprofile");

  const getSearchResults = (method, url, data) => {
    axios({
      method: method,
      url: url,
      headers: {
        Authorization: "Bearer " + getStorageItem('token'),
        "Content-Type": "application/json",
      },
      data: data,
    }).then((response) => {
      // console.log('api response', response, state, props)
      setState({
        ...state, listItems: response?.data?.length > 0 && state.searchText === props.searchText
          ? [...state.listItems, ...response?.data]
          : [...response?.data]
      })
    }).catch((err) => {
      setState({ ...state, pageNum: 0, error: err })
      setIsFetching(false)
      // console.log('error', error);
    });
  }

  const fetchMoreListItems = (pn, li, ps, st) => {
    // console.log('inside fetchMoreListItems', pn, li.length, ps, st)
    setIsFetching(true)
    if (props.searchText && state.pageNum > 0) {
      getSearchResults("POST",
        global.config.ROOTURL.prod + "/auth/name-search",
        {
          searchText: props.searchText,
          pageNumber: state.pageNum,
          pagePerSize: global.config.pagePerSize,
        }
      )
    } else {
      setIsFetching(false)
    }
  }

  const [isFetching, setIsFetching] = useInfiniteScroll(
    () => {
      if (state.loadMore) {
        fetchMoreListItems(state.pageNum, state.listItems, global.config.pagePerSize, props.searchText);
      }
    })

  useEffect(() => {
    // if ( !didMount.current ) {
    //   setState({ ...state, pageNum: 1, listItems: [], loadMore: false })
    //   return didMount.current = true;
    // }
    // console.log('search text update', state.pageNum, state.listItems.length, props.searchText)

    setState({ ...state, pageNum: 1, listItems: [], loadMore: true })

    if (searchTerm === "") {
      setFollowings([]);
    }

    if (props.searchText && state.pageNum === 1) {
      fetchMoreListItems(state.pageNum, state.listItems, global.config.pagePerSize, props.searchText)
    }
  }, [props.searchText]);

  useEffect(() => {
    // console.log('inside pageNum useEffect', state.pageNum, state.listItems.length)
  }, [state.pageNum]);

  useEffect(() => {
     // console.log('inside state.listItems useEffect', state.pageNum, state.listItems.length, newPageNum)
    if (state.listItems.length > 0) {
      const ppg = Math.floor(state.listItems.length / global.config.pagePerSize)
      const newPageNum = state.listItems.length === 0
        ? 1
        : (ppg > 0 && state.listItems.length % ppg === 0
          ? ppg + 1
          : 0)
      if (newPageNum === 0) {
        setState({ ...state, loadMore: false, pageNum: 1 })
      } else {
        setState({ ...state, loadMore: true, pageNum: newPageNum })
      }
      setIsFetching(false)
    } else {
      setIsFetching(false)
    }
  }, [state.listItems])

  const fetchFollowing = () => {
    const getFollowing = {
      method: "GET",
      url: global.config.ROOTURL.prod + "/auth/get-following-user/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }
    axios(getFollowing)
      .then((response) => {
        setFollowings(response.data ? response.data : []);
      })
      .catch((err) => {
        if (err?.response?.status == 401) {
          clearStorage()
          navigate('/login');
        }
      });
  };

  useEffect(() => {
    fetchFollowing();
  }, [query, url]);

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
                setUrl(global.config.ROOTURL.prod + "/auth/name-search");
              }}
            >
              Matching Profiles
            </Button>
            <Button
              variant={toggleSubmenu === "post" ? "contained" : "outlined"}
              className={
                toggleSubmenu === "post"
                  ? "post_btn contained"
                  : "post_btn outlined"
              }
              onClick={() => {
                setToggleSubmenu("post");
                setUrl(
                  global.config.ROOTURL.prod + "/pitch/search-pitch-by-text"
                );
              }}
            >
              Post
            </Button>
          </Box>
        </Grid>
      </Grid>
      <div className={state.listItems.length > 0 ? "search" : ""}>
        {toggleSubmenu === "matchprofile" &&
          <Grid container spacing={{ xs: 0, md: 2 }} className="search_page">
            {state.listItems?.map(
              (element, index) => {
                if (state.listItems.length === index + 1) {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                      <UserCard
                        following={element}
                        key={index}
                        followings={followings}
                      />
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <UserCard
                        following={element}
                        key={index}
                        followings={followings}
                      />
                    </Grid>
                  );
                }
              }
            )}
          </Grid>
        }
        {
          (isFetching && toggleSubmenu === "matchprofile") && (
            <Loader isLoading={isFetching} error={state.error} />
          )
        }
        {toggleSubmenu === "post" &&
          <SearchPosts query={query} />
        }
      </div>
    </div >
  );
};

export default Search;
