import React from "react";
import { Box, Paper } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import Loader from "../Loader";
import Post from "../../../components/posts/post";
import { useState, useRef, useCallback } from "react";
import useScroller from "../../useScroller";
import { getStorageItem } from "../../../utils/sessionStorage";

const ProfileList = ({userId}) => {
  const accessToken = getStorageItem("token");
  const [pageNum, setPageNum] = useState(1);
  const [query, setQuery] = useState("");
  // const [pageNum, setPageNum] = useState(1);
  // const [pagePerSize, setPagePerSize] = useState();
  // const [url, setUrl] = useState();

  let url = global.config.ROOTURL.prod +
  "/pitch/pitchByUserId/" +
  userId +
  "/" +
  pageNum +
  "/" +
  global.config.pagePerSize;

  const req = {
    method: "GET",
    url: url,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };
  

  const { isLoading, error, list, hasMore } = useScroller(
    query,
    pageNum,
    req
  );

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
    <Box sx={{ width: "100%", minHeight: "100%", padding: "20px", paddingTop: "0px" }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={{ xs: 1, sm: 2, md: 2 }}>
        {list.map((element, index) => {
          if ((list.length === index + 1)) {
            return (
              <Paper
                className="component posts"
                key={index}
                ref={lastElementRef}
              >
                <Post post={element} key={index} />
              </Paper>
            );
          } else {
            return (
              <Paper className="component posts" key={index}>
                <Post post={element} key={index} />
              </Paper>
            );
          }
        })}
      </Masonry>
      <Loader isLoading={isLoading} error={error} />
    </Box>
  );
};

export default ProfileList;
