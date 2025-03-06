import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchRestaurants = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants`, {
            params: { page, limit },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        return { data: [] };
    }
};

export const fetchRestaurantById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        return null;
    }
};
// Update with your actual backend URL

export const fetchRestaurantsByCity = async (city, page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/city`, {
            params: { city, page, limit }, // Correct way to pass query params
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants by city:", error);
        return { success: false, error: error.message };
    }
};




// Backend API URL

export const getRestaurantsByLocation = async (lat, lng, radius) => {
    try {
        const response = await fetch(
            `http://localhost:5000/location?lat=${lat}&lng=${lng}&radius=${radius}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Error fetching restaurants:", error);
        return [];
    }
};

