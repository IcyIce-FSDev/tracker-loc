import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function Map({ trackedInfo, gotIp }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const L = require("leaflet");

    if (
      gotIp &&
      trackedInfo.location.lat !== undefined &&
      trackedInfo.location.lng !== undefined
    ) {
      if (mapRef.current) {
        mapRef.current.setView(
          [trackedInfo.location.lat, trackedInfo.location.lng],
          18
        );

        if (markerRef.current) {
          markerRef.current.setLatLng([
            trackedInfo.location.lat,
            trackedInfo.location.lng,
          ]);
        } else {
          const customIcon = L.icon({
            iconUrl: "/icon-location.svg",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          markerRef.current = L.marker(
            [trackedInfo.location.lat, trackedInfo.location.lng],
            {
              icon: customIcon,
            }
          ).addTo(mapRef.current);
        }
      } else {
        const map = L.map("map").setView(
          [trackedInfo.location.lat, trackedInfo.location.lng],
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

        markerRef.current = L.marker(
          [trackedInfo.location.lat, trackedInfo.location.lng],
          {
            icon: customIcon,
          }
        ).addTo(map);
        mapRef.current = map;
      }
    }
  }, [trackedInfo, gotIp]);

  return <div id="map" style={{ width: "100%", height: "70vh" }}></div>;
}
