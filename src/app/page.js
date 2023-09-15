"use client";

import styles from "./page.module.css";
import Map from "../../components/map";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  // Default starting IP
  const [ipAddress, setIpAddress] = useState("Loading...");
  // Flag to determine if the site got clients IP
  const [gotIp, setGotIp] = useState(false);
  // The returned information from tracking the IP
  const [trackedInfo, setTrackedInfo] = useState({
    default: true,
    location: {
      city: "Loading...",
      region: "Loading...",
      zip: "Loading...",
      timezone: "Loading...",
    },
    isp: {
      ip: "Loading...",
      isp: "Loading...",
    },
  });

  // Function to handle user input for IP
  function handleIpInput(e) {
    setIpAddress(e.target.value);
  }

  // Function to get information about the client location
  async function getTrackedInfo(ip) {
    // Key
    const apiKey = "at_tReNxMub9AXvtKPU5KevUECiP1zuX";
    // Built URL for query
    const fetchURL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
    // Response from URL
    const response = await fetch(fetchURL);
    // JSON data from response
    const info = await response.json();

    // Building object for client
    const builtInfo = {
      location: {
        city: info.location.city,
        region: info.location.region,
        zip: info.location.postalCode,
        timezone: info.location.timezone,
        lat: info.location.lat,
        lng: info.location.lng,
      },
      isp: {
        ip: info.ip,
        isp: info.isp,
      },
    };

    return builtInfo;
  }

  // When client first loads the website will fetch the IP address of client
  useEffect(() => {
    async function fetchIPAddress() {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIpAddress(response.data.ip);

        setGotIp(true);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    }

    if (!gotIp) {
      fetchIPAddress();
    }
  }, []);

  async function getData() {
    try {
      const builtInfo = await getTrackedInfo(ipAddress);
      setTrackedInfo(builtInfo);
    } catch (error) {
      console.error("Error fetching information:", error);
    }
  }

  // Once IP is retrieved this will then fire and fetch location details of client
  useEffect(() => {
    if (gotIp) {
      getData();
    }
  }, [gotIp]);

  return (
    <main className={styles.website}>
      <div className={styles.container}>
        {/* Top portion */}
        <div className={styles.header}>
          <p className={styles.title}>IP Address Tracker</p>
          <div className={styles.inputBox}>
            <input
              type="text"
              value={ipAddress}
              onChange={handleIpInput}
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

        {/* Info portion */}
        <div className={styles.results}>
          <div className={`${styles.card}`}>
            <div className={styles.rightBorder} />
            <p className={styles.cardTitle}>IP ADDRESS</p>
            <p className={styles.cardResult}>{trackedInfo.isp.ip}</p>
          </div>

          <div className={`${styles.card}`}>
            <div className={styles.rightBorder} />
            <p className={styles.cardTitle}>LOCATION</p>
            <p className={styles.cardResult}>
              {trackedInfo.default
                ? "Loading..."
                : `${trackedInfo.location.city}, ${trackedInfo.location.region} ${trackedInfo.location.zip}`}
            </p>
          </div>

          <div className={`${styles.card}`}>
            <div className={styles.rightBorder} />
            <p className={styles.cardTitle}>TIMEZONE</p>
            <p className={styles.cardResult}>
              {trackedInfo.default
                ? "Loading..."
                : `UTC ${trackedInfo.location.timezone}`}
            </p>
          </div>

          <div className={`${styles.card}`}>
            <p className={styles.cardTitle}>ISP</p>
            <p className={styles.cardResult}>{trackedInfo.isp.isp}</p>
          </div>
        </div>

        {/* Map portion */}
        <div className={styles.map}>
          <Map trackedInfo={trackedInfo} gotIp={gotIp} />
        </div>
      </div>
    </main>
  );
}
