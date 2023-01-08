import { useState, useEffect } from "react";
import axios from "axios";

function useInfiniteScroll(callback) {
  const [isFetching, setIsFetching] = useState(false);

  function handleScroll() {
    if (((window.innerHeight + window.scrollY) >= document.body.scrollHeight) && !isFetching) {
      if (!isFetching) {
        setIsFetching(true);
      }
    }
  }

  useEffect(() => {
    if (!isFetching) return;
    callback()
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [isFetching, setIsFetching];
}

export default useInfiniteScroll;
