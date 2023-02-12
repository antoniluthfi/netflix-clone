import React from "react";
import { IMAGE_BASE_URL } from "../../../app/axios/Requests";
import "../styles/Row.css";
import useRowInitialMovieFetch from "./hooks/useRowInitialMovieFetch";

export default function Row({ title, fetchUrl, isLargeRow = false }) {
  const { loading, data } = useRowInitialMovieFetch({ url: fetchUrl });

  if (loading) return null;
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {data.length &&
          data.map((movie) => (
            <img
              key={movie?.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${IMAGE_BASE_URL}${
                isLargeRow ? movie?.poster_path : movie?.backdrop_path
              }`}
              alt={movie?.name}
            />
          ))}
      </div>
    </div>
  );
}
