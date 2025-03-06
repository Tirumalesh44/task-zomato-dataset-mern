import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function RestaurantDetails() {
  const { id } = useParams(); // Get restaurant ID from URL
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/restaurants/${id}`)
      .then((res) => {
        console.log("✅ Restaurant Data:", res.data); // Debugging
        setRestaurant(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching restaurant:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h1 className="text-center text-2xl font-bold">Loading...</h1>;
  }

  if (!restaurant) {
    return <h1 className="text-center text-2xl font-bold text-red-500">Restaurant Not Found</h1>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-[#F5F5F5] flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
        {/* Back Button */}
        <Link to="/" className="text-[#2563EB] text-lg mb-4 inline-block hover:underline">← Back to Home</Link>

        {/* Restaurant Image */}
        <img
          src={restaurant.featured_image || "https://via.placeholder.com/600"}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded-xl border-2 border-[#D1D5DB]"
        />

        {/* Restaurant Details */}
        <h1 className="text-4xl font-extrabold text-gray-800 mt-4">{restaurant.name}</h1>
        <p className="text-gray-500 mt-2 text-lg">{restaurant.cuisines}</p>
        <p className="text-yellow-500 font-bold text-xl mt-2">
          ⭐ {restaurant.user_rating?.aggregate_rating || "No Rating"}
        </p>

        {/* Location */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">📍 Location</h2>
          <p className="text-gray-600">{restaurant.location?.address || "Not Available"}</p>
        </div>

        {/* Booking & Menu */}
        <div className="mt-6 flex gap-4">
          {restaurant.menu_url && (
            <a href={restaurant.menu_url} target="_blank" rel="noopener noreferrer" 
              className="px-5 py-3 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1D4ED8] transition duration-300">
              🍽 View Menu
            </a>
          )}
          {restaurant.book_url && (
            <a href={restaurant.book_url} target="_blank" rel="noopener noreferrer" 
              className="px-5 py-3 bg-[#10B981] text-white rounded-lg font-semibold hover:bg-[#059669] transition duration-300">
              📅 Book a Table
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
