import styles from "../styles/components/InfoBox.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.self}>
      <div className={styles.box}>{children}</div>
    </div>
  );
}
