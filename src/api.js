import { api_base_url } from "./config.js";
import axios from "axios";

class APIError extends Error {
  constructor(message) {
    super(message);
    this.name = "APIError";
  }
}

async function getQuotes() {
  try {
    const response = await axios.get(api_base_url + "/quotes");
    const result = Array.isArray(response.data);
    if (!response || result === false) {
      throw new APIError();
    }
    return response.data;
  } catch (error) {
    throw new APIError();
  }
}

async function getQuote(quoteId) {
  try {
    const response = await axios.get(api_base_url + "/quotes/" + quoteId);
    if (!response) {
      throw new APIError();
    }
    return response.data;
  } catch (error) {
    throw new APIError();
  }
}

async function getRandomQuote() {
  try {
    const response = await axios.get(api_base_url + "/quotes/random");
    if (!response) {
      throw new APIError();
    }
    return response.data;
  } catch (error) {
    throw new APIError();
  }
}

async function addNewQuote(text, author) {
  if (!text) {
    throw new APIError("Text is missing");
  }
  // Dirty hack to allow optional author because backend returns 500 when author is empty string
  const forcedAuthor = author || " ";
  const newQuote = { text, author: forcedAuthor };
  try {
    const response = await axios.post(api_base_url + "/quotes", newQuote);
    return response.data;
  } catch (error) {
    if (error.response.status === 409) {
      throw new APIError("Quote already exists");
    }
    throw new APIError("Problem adding new quote.");
  }
}

async function deleteQuote(quoteId) {
  try {
    await axios.delete(api_base_url + "/quotes/" + quoteId);
    return;
  } catch (error) {
    throw new APIError();
  }
}

async function editQuote(quoteId, text, author) {
  if (!text) {
    throw new APIError("Text is missing");
  }
  const forcedAuthor = author || "";
  const editedQuote = { text, author: forcedAuthor };
  try {
    await axios.put(api_base_url + "/quotes/" + quoteId, editedQuote);
  } catch (error) {
    throw new APIError();
  }
}

const api = {
  getQuotes,
  getQuote,
  getRandomQuote,
  addNewQuote,
  deleteQuote,
  editQuote,
};

export default api;
