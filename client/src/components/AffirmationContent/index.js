import React, { useEffect, useState } from "react";

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
    fetch("/api/favorites")
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data);
      })
      .catch((error) => {
        console.error("Failed to fetch favorites", error);
      });
  }, []);

  const addToFavorites = () => {
    fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quote),
    })
      .then((response) => response.json())
      .then((data) => {
        setFavorites([...favorites, data]);
      })
      .catch((error) => {
        console.error("Failed to add to favorites", error);
      });
  };

  const removeFromFavorites = (quote) => {
    fetch("/api/favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quote),
    })
      .then((response) => response.json())
      .then(() => {
        const updatedFavorites = favorites.filter((q) => q.q !== quote.q);
        setFavorites(updatedFavorites);
      })
      .catch((error) => {
        console.error("Failed to remove from favorites", error);
      });
  };

  const isFavorite = (quote) => {
    return quote && favorites.some((q) => q.q === quote.q);
  };

  return (
    <div>
      <div className="card mb-3">
        <h4 className="card-header bg-primary text-light p-2 m-0">
          Your inspirational quote of the day is:
        </h4>
        <p>"{quote ? quote.q : ""}"</p>
        <p>- {quote ? quote.a : ""}</p>
        {isFavorite(quote) ? (
          <button
            className="favorite-btn"
            onClick={() => removeFromFavorites(quote)}
          >
            <span
              className="emoji"
              role="img"
              aria-label="heart"
              aria-hidden="false"
            >
              ❤️
            </span>
          </button>
        ) : (
          <button className="favorite-btn" onClick={addToFavorites}>
            <span
              className="emoji"
              role="img"
              aria-label="heart"
              aria-hidden="false"
            >
              ❤️
            </span>
          </button>
        )}
      </div>
      <div>
        <h4 className="card-header bg-primary text-light p-2 m-0">
          Your favorited quotes:
        </h4>
        {favorites.map((quote, index) => (
          <div key={index} className="card mb-3">
            <p>"{quote.q}"</p>
            <p>- {quote.a}</p>
            <button
              className="favorite-btn"
              onClick={() => removeFromFavorites(quote)}
            >
              <span
                className="emoji"
                role="img"
                aria-label="heart"
                aria-hidden="false"
              >
                ❤️
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffirmationContent;
