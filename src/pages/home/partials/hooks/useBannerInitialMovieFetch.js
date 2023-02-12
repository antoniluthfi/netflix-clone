import { useEffect, useState } from "react";
import axios from "../../../../app/axios/axios";
import requests from "../../../../app/axios/Requests";

export default function useBannerInitialMovieFetch() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          res.data.results[
            Math.floor(Math.random() * res.data.results.length - 1)
          ]
        );
        return res;
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      setLoading(true);
      setMovie({});
    };
  }, []);

  return {
    loading,
    data: movie,
  };
}
