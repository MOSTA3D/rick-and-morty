import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function NavBarComponent() {
  const navigateTo = useNavigate();

  const handleHomeClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    navigateTo(-1);
  };

  return (
    <Box sx={{ marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar sx={{ alignItems: "center" }}>
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <Button variant="text" onClick={handleHomeClick}>
              <ChevronLeftIcon fontSize="large" color="warning" />
            </Button>

            <Typography variant="h4" component="span" color="primary.dark">
              Rick&nbsp;
            </Typography>
            <Typography variant="h4" component="span" color="white">
              &&nbsp;
            </Typography>
            <Typography variant="h4" component="span" color="warning.main">
              Morty
            </Typography>
          </Box>

          <Link to="/characters">
            <Button variant="contained" color="secondary">
              Home
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
