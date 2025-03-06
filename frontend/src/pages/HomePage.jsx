import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5000/api/restaurants?page=${page}&limit=${limit}`)
      .then((res) => {
        if (res.data && res.data.data) {
          const formattedRestaurants = res.data.data.flatMap((entry) =>
            entry.restaurants.map((r) => r.restaurant)
          );

          setRestaurants(formattedRestaurants);
          setFilteredRestaurants(formattedRestaurants);
          setTotalPages(res.data.total_pages || 1);
        } else {
          setError("Unexpected API response format.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load restaurants. Please try again.");
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filteredData = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredRestaurants(filteredData);
  }, [searchTerm, restaurants]);

  if (loading) {
    return <h1 className="text-center text-3xl font-bold text-gray-700">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center text-3xl font-bold text-red-500">{error}</h1>;
  }

  return (
    <div className="min-h-screen bg-[#F8E7F6] text-gray-800 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-6">🍽️ Find Your Favorite Restaurant</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search for restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-4 py-3 rounded-full text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.slice(0, 9).map((restaurant) => (
            <Link to={`/restaurant/${restaurant.R?.res_id}`} key={restaurant.R?.res_id || Math.random()}>
              <div className="relative bg-[#F5F5F5] bg-opacity-40 backdrop-blur-md p-4 rounded-2xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl">
                <img
                  src={restaurant.featured_image || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover rounded-xl"
                  onError={(e) => (e.target.src = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png")}
                />
                <h2 className="text-xl font-bold text-gray-900 mt-3">{restaurant.name}</h2>
                <p className="text-gray-700">{restaurant.cuisines}</p>
                <p className="text-yellow-500 font-bold">
                  ⭐ {restaurant.user_rating?.aggregate_rating || "No Rating"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-red-400 col-span-3">No restaurants found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className={`px-6 py-3 text-lg font-semibold rounded-full transition-all ${
            page === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-700 text-white shadow-lg"
          }`}
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          ← Previous
        </button>
        <span className="text-xl font-semibold">Page {page} of {totalPages}</span>
        <button
          className={`px-6 py-3 text-lg font-semibold rounded-full transition-all ${
            page >= totalPages
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-700 text-white shadow-lg"
          }`}
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default HomePage;
