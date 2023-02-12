import React from "react";
import { IMAGE_BASE_URL } from "../../../app/axios/Requests";
import "../styles/Banner.css";
import useBannerInitialMovieFetch from "./hooks/useBannerInitialMovieFetch";

export default function Banner() {
  const { loading, data } = useBannerInitialMovieFetch();

  const truncateString = (string, index) => {
    if (string?.length > index) {
      return string.substr(0, index - 1) + "...";
    }

    return string;
  };

  if (loading) return null;
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('${IMAGE_BASE_URL}${data?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{data?.name || data?.original_name}</h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">
          {truncateString(data?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}
