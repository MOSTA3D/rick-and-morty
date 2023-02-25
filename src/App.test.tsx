import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./features/store";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { apolloClient, appTheme } from "./utils/config";

test("expect title existence", () => {
  const {getByText} = render(
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

  const rick = getByText(/rick/i)
  const morty = getByText(/morty/i);
  const rickAndMorty = `${rick.textContent} & ${morty.textContent}`

  expect(rickAndMorty).toEqual("Rick & Morty");
});
