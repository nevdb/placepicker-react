import { useState, useRef, useEffect, useCallback } from "react";
import globe from "./../assets/globe.png";
import "./../App.css";
import { AVAILABLE_PLACES } from "../data/data.js";
import Modal from "../components/Modal.jsx";
import DeleteConfirmation from "../components/placepicker/DeleteConfirmation.jsx";
import Places from "../components/placepicker/Places.jsx";
import { sortPlacesByDistance } from "../utils/loc.js";

const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id),
);

function PlacePicker() {
  const selectedPlace = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude,
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds]),
      );
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current),
    );
    setIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)),
    );
  }, []);

  return (
    <>
      <Modal open={isOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={globe} alt="Globe" />
        <h1>PlacePicker</h1>
        <p>
          Create a personalized travel collection of places you dream of
          visiting or have already explored.
        </p>
      </header>
      <main>
        <Places
          title="I would like to visit..."
          fallbackText={"Select the places you would like to visit."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
        {/* <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        /> */}
      </main>
    </>
  );
}

export default PlacePicker;
