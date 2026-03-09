// import { useState, useRef, useEffect, useCallback } from "react";
// import globe from "./assets/globe.png";
// import "./App.css";
// import { AVAILABLE_PLACES } from "./data";
// import Modal from "./components/Modal";
// import DeleteConfirmation from "./components/DeleteConfirmation";
// import Places from "./components/Places";
// import { sortPlacesByDistance } from "./loc.js";

// const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
// const storedPlaces = storedIds.map((id) =>
//   AVAILABLE_PLACES.find((place) => place.id === id),
// );

// function App() {
//   const selectedPlace = useRef();
//   const [isOpen, setIsOpen] = useState(false);
//   const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
//   const [availablePlaces, setAvailablePlaces] = useState([]);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const sortedPlaces = sortPlacesByDistance(
//         AVAILABLE_PLACES,
//         position.coords.latitude,
//         position.coords.longitude,
//       );

//       setAvailablePlaces(sortedPlaces);
//     });
//   }, []);

//   function handleStartRemovePlace(id) {
//     setIsOpen(true);
//     selectedPlace.current = id;
//   }

//   function handleStopRemovePlace() {
//     setIsOpen(false);
//   }

//   function handleSelectPlace(id) {
//     setPickedPlaces((prevPickedPlaces) => {
//       if (prevPickedPlaces.some((place) => place.id === id)) {
//         return prevPickedPlaces;
//       }
//       const place = AVAILABLE_PLACES.find((place) => place.id === id);
//       return [place, ...prevPickedPlaces];
//     });

//     const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
//     if (storedIds.indexOf(id) === -1) {
//       localStorage.setItem(
//         "selectedPlaces",
//         JSON.stringify([id, ...storedIds]),
//       );
//     }
//   }

//   const handleRemovePlace = useCallback(function handleRemovePlace() {
//     setPickedPlaces((prevPickedPlaces) =>
//       prevPickedPlaces.filter((place) => place.id !== selectedPlace.current),
//     );
//     setIsOpen(false);

//     const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
//     localStorage.setItem(
//       "selectedPlaces",
//       JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)),
//     );
//   }, []);

//   return (
//     <>
//       <Modal open={isOpen} onClose={handleStopRemovePlace}>
//         <DeleteConfirmation
//           onCancel={handleStopRemovePlace}
//           onConfirm={handleRemovePlace}
//         />
//       </Modal>

//       <header>
//         <img src={globe} alt="Globe" />
//         <h1>PlacePicker</h1>
//         <p>
//           Create a personalized travel collection of places you dream of
//           visiting or have already explored.
//         </p>
//       </header>
//       <main>
//         <Places
//           title="I would like to visit..."
//           fallbackText={"Select the places you would like to visit."}
//           places={pickedPlaces}
//           onSelectPlace={handleStartRemovePlace}
//         />
//         <Places
//           title="Available Places"
//           places={AVAILABLE_PLACES}
//           fallbackText="Sorting places by distance..."
//           onSelectPlace={handleSelectPlace}
//         />
//         {/* <Places
//           title="Available Places"
//           places={availablePlaces}
//           fallbackText="Sorting places by distance..."
//           onSelectPlace={handleSelectPlace}
//         /> */}
//       </main>
//     </>
//   );
// }

// export default App;

import "./App.css";
import { AVAILABLE_PLACES } from "./data/data.js";

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import PlacePicker from "./pages/PlacePicker";
import Quiz from "./pages/Quiz";
import Counter from "./pages/Counter";
import Users from "./pages/Users.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <div id="main" className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="placepicker" element={<PlacePicker />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="counter" element={<Counter />} />
          <Route path="users" element={<Users />} />

          {/* 404 fallback */}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}
