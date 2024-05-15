/* eslint-disable react/jsx-no-undef */
import Image from "../../node_modules/next/image";
import styles from "./index.module.scss";
import logo from "../../images/logo.png";
const Header = () => {
  return (
    <header>
      <div className={styles["navbar"]}>
        <button className={styles["navbar-menu-btn"]}>
          <span className="one"></span>
          <span className="two"></span>
          <span className="three"></span>
        </button>
        <a href="#" className="navbar-brand">
          <Image src={logo.src} width={60} height={40} alt="" />
        </a>
        <nav>
          <ul className={styles["navbar-nav"]}>
            <li>
              {" "}
              <a href="#" className={styles["navbar-link"]}>
                Home
              </a>{" "}
            </li>
            <li>
              {" "}
              <a href="#movies" className={styles["navbar-link"]}>
                Movies
              </a>{" "}
            </li>
            <li>
              {" "}
              <a href="#episode" className={styles["navbar-link"]}>
                Episodes
              </a>{" "}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
