import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div>
          <h4>DataWarehouse</h4>
          <p>
            Warehouse Society, 234 <br />
            Bahagia Ave Street PRBW 29281
          </p>
        </div>
        <div>
          <h4>About</h4>
          <ul>
            <li>Profile</li>
            <li>Features</li>
            <li>Careers</li>
            <li>DW News</li>
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li>Support</li>
            <li>Sign up</li>
            <li>Guide</li>
            <li>Reports</li>
            <li>Q&A</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
