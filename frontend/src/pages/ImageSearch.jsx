import { useState } from "react";
import axios from "axios";

function ImageSearch() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSearch = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setRestaurants([]);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/image-search", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.restaurants.length === 0) {
        setError("No matching restaurants found.");
      } else {
        setRestaurants(response.data.restaurants);
      }
    } catch (err) {
      setError("Error fetching restaurants. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-[#F8E7F6] p-6 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold text-gray-800">Search Restaurants by Image</h1>

      {/* Custom File Upload UI */}
      <div className="mt-4 flex flex-col items-center">
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
          📁 Choose File
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
        <p className="text-gray-500 mt-2">{image ? image.name : "No file chosen"}</p>
      </div>

      {preview && <img src={preview} alt="Preview" className="mt-4 w-48 mx-auto rounded shadow-lg" />}

      <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600 shadow-md">
        🔍 Search
      </button>

      {loading && <p className="mt-4 text-gray-700">Searching...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Restaurant Results */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="bg-white/50 backdrop-blur-lg p-4 shadow-lg rounded-xl">
            <img
              src={restaurant.featured_image || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
              alt={restaurant.name || "Restaurant"}
              className="w-full h-48 object-cover rounded-xl"
              onError={(e) => (e.target.src = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png")}
            />
            <h2 className="text-xl font-semibold mt-3 text-gray-800">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.cuisines}</p>
            <p className="text-yellow-500 font-bold">⭐ {restaurant.user_rating?.aggregate_rating ?? "No Rating"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSearch;
