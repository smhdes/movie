import Image from "next/image";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import gotImg from "../../images/got.jpg";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setMovieDetails } from "../../store/movie-slice";
import { useRouter } from "next/router";
import { getAllMovies } from "../../services/api";
import debounce from "lodash/debounce";

import { getLast20Years } from "../../utils/getLastYears";
import AtomButton from "../atoms/Button/atom-button";
import Loader from "../Loader";

const filterType = [
  {
    id: "movie",
    value: "movie",
    text: "Movies",
  },
  {
    id: "serie",
    value: "series",
    text: "Series",
  },
  {
    id: "episode",
    value: "episode",
    text: "Episodes",
  },
];

const Movies = () => {
  const [movieYear, setMovieYear] = useState<string>("");
  const [gradeType, setGradeType] = useState<string>("movie");
  const [genreType, setGenreType] = useState<string | null>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("Pokemon");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const moviesPerPage = 10;

  const { data, isLoading } = useQuery<any>({
    queryKey: ["getAllMovies", currentPage, gradeType, searchText, movieYear],
    queryFn: () => {
      let parameters: [number, string, string?, string?] = [
        currentPage,
        gradeType,
        searchText,
        movieYear,
      ];

      return getAllMovies.apply(null, parameters);
    },
  });

  if (isLoading) return <Loader />;

  const totalMovies = data?.totalResults || 0;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  const startIndex = currentPage * moviesPerPage;
  const endIndex = Math.min(startIndex + moviesPerPage, totalMovies);

  const movies =
    data?.Search?.map((item: any, index: number) => ({
      id: index,
      Title: item.Title,
      Year: item.Year,
      imdbID: item.imdbID,
      Type: item.Type,
      Poster: item.Poster,
    })) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pageButtons = [];
  for (let i = 0; i < totalPages; i++) {
    pageButtons.push(
      <AtomButton
        key={i}
        text={(i + 1).toString()}
        onClick={() => handlePageChange(i)}
      />
    );
  }

  const handleGenres = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = e.target.value;
    setGenreType(selectedGenre);
  };

  const handleYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setMovieYear(selectedYear);
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGrade = e.target.value;
    setGradeType(selectedGrade);
  };

  const handleDetails = (imdbId: string) => {
    dispatch(setMovieDetails(imdbId));
    router.push("/movie-details");
  };

  const delayedSearch = debounce((searchQuery: string) => {
    setLoading(true);
    setSearchText(searchQuery);
  }, 600);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    delayedSearch(value);
  };

  return (
    <section className={styles["movies"]}>
      <div className={styles["filter-bar"]}>
        <div className={styles["filter-dropdowns"]}>
          <select
            name="genre"
            className={styles.genre}
            onChange={(e) => handleGenres(e)}
          >
            <option value="all genres">All genres</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="animal">Animal</option>
            <option value="animation">Animation</option>
            <option value="biography">Biography</option>
          </select>

          <select
            name="year"
            className={styles.year}
            onChange={(e) => handleYear(e)}
          >
            <option value="all years">All the years</option>
            {getLast20Years().map((year, id) => {
              return (
                <option key={id} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <div className={styles["navbar-actions"]}>
          <form action="#" className={styles["navbar-form"]}>
            <input
              type="text"
              name="search"
              placeholder="I'm looking for..."
              className={styles["navbar-form-search"]}
              onChange={handleInputChange}
            />
            <button
              className={styles["navbar-form-btn"]}
              onClick={() => delayedSearch(searchText)}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>

        <div className={styles["filter-radios"]}>
          {filterType.map((item) => (
            <div key={item.id}>
              <input
                type="radio"
                name="grade"
                id={item.id}
                value={item.value}
                onChange={(e) => handleGradeChange(e)}
              />
              <label htmlFor={item.value}>{item.text}</label>
            </div>
          ))}
          <div className="checked-radio-bg"></div>
        </div>
      </div>
      <div className={styles["movies-grid"]}>
        {movies.map((movie: any) => (
          <div
            className={styles["movie-card"]}
            key={movie.id}
            onClick={() => handleDetails(movie?.imdbID)}
          >
            <div className={styles["card-head"]}>
              {movie.Poster !== "N/A" ? (
                <Image
                  width={146}
                  height={250}
                  src={
                    movie.Poster.startsWith("http")
                      ? movie.Poster
                      : "/no-image.jpg"
                  }
                  alt={movie.Title}
                  className={styles["card-img"]}
                />
              ) : (
                <Image
                  src={gotImg.src}
                  alt="No Image Available"
                  width={146}
                  height={250}
                  className={styles["card-img"]}
                />
              )}

              <div className={styles["card-overlay"]}>
                <div className={styles["bookmark"]}>
                  <i className="fa-solid fa-bookmark"></i>
                </div>

                <div className={styles["rating"]}>
                  <i className="fa-regular fa-star"></i>
                  <span>6.4</span>
                </div>

                <div className={styles["play"]}>
                  <i className="fa-regular fa-circle-play"></i>
                </div>
              </div>
            </div>

            <div className={styles["card-body"]}>
              <h3 className={styles["card-title"]}>{movie?.Title}</h3>

              <div className={styles["card-info"]}>
                <span className={styles["genre"]}>{movie?.imdbID}</span>
                <span className={styles["year"]}>{movie?.Year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles["pagination"]}>{pageButtons}</div>
    </section>
  );
};

export default Movies;
