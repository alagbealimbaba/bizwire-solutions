import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

const customTheme = extendTheme({
  fonts: {
    heading: "'Nunito', sans-serif",
    body: "'Roboto', sans-serif",
  },
  breakpoints: {
    sm: "100px", 
    md: "840px",
    lg: "1289px", 
  },
  styles: {
    global: {
      "h1, h2, h3, h4, h5, h6": {
        fontSize: "36px",
        color: "#1e1666",
      },
      body: {
        fontSize: "16px",
        color: "#6a7c92",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      {" "}
      <CSSReset />
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
