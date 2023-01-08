import { useState, useEffect } from "react";
import axios from "axios";

function CommentUseScroller(pageNum, req, FeedId) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);


  useEffect(() => {
    global.config.socketInstance.on("onNewCommentCreated", async (updatedValue) => {
      try {
        if (updatedValue.postId === FeedId) {
          setList([{...updatedValue},...list].sort((a,b)=>(new Date(b.createdDate) - new Date(a.createdDate))));
        }
      } catch (err) {
        console.log('error on run change', err);
      }
    });
  }, [])

  useEffect(() => {

    const CancelToken = axios.CancelToken;
    let cancel;
    setIsLoading(true);
    setError(false);
    if (pageNum === 1) {
      setList([]);
    }
    axios(req, {
      cancelToken: new CancelToken((c) => (cancel = c))
    })
      .then((res) => {
        console.log(res)
        setList((prev) => {

          if (pageNum === 1) {
            return ([...res.data]);
          }
          return [...new Set([...prev, ...res.data])];
        });
        setHasMore(res.data.length > 0);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error")
        if (axios.isCancel(err)) return;
        setError(err);
      });

    return () => cancel();
  }, [pageNum]);

  return { isLoading, error, list, hasMore };
}

export default CommentUseScroller;


