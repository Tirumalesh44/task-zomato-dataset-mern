import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LocationSearch() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("10"); // Default radius: 5 km
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    console.log("Updated Restaurants State:", restaurants);
  }, [restaurants]);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
      },
      () => {
        setError("Unable to fetch location. Please enter manually.");
      }
    );
  };

  const handleSearch = async () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const rad = parseInt(radius, 10);
  
    if (isNaN(lat) || isNaN(lng) || isNaN(rad)) {
      setError("Please enter valid numeric values for latitude, longitude, and radius.");
      return;
    }
  
    setLoading(true);
    setError(null);
    setRestaurants([]);
  
    try {
      const response = await axios.get(
        `http://localhost:5000/location?lat=${lat}&lng=${lng}&radius=${rad}`
      );
  
      console.log("API Response:", response.data);
  
      if (response.data?.success && Array.isArray(response.data.data)) {
        console.log("Processed Data:", response.data.data);
        setRestaurants(response.data.data);
      } else {
        setError("No restaurants found in this area.");
      }
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("Failed to fetch restaurants. Please try again.");
    }
  
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8E7F6] to-[#F5F5F5] p-6 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold text-[#F8E7F6]">Find Nearby Restaurants</h1>

      <div className="flex flex-col gap-4 items-center mt-4 w-full max-w-lg">
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
          className="border p-2 rounded w-full shadow-md bg-[#F5F5F5] text-gray-800"
        />
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
          className="border p-2 rounded w-full shadow-md bg-[#F5F5F5] text-gray-800"
        />
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="Radius (km)"
          className="border p-2 rounded w-full shadow-md bg-[#F5F5F5] text-gray-800"
        />

        <div className="flex gap-4">
          <button onClick={getUserLocation} className="bg-[#F8E7F6] text-gray-800 px-4 py-2 rounded-lg hover:bg-[#F5F5F5] shadow-lg">
            📍 Get My Location
          </button>
          <button onClick={handleSearch} className="bg-[#F8E7F6] text-gray-800 px-4 py-2 rounded-lg hover:bg-[#F5F5F5] shadow-lg">
            🔍 Search
          </button>
        </div>
      </div>

      {loading && <p className="text-center mt-4 text-yellow-500">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full max-w-5xl">
        {restaurants.slice(0, 100).map(({ restaurant }) => (
          <Link to={`/restaurant/${restaurant.R?.res_id || ""}`} key={restaurant.R?.res_id || Math.random()}>
            <div className="bg-[#F5F5F5] p-4 shadow-xl rounded-xl hover:scale-105 transition-transform">
              <img
                src={restaurant.featured_image || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
                alt={restaurant.name || "Restaurant"}
                className="w-full h-48 object-cover rounded-xl"
                onError={(e) => (e.target.src = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png")}
              />
              <h2 className="text-xl font-semibold mt-3 text-gray-800">{restaurant.name || "Unknown Restaurant"}</h2>
              <p className="text-gray-600">{restaurant.cuisines || "Cuisines not available"}</p>
              <p className="text-yellow-500 font-bold">⭐ {restaurant.user_rating?.aggregate_rating ?? "No Rating"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LocationSearch;