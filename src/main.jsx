import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import CounterContextProvider from "./Context/CounterContext.jsx";
import TokenContextProvider from "./Context/TokenContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardContextProvider from "./Context/CardContext.jsx";
import { Provider } from "react-redux";
import store from "./Redaux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <CardContextProvider>
  <TokenContextProvider>
    <CounterContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CounterContextProvider>
  </TokenContextProvider>
  </CardContextProvider>
  </Provider>,
)
