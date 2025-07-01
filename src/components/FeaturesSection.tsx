import styles from "./FeaturesSection.module.css";

import features1 from "../assets/features1.png";
import features2 from "../assets/features2.png";
import features3 from "../assets/features3.png";
import features4 from "../assets/features4.png";

export default function FeaturesSection() {
  return (
    <div>
      <section className={styles.features}>
        <h2>Features</h2>
        <p>
          Some of the features and advantages that we provide for those of you{" "}
          <br /> who store data in this Data Warehouse.
        </p>

        <div className={styles.gridAll}>
          <div className={styles.grid}>
            <div className={styles.cardFather}>
              <img src={features1} alt="Search Data" />
              <div className={styles.card}>
                <h3>Search Data</h3>
                <p>
                  Don’t worry if your data is very large, the Data Warehoue
                  provides a search engine, which is useful for making it easier
                  to find data effectively saving time.
                </p>
                <a>Learn more</a>
              </div>
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.cardFather}>
              <img src={features2} alt="24 Hours Access" />
              <div
                className={styles.card}
                style={{ backgroundColor: "#f5d3e8" }}
              >
                <h3>24 Hours Access</h3>
                <p>
                  Access is given 24 hours a full morning to night and meet
                  again in the morning, giving you comfort when you need data
                  when urgent.
                </p>
                <a>Learn more</a>
              </div>
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.cardFather}>
              <img src={features3} alt="24 Hours Access" />
              <div
                className={styles.card}
                style={{ backgroundColor: "#f5d3e8" }}
              >
                <h3>Print Out</h3>
                <p>
                  Print out service gives you convenience if someday you need
                  print data, just edit it all and just print it.
                </p>
                <a>Learn more</a>
              </div>
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.cardFather}>
              <img src={features4} alt="Search Data" />
              <div className={styles.card}>
                <h3>Search Data</h3>
                <p>
                  Don’t worry if your data is very large, the Data Warehoue
                  provides a search engine, which is useful for making it easier
                  to find data effectively saving time.
                </p>
                <a>Learn more</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
