import styles from "./HeroSection.module.css";
import imageHero from "../assets/hero.png";
export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h1>
          Save your data <br /> storage here.
        </h1>
        <p>
          Data Warehouse is a data storage area that <br /> has been tested for
          security, so you can store <br /> your data here safely but not be
          afraid of <br /> being stolen by others.
        </p>
        <button className={styles.learnMore}>Learn more</button>
      </div>
      <img src={imageHero} className={styles.image} />
    </section>
  );
}
