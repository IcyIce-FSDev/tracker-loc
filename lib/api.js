export async function getTrackedInfo(ip) {
  // Function to get information about the client location
  // Key
  const apiKey = "at_5dkJA791RNKZSwo3tvqF5MsxXjZ81";
  // Built URL for query
  const fetchURL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
  // Response from URL
  const response = await fetch(fetchURL);
  // JSON data from response
  const info = await response.json();

  // Building object for client
  const builtInfo = {
    default: false,
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
