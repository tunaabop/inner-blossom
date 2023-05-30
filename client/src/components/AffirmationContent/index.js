import React, { useEffect, useState } from "react";
// import { faHeart, faHeartO } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.css";


const AffirmationContent = () => {
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/random");
      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.error("Failed to fetch quote", error);
    }
  };

  useEffect(() => {
    fetchData();
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = () => {
    setFavorites([...favorites, quote]);
  };

  return (
    <div>
      <div className="card mb-3">
        <h4 className="card-header bg-primary text-light p-2 m-0">
          Your inspirational quote of the day is:
        </h4>
        <p>"{quote ? quote.q : ""}"</p>
        <p>- {quote ? quote.a : ""}</p>
        <button className="favorite-btn" onClick={addToFavorites}>
          <i className="fa fa-heart"></i>
        </button>
      </div>
      <div>
        <h4 className="card-header bg-primary text-light p-2 m-0">
          Your favorited quotes:
        </h4>
        {favorites.map((quote, index) => (
          <div key={index} className="card mb-3">
            <p>"{quote.q}"</p>
            <p>- {quote.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffirmationContent;
