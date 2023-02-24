import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MUI_THEME_CONF } from "./utils/config";
import store from "./features/store";
import { Provider } from "react-redux";

const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const appTheme = createTheme(MUI_THEME_CONF);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <React.StrictMode>
            <>
              <CssBaseline />
              <App />
            </>
          </React.StrictMode>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
