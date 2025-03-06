// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import RestaurantList from "./components/RestaurantList";
// // import RestaurantDetail from "./components/RestaurantDetail";

// // const App = () => {
// //     return (
// //         <Router>
// //             <Routes>
// //                 <Route path="/" element={<RestaurantList />} />
// //                 <Route path="/restaurant/:id" element={<RestaurantDetail />} />
// //             </Routes>
// //         </Router>
// //     );
// // };

// // export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import RestaurantList from "./components/RestaurantList";
// import RestaurantDetail from "./components/RestaurantDetail";
// import CityRestaurants from "./components/CityRestaurants";

// const App = () => {
//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={<RestaurantList />} />
//                 <Route path="/restaurant/:id" element={<RestaurantDetail />} />
//                 <Route path="/city/:cityName" element={<CityRestaurants />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./components/RestaurantDetail";
import CityRestaurants from "./components/CityRestaurants";
import SearchByLocation from "./components/SearchByLocation"; 
import ImageSearch from "./components/ImageSearch";// Import the new component

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<RestaurantList />} />
                <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                <Route path="/city/:cityName" element={<CityRestaurants />} />
                <Route path="/search-location" element={<SearchByLocation />} /> {/* New Route */}
                <Route path="/image-search" element={<ImageSearch />} />
            </Routes>
        </Router>
    );
};

export default App;
