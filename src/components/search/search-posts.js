import React from "react";
import { Box, Paper } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import Loader from "../../commons/components/Loader";
import Post from "../../components/posts/post";
import { useState, useRef, useCallback } from "react";
import useScroller from "../../commons/useScroller";
import { getStorageItem } from "../../utils/sessionStorage";

const SearchPosts = ({ data, query }) => {
  const accessToken = getStorageItem("token");
  const [pageNum, setPageNum] = useState(1);

  let url = global.config.ROOTURL.prod + "/pitch/search-pitch-by-text";

  const req = {
    method: "POST",
    url: url,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    data: {
      searchText: query,
      pageNumber: pageNum,
      pagePerSize: global.config.pagePerSize,
    },
  };

  const search = true;

  const { isLoading, error, list, hasMore } = useScroller(
    query,
    pageNum,
    req,
    url,
    search
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
    <Box margin={"20px"}>
      <Box sx={{ width: "auto", marginLeft: { sm: '-16px', md: '0' }, minHeight: "100%", padding: { xs: 0, md: '0 30px 0 0px' } }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={{ xs: 1, sm: 2 }} sx={{ float: { xs: 'right', md: 'none' } }}>
          {list.map((element, index) => {
            if (list.length === index + 1) {
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
    </Box>
  );
};

export default SearchPosts;
