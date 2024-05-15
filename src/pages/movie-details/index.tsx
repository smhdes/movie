import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails } from "../../../services/api";
import { RootState } from "../../../store/rootReducer";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import AtomButton from "../../../components/atoms/Button/atom-button";
import { MovieDetail } from "./movie-details.types";
import { getMovieInfoBanner } from "../../../store";

const MovieDetailCard: React.FC<MovieDetail> = () => {
  const movieInfo = useSelector((state: RootState) => state?.movie?.movieInfo);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoBack = () => {
    router.back();
  };
  const { data, isLoading } = useQuery<any>({
    queryKey: ["getMovieDetails", movieInfo],
    queryFn: () => getMovieDetails(movieInfo),
  });

  dispatch(getMovieInfoBanner(data));

  return (
    <div className={styles["movie-card"]}>
      <div className={styles["container"]}>
        <AtomButton
          text="Back"
          onClick={handleGoBack}
          icon={<i className="fa-solid fa-chevron-left"></i>}
        />
        <div
          className={styles["hero"]}
          style={{
            backgroundImage: `url(${data?.Poster})`,
          }}
        >
          <div className={styles["details"]}>
            <p className={styles["title1"]}>{data?.Title}</p>
          </div>
        </div>
        <div className={styles["description"]}>
          <div className={styles["column1"]}>
            {data?.Ratings?.map((rate: any, index: number) => {
              return (
                <div key={index}>
                  <p className={styles["tag"]}>
                    {rate?.Source}:{rate?.Value}
                    <i className="fa-solid fa-star"></i>
                  </p>
                </div>
              );
            })}
          </div>

          <div className={styles["column2"]}>
            <p className={styles["plot"]}>{data?.Plot}</p>
            <span className={styles["detail-tag"]}>
              <i className="fa-solid fa-calendar-days"></i>
              {data?.Released}
            </span>

            <span className={styles["detail-tag"]}>
              <i className="fa-solid fa-money-check-dollar"></i>
              {data?.BoxOffice}
            </span>
            <span className={styles["detail-tag"]}>
              <i className="fa-solid fa-clock"></i>
              {data?.Runtime}
            </span>
            <span className={styles["detail-tag"]}>
              <i className="fa-solid fa-flag"></i>
              {data?.Country}
            </span>
            <span className={styles["detail-tag"]}>
              Director:
              {data?.Director}
            </span>
            <span className={styles["detail-tag"]}>
              Actors:
              {data?.Actors}
            </span>
            <span className={styles["detail-tag"]}>
              Genre:
              {data?.Genre}
            </span>
            <span className={styles["detail-tag"]}>
              <i className="fa-solid fa-film"></i>
              {data?.Type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailCard;
