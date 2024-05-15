import Image from "../../node_modules/next/image";
import bannerImg from "../../images/John-Wick-3.jpg";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
const Banner = () => {
  const movieBannerInfo = useSelector(
    (state: RootState) => state?.movie?.movieDetail
  );

  return (
    <>
      {movieBannerInfo && (
        <section className={styles["banner"]}>
          <div className={styles["banner-card"]}>
            <Image
              src={movieBannerInfo?.Poster}
              className={styles["banner-img"]}
              width={1200}
              height={400}
              alt={movieBannerInfo?.Poster}
            />
            <div className={styles["card-content"]}>
              <div className={styles["card-info"]}>
                {movieBannerInfo?.Title && (
                  <div className={styles["genre"]}>
                    <i className="fa-solid fa-film"></i>
                    <span>{movieBannerInfo?.Title}</span>
                  </div>
                )}
                {movieBannerInfo?.Year && (
                  <div className={styles["year"]}>
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>{movieBannerInfo?.Year}</span>
                  </div>
                )}
                {movieBannerInfo?.Runtime && (
                  <div className={styles["duration"]}>
                    <i className="fa-solid fa-clock"></i>
                    <span>{movieBannerInfo?.Runtime}</span>
                  </div>
                )}
                <div className={styles["quality"]}></div>
              </div>
              <h2 className={styles["card-title"]}>{movieBannerInfo?.Plot}</h2>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Banner;
