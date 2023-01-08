import Header from "../../components/header";
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import Followings from "../../components/followers/followers";
import { Grid } from "@mui/material";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CommentUseScroller from "./CommentUseScroller";
import { BallTriangle } from "react-loader-spinner";
import "./index.scss";
import axios from "axios";
import AppContext from "../../context/AppContext";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import { useNavigate } from "react-router-dom";
import CommentBox from "../comments/CommentBox";
// import useScroller from "../../commons/useScroller";


const Commentpagination = ({ id }) => {
  const navigate = useNavigate()
  const userId = getStorageItem("user_id");
  const accessToken = getStorageItem("token");
  const [suggestions, setSuggestions] = useState([]);
  const [followings, setFollowings] = useState([]);

  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const req = {
    method: "GET",
    url:
      global.config.ROOTURL.prod +
      `/pitch/comment/getByPitchId/${id}/${pageNum}/${global.config.pagePerSize}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  const { isLoading, error, list, hasMore } = CommentUseScroller(pageNum, req,id);
  
  // const { isLoading, error, list, hasMore } = useScroller(query, pageNum, req);

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

  

  return (

    <div>

      {
        error
          ?
          <div style={{ color: "red" }}>{error && "Error"}</div>
          :
          <div >
          

                    {list.map((comment, index) => {
                      if (list.length === index + 1) {
                        return (
                          <Grid
                            ref={lastElementRef}
                            key={index}
                            className="comment-wrapper"
                            item
                           
                          >
                            {
                              <CommentBox key={index} comment={comment} />
                            }
                          </Grid>
                        );
                      } else {
                        return (
                          <Grid item key={index} className="comment-wrapper"  >
                            {
                              <CommentBox key={index} comment={comment} />
                           }
                          </Grid>
                        );
                      }
                    })}
                
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
          </div>
      }
    </div>
  );
};
export default Commentpagination;