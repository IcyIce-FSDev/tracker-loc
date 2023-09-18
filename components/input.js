"use client";

import styles from "./input.module.css";
import Image from "next/image";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIp, updateInfo } from "../lib/trackerSlice";

import { getTrackedInfo } from "../lib/api";

export default function Input() {
  // Dispatch command
  const dispatch = useDispatch();
  // Access the state from slice
  const { ip } = useSelector((state) => state.tracker);

  // Function to handle user input for IP
  function handleIpInput(e) {
    dispatch(updateIp(String(e.target.value)));
  }

  // Function to clear input on click
  function handleClick() {
    dispatch(updateIp(String("")));
  }

  async function getData() {
    try {
      const builtInfo = await getTrackedInfo(ip);
      dispatch(updateInfo(builtInfo));
    } catch (error) {
      console.error("Error fetching information:", error);
    }
  }

  return (
    <div className={styles.header}>
      <p className={styles.title}>IP Address Tracker</p>
      <div className={styles.inputBox}>
        <input
          type="text"
          value={ip}
          onChange={handleIpInput}
          onClick={handleClick}
          className={styles.input}
        />
        <button className={styles.arrowContainer} onClick={getData}>
          <Image
            src="/icon-arrow.svg"
            alt="icon-arrow"
            width="11"
            height="14"
          />
        </button>
      </div>
    </div>
  );
}
