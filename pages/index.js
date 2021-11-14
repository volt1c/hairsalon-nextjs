import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.banner}>The best hair salon in the city</h1>
      <p className={styles.p}>We cut your hair and give them new life.</p>
      <Link href="/book">
        <a className={styles.buttonLink}>Book now</a>
      </Link>
    </div>
  );
}
