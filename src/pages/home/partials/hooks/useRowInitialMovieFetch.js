import { useEffect, useState } from "react";
import axios from "../../../../app/axios/axios";

export default function useRowInitialMovieFetch({ url = "" }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(url);
        setMovies(res.data?.results);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { loading, data: movies || [] };
}
