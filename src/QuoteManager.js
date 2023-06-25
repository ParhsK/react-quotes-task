import React, { useEffect, useState } from "react";
import "./QuoteManager.css";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import api from "./api";
import { Stack } from "@mui/material";

const QuoteManager = () => {
  const [quotes, setQuotes] = useState([]);
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [open, setOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState();

  const showSnackBar = (message) => {
    setOpen(true);
    setSnackBarMessage(message);
  };

  const addClickedHandler = async () => {
    try {
      await api.addNewQuote(quoteText, quoteAuthor);
      setQuotes(await api.getQuotes());
      showSnackBar("New quote added!");
    } catch (error) {
      console.log(error.message)
      showSnackBar(error.message);
    }
  };

  const deleteClickedHandler = async (quoteId) => {
    try {
      await api.deleteQuote(quoteId);
      setQuotes(await api.getQuotes());
      showSnackBar("Quote deleted!");
    } catch (error) {
      showSnackBar("Problem deleting quote.");
    }
  };

  const editClickedHandler = async (quoteId) => {
    try {
      await api.editQuote(quoteId, quoteText, quoteAuthor);
      setQuotes(await api.getQuotes());
      showSnackBar("Quote edited!");
    } catch (error) {
      showSnackBar("Problem editing quote");
    }
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setQuotes(await api.getQuotes());
      } catch (error) {
        showSnackBar("Problem fetching quotes.");
      }
    };
    fetchQuotes();
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h4" component="h1">
            Quote Manager
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>Quote Text</h3>
                </TableCell>
                <TableCell>
                  <h3>Author</h3>
                </TableCell>
                <TableCell>
                  <h3>Actions</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>{quote.text}</TableCell>
                  <TableCell>{quote.author}</TableCell>
                  <TableCell>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <Tooltip title="Delete quote">
                        <Button
                          variant="outlined"
                          type="button"
                          onClick={() => deleteClickedHandler(quote.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Edit quote by filling the 'Quote' and 'Author' fields below and clicking the edit icon">
                        <Button
                          variant="outlined"
                          type="button"
                          onClick={() => editClickedHandler(quote.id)}
                        >
                          <EditIcon />
                        </Button>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <h3>Add or Edit new quote</h3>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Input
              placeholder="Quote"
              type="text"
              id="quoteText"
              value={quoteText}
              onChange={(event) => setQuoteText(event.target.value)}
            />
            <label htmlFor="quoteAuthor"></label>
            <Input
              placeholder="Author"
              type="text"
              id="quoteAuthor"
              value={quoteAuthor}
              onChange={(event) => setQuoteAuthor(event.target.value)}
            />
            <span> </span>
            <Tooltip title="Create new quote">
              <Button
                variant="outlined"
                size="small"
                type="button"
                onClick={addClickedHandler}
              >
                <AddIcon />
              </Button>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        onClose={(event, reason) => {
          setOpen(false);
        }}
        autoHideDuration={1000}
        message={snackBarMessage}
      />
    </div>
  );
};

export default QuoteManager;
