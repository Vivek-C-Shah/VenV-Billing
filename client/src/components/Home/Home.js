import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.hero}>
        <h1>By VenV Developers</h1>
        <div className={styles.paragraph}>
          <p>
            Billing application made for all with all the important features.
            Click "Get Started" for the demo or contact{" "}
            <a href="venv.in">VenV</a> for tailoring it to imbue it with your
            unique touch.
          </p>
        </div>
        <div className={styles.imgContainer}>
          <img
            src="https://res.cloudinary.com/almpo/image/upload/v1637241441/special/banner_izy4xm.png"
            alt="Invoicing-app"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
