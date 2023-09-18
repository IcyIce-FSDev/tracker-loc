"use client";

import styles from "./input.module.css";
import Image from "next/image";
import axios from "axios";

import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGotInfo,
  updateIp,
  updateNewIp,
  updateInfo,
} from "../lib/trackerSlice";

import { getTrackedInfo } from "../lib/api";

export default function Input() {
  // Dispatch command
  const dispatch = useDispatch();
  // Access the state from slice
  const { ip, newIp } = useSelector((state) => state.tracker);

  // Function to handle user input for IP
  function handleIpInput(e) {
    dispatch(updateIp(String(e.target.value)));
  }

  // Function to clear input on click
  function handleClick() {
    dispatch(updateIp(String("")));
  }

  // When client first loads the website will fetch the IP address of client
  useEffect(() => {
    async function fetchIPAddress() {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");

        dispatch(updateIp(String(response.data.ip)));

        dispatch(updateNewIp(Boolean(true)));
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    }

    fetchIPAddress();
  }, []);

  // When clients IP is obtained it will then get info
  useEffect(() => {
    async function getData() {
      if (newIp) {
        const resp = await getTrackedInfo(ip);
        console.log(resp);
        dispatch(updateNewIp(Boolean(false)));
        dispatch(updateGotInfo(Boolean(true)));
        dispatch(updateInfo(Object(resp)));
      }
    }

    getData();
  }, [newIp]);

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
