import Header from "../../components/header";
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import Followings from "../../components/followers/followers";
import { Grid } from "@mui/material";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useScroller from "../../commons/useScroller";
import { BallTriangle } from "react-loader-spinner";
import "./index.scss";
import axios from "axios";
import AppContext from "../../context/AppContext";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PathAction } from "../../redux/reducers/globalPath";


const SuggestionsPage = () => {
  const navigate = useNavigate()
  const userId = getStorageItem("user_id");
  const accessToken = getStorageItem("token");
  const [suggestions, setSuggestions] = useState([]);
  const [followings, setFollowings] = useState([]);

  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const path=window.location.pathname;
  const dispatch=useDispatch();
  dispatch(PathAction.handlePath({payload:path}))
  
  const req = {
    method: "GET",
    url:
      global.config.ROOTURL.prod +
      `/auth/get-all-suggestion-users/${pageNum}/${global.config.pagePerSize}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  const { isLoading, error, list, hasMore } = useScroller(query, pageNum, req);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const fetchFollowing = () => {
    const getFollowing = {
      method: "GET",
      url:
        global.config.ROOTURL.prod +
        "/auth/get-all-following-byuserid/" +
        `${userId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    axios(getFollowing)
      .then((response) => {
        // console.log(response.data)
        setFollowings(response.data ? response.data : []);
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          clearStorage()
          navigate('/login');
        }
      });
  };

  const appContext = useContext(AppContext);
  const { setShowFooter } = appContext

  
  useEffect(() => {
    // getSuggestions();
    fetchFollowing();
    setShowFooter(true)
  }, []);
  
  return (
    
    <div>

    {
      error 
      ?
      <div style={{ color: "red" }}>{error && "Error"}</div>
      :
      <div className="page suggestion">
      <div className="tabs suggestions-main">
        <Tabs style={{ width: "100%" }}>
          <TabList>
            <Tab style={{ color: "black" }}>People to follow</Tab>
          </TabList>
          <TabPanel>
            <Grid container spacing={2}>
             
              {list.map((suggestion, index) => {
                if (list.length === index + 1) {
                  return (
                    <Grid
                      ref={lastElementRef}
                      key={index}
                      item
                      xs={12}
                      sm={6}
                      lg={4}
                      >
                      <Followings
                        following={suggestion}
                        followings={followings ? followings : []}
                      />
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item key={index} xs={12} sm={6} lg={4}>
                      <Followings
                        following={suggestion}
                        followings={followings ? followings : []}
                      />
                    </Grid>
                  );
                }
              })}
            </Grid>
          </TabPanel>
        </Tabs>
      </div>
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
            height="50"
            width="50"
            color="grey"
            ariaLabel="loading"
          />
        )}
      </div>
    </div>
     }
                      </div>
  );
};

export default SuggestionsPage;

