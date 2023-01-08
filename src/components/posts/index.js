import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Post from "./post";
import { BallTriangle } from "react-loader-spinner";
import "./index.scss";
import useScroller from "../../commons/useScroller_JSON_ARG";

const Posts = (props) => {
  const { filter, uid, FeedCreatedProps } = props;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showNewFeedBaner, setShowNewFeedBaner] = useState(false);

  const accessToken = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const [startDate, setStartDate] = useState(return1SecondPlusDate());

  /// Infinite scroller
  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [shouldLoadPage, setShouldLoadPage] = useState(false);
  let url = ''

  useEffect(() => {
    setShouldLoadPage(!shouldLoadPage);
  }, [FeedCreatedProps])

  useEffect(() => {
    setPageNum(1);
    setStartDate(return1SecondPlusDate());
  }, [shouldLoadPage])

  if (filter) {
    if (filter === "all_Feedes") {
      url = global.config.ROOTURL.prod + `/feed/getAll/${pageNum}/${global.config.pagePerSize}/${startDate}`;
    } else if (filter === "my_Feedes") {
      url = global.config.ROOTURL.prod + `/feed/getMyFeed/${pageNum}/${process.env.pagePerSize}`;
    } else if (filter === "user_Feedes") {
      url = global.config.ROOTURL.prod + "/feed/feedByUserId/" + uid + `/${pageNum}/${process.env.pagePerSize}`;
    }
  }


  const req = {
    method: "GET",
    url: url,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };
  const { isLoading, error, list, hasMore } = useScroller({ query, pageNum, req, shouldLoadPage });
  // // console.log('list',list.length);
  console.log('list',list,url);
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

  useEffect(() => {
    global.config.socketInstance.on("onFeedCreated", async (followers) => {
      console.log('onFeedCreated',followers);
      try {
        if (followers.includes(userId)) {
          setShowNewFeedBaner(true);
        }
      } catch (err) {
        // console.log("error on run change", err);
      }
    });
  }, []);

  return (
    <>
      <div className="component posts">
        <label
          hidden={!showNewFeedBaner}
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => {
            setShowNewFeedBaner(false);
            window.location.reload();
          }}
        >
          new feed is available click here
        </label>
        {list.map((post, index) => {
          if ((list.length === index + 1)) {
            return (
              <div ref={lastElementRef} key={index}>
                <Post
                  key={index}
                  post={post}
                  hprops={() => { setShouldLoadPage(!shouldLoadPage); }}
                />
              </div>
            );
          } else {
            return (
              <div key={index}>
                <Post
                  key={index}
                  post={post}
                  hprops={() => { setShouldLoadPage(!shouldLoadPage); }}
                />
              </div>
            );
          }
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "40px" }}>
        {isLoading && (
          <BallTriangle
            height="100"
            width="100"
            color="grey"
            ariaLabel="loading"
          />
        )}
      </div>
      <div style={{ color: "white" }}>{error && "Error"}</div>
    </>
  );
};

const return1SecondPlusDate = () => {
  let t = new Date();
  // console.log('ttt1',t);
  t.setSeconds(t.getSeconds() + 100);
  // console.log('ttt2',t);
  return t;
}
export default Posts;
