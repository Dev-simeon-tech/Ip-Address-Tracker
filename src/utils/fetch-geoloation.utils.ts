const apiKey = import.meta.env.VITE_GEO_API_KEY;

const fetchGeolocation = async (ip: string) => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch geolocation data");
  }
  return data;
};

export default fetchGeolocation;
