import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_TO_FAVORITES } from "../../utils/mutations";

const AffirmationContent = () => {
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/random");
      const data = await response.json();
      console.log(data[0]);
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

  const handleFavoriteSubmit = async () => {
    try {
      const { data } = await addToFavorites({
        variables: {
          quote: { quote: quote.q, author: quote.a },
        },
      });
      console.log(data.addToFavorites.favorites);
      setFavorites(data.addToFavorites.favorites);
    } catch (error) {
      console.error("Failed to add to favorites", error);
    }
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
    favorites.map((q) => {
      console.log(q);
    });
    return quote && favorites.some((q) => q.quote === quote.q);
  };

  return (
    <div>
      <div className="card mb-3">
        <h4 className="card-header bg-primary text-light p-2 m-0">
          Your inspirational quote of the day is:
        </h4>
        {Auth.loggedIn() ? (
          <>
            <p style={{ fontWeight: "bold" }}>"{quote ? quote.q : ""}"</p>
            <p style={{ fontWeight: "bold" }}>- {quote ? quote.a : ""}</p>
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
              <button className="favorite-btn" onClick={handleFavoriteSubmit}>
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
          </>
        ) : (
          <p>
            You need to be logged in to see the affirmations. Please{" "}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>

      {Auth.loggedIn() && (
        <div>
          <h4 className="card-header bg-primary text-light p-2 m-0">
            Your favorited quotes:
          </h4>
          {favorites.map((quote, index) => {
            return (
              <div key={index} className="card mb-3">
                <p style={{ fontWeight: "bold" }}>"{quote.quote}"</p>
                <p style={{ fontWeight: "bold" }}>- {quote.author}</p>
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AffirmationContent;
