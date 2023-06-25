import React, { useEffect, useState } from "react";
import api from "./api";
import { Card, CardContent, Typography } from "@mui/material";

const DailyQuote = () => {
  const [dailyQuote, setDailyQuote] = useState({
    author: "",
    text: "",
  });
  const [today, setToday] = useState(-1);

  useEffect(() => {
    const checkDateChange = () => {
      const newToday = new Date().getDate();
      if (newToday !== today) {
        setToday(newToday);
        fetchRandomQuote();
      }
    }

    checkDateChange();
    const interval = setInterval(() => {
      checkDateChange();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [today]);

  const fetchRandomQuote = async () => {
    const savedDate = localStorage.getItem("date");
    if (savedDate === new Date().getDate().toString()) {
      setDailyQuote({
        author: localStorage.getItem("author"),
        text: localStorage.getItem("text"),
      });
    }
    try {
      const randomQuote = await api.getRandomQuote();
      setDailyQuote(randomQuote);
      localStorage.setItem("author", randomQuote.author);
      localStorage.setItem("text", randomQuote.text);
      localStorage.setItem("date", new Date().getDate());
    } catch (error) {}
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h4" component="h1">
          Daily Quote
        </Typography>
        <Typography gutterBottom variant="h6">
          {dailyQuote.text}
        </Typography>
        <Typography variant="subtitle1">- {dailyQuote.author}</Typography>
      </CardContent>
    </Card>
  );
};

export default DailyQuote;
