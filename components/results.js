"use client";

import styles from "./results.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Results() {
  // Gets state from store
  const { info } = useSelector((state) => state.tracker);

  return (
    <div className={styles.results}>
      <div className={`${styles.card}`}>
        <div className={styles.rightBorder} />
        <p className={styles.cardTitle}>IP ADDRESS</p>
        <p className={styles.cardResult}>
          {info.default ? "Loading..." : `${info.isp.ip}`}
        </p>
      </div>

      <div className={`${styles.card}`}>
        <div className={styles.rightBorder} />
        <p className={styles.cardTitle}>LOCATION</p>
        <p className={styles.cardResult}>
          {info.default
            ? "Loading..."
            : `${info.location.city}, ${info.location.region} ${info.location.zip}`}
        </p>
      </div>

      <div className={`${styles.card}`}>
        <div className={styles.rightBorder} />
        <p className={styles.cardTitle}>TIMEZONE</p>
        <p className={styles.cardResult}>
          {info.default ? "Loading..." : `UTC ${info.location.timezone}`}
        </p>
      </div>

      <div className={`${styles.card}`}>
        <p className={styles.cardTitle}>ISP</p>
        <p className={styles.cardResult}>
          {info.default ? "Loading..." : `${info.isp.isp}`}
        </p>
      </div>
    </div>
  );
}
