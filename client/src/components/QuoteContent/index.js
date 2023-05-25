import React, { useEffect, useState } from "react";

const QuoteContent = () => {
  const [quote, setQuote] = useState([])

    const fetchData = async () => {
        const response = await fetch("https://zenquotes.io/api/quotes/");
        const data = await response.json()
        setQuote(data)
      };
  

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="card mb-3">
        <h4 className="card-header bg-primary text-light p-2 m-0">Your inspirational quote of the day is:</h4>
            <p>"{ quote }"</p>
    </div>
  );
};

export default QuoteContent;
