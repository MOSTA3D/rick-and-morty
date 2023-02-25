import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createTheme } from "@mui/material";

export const MUI_THEME_CONF = Object.freeze({
  palette: {
    background: {
      default: "#0f535a",
    },
    text: {
      primary: "#00acc1",
      secondary: '#43a047'
    },
    primary: {
      main: "#62a4ab",
      dark: "#0f535a",
      light: "#5ddef4"
    },
    secondary: {
      main: "#43a047",
      dark: "#00701a",
      light: "#76d275",
    },
    warning: {
      main: "#ffeb3b"
    }
  },
});

export const PAGE_SIZE = 20;

export const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export const appTheme = createTheme(MUI_THEME_CONF);


