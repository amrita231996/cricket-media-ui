import { useState, useEffect } from "react";
import axios from "axios";

function useScroller ({query, pageNum, req, url, search,shouldLoadPage}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setList([]);
     // console.log('hello',pageNum);

    if(pageNum === 1) {
    const CancelToken = axios.CancelToken;
    let cancel;

    setIsLoading(true);
    setError(false);

    axios(req, {
        cancelToken: new CancelToken((c) => (cancel = c))
      })
      .then((res) => {
        setList((prev) => {
          return ([...res.data]);
        });
        setHasMore(res.data.length > 0);
        setIsLoading(false);
      })
    }
      
  }, [query,shouldLoadPage]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let cancel;

    setIsLoading(true);
    setError(false);

    axios(req, {
        cancelToken: new CancelToken((c) => (cancel = c))
      })
      .then((res) => {
        setList((prev) => {
          return [...new Set([...prev, ...res.data])];
        });
        setHasMore(res.data.length > 0);
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(err);
      });

    return () => cancel();
  }, [pageNum]);

  return { isLoading, error, list, hasMore };
}

export default useScroller;
