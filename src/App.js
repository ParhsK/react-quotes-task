import "./App.css";
import QuoteManager from "./QuoteManager";
import DailyQuote from "./DailyQuote";
import { Container, Stack } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <DailyQuote />
          <QuoteManager />
        </Stack>
      </Container>
    </div>
  );
}

export default App;
