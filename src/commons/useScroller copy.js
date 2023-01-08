import { useState, useEffect } from "react";
import axios from "axios";

function useScroller(query, pageNum, req, url, search) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    let cancel;

    if (search) {
      // console.log('hitter', query, url, pageNum)
      if (pageNum === 1) {
        setList([]);
      }
      const CancelToken = axios.CancelToken;
      setIsLoading(true);
      setError(false);
      axios(req, {
        cancelToken: new CancelToken((c) => (cancel = c))
      })
        .then((res) => {
          setList((prev) => {
            if (pageNum === 1) { return ([...res.data]); }
            return [...new Set([...prev, ...res.data])];
          });
          // setHasMore(res.data.length > 0);
          setIsLoading(false);
        }).catch((err) => {
          if (axios.isCancel(err)) return;
          setError(err);
        });
    }
    return () => cancel();
  }, [query, url, pageNum]);

  useEffect(() => {
    // console.log('error', error)
  }, [error])

  // useEffect(() => {
  //   const CancelToken = axios.CancelToken;
  //   let cancel;
  //   setIsLoading(true);
  //   setError(false);
  //   if (pageNum === 1) {
  //     setList([]);
  //   }
  //   axios(req, {
  //     cancelToken: new CancelToken((c) => (cancel = c))
  //   })
  //     .then((res) => {
  //       setList((prev) => {
  //         if (pageNum === 1) { return ([...res.data]); }
  //         return [...new Set([...prev, ...res.data])];
  //       });
  //       setHasMore(res.data.length > 0);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       if (axios.isCancel(err)) return;
  //       setError(err);
  //     });

  //   return () => cancel();
  // }, [pageNum]);

  return { isLoading, error, list, hasMore, setRequest };
}

export default useScroller;
