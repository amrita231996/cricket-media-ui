import { useState, useEffect } from "react";
import axios from "axios";

function CommentUseScroller(pageNum, req, FeedId) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

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


