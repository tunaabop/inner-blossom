import React, { useEffect, useState } from "react";


const AffirmationContent = () => {
  const [quote, setQuote] = useState([""])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/random");
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error("Failed to fetch quote", error);
    }
  };
  
  

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="card mb-3">
        <h4 className="card-header bg-primary text-light p-2 m-0">Your inspirational quote of the day is:</h4>
        <p>"{quote.length > 0 ? quote[0].q : ''}"</p>
        <p>- {quote.length > 0 ? quote[0].a : ''}</p>
    </div>
  );
};

export default AffirmationContent;
