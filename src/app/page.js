"use client";

import styles from "./page.module.css";
import Map from "../../components/map";
import Results from "../../components/results";
import Input from "../../components/input";
import axios from "axios";

import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGotInfo,
  updateIp,
  updateNewIp,
  updateInfo,
} from "../../lib/trackerSlice";

import { getTrackedInfo } from "../../lib/api";

export default function Home() {
  const dispatch = useDispatch();

  const { ip, newIp } = useSelector((state) => state.tracker);

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
