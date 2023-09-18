import styles from "./page.module.css";
import Map from "../../components/map";
import Results from "../../components/results";
import Input from "../../components/input";

export const metadata = {
  title: "IP-Tracker",
  description: "Website to track an IP address",
};

export default function Home() {
  return (
    <main className={styles.website}>
      <div className={styles.container}>
        {/* Top portion */}
        <Input />

        {/* Results portion */}
        <Results />

        {/* Map portion */}
        <Map />
      </div>
    </main>
  );
}
