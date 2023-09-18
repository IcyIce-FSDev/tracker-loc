"use client";

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";

export default function Map() {
  const { gotInfo, info } = useSelector((state) => state.tracker);

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const L = require("leaflet");

    if (
      gotInfo &&
      info.location.lat !== undefined &&
      info.location.lng !== undefined
    ) {
      if (mapRef.current) {
        mapRef.current.setView([info.location.lat, info.location.lng], 18);

        if (markerRef.current) {
          markerRef.current.setLatLng([info.location.lat, info.location.lng]);
        } else {
          const customIcon = L.icon({
            iconUrl: "/icon-location.svg",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          markerRef.current = L.marker([info.location.lat, info.location.lng], {
            icon: customIcon,
          }).addTo(mapRef.current);
        }
      } else {
        const map = L.map("map").setView(
          [info.location.lat, info.location.lng],
          18
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        const customIcon = L.icon({
          iconUrl: "/icon-location.svg",
          iconSize: [38, 58],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        markerRef.current = L.marker([info.location.lat, info.location.lng], {
          icon: customIcon,
        }).addTo(map);
        mapRef.current = map;
      }
    }
  }, [info, gotInfo]);

  return (
    <div className={styles.map}>
      <div id="map" style={{ width: "100%", height: "70vh" }}></div>
    </div>
  );
}
