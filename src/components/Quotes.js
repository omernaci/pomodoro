import { useState, useEffect } from "react";
import { Card } from "antd";

const Quotes = () => {
  const quotes = [
    {
      quote: "Hard work beats talent when talent doesn't work hard.",
      writer: "- Tim Notke",
    },
    {
      quote:
        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
      writer: "- Albert Schweitzer",
    },
    {
      quote: "The only way to do great work is to love what you do.",
      writer: "- Steve Jobs",
    },
    {
      quote: "The future depends on what you do today.",
      writer: "- Mahatma Gandhi",
    },
    {
      quote: "Don't watch the clock; do what it does. Keep going.",
      writer: "- Sam Levenson",
    },
    {
      quote:
        "Success is the sum of small efforts, repeated day in and day out.",
      writer: "- Robert Collier",
    },
    {
      quote:
        "The only limit to our realization of tomorrow will be our doubts of today.",
      writer: "- Franklin D. Roosevelt",
    },
    {
      quote:
        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
      writer: "- Malcolm X",
    },
    {
      quote: "The secret of getting ahead is getting started.",
      writer: "- Mark Twain",
    },
    {
      quote: "The expert in anything was once a beginner.",
      writer: "- Helen Hayes",
    },
  ];

  const [randomQuote, setRandomQuote] = useState(quotes[0]);

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    generateRandomQuote();
  }, []);

  return (
    <Card className="quotes-card">
      <p>{randomQuote.quote}</p>
      <p className="writer">{randomQuote.writer}</p>
    </Card>
  );
};

export default Quotes;
