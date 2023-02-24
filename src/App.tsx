import React, { useEffect, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import CharactersComponent from "./components/Characters";
import CharacterDetailsComponent from "./components/CharactersDetails";
import { Container, useTheme } from "@mui/material";
import NavBarComponent from "./components/NavBar";
import { CharacterStatus } from "./enums/CharacterStatus";
import { useAppDispatch } from "./custom-hooks/reduxHooks";
import { setStatusColorMapper, StatusColorMapperState } from "./features/statusColorMapperSlice";

function App() {

  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(()=> {

    const statusColorMapper:StatusColorMapperState = {
      [CharacterStatus.Dead]: theme.palette.error.main,
      [CharacterStatus.Alive]: theme.palette.success.main,
      [CharacterStatus.Unknown]: theme.palette.warning.main,
    };

    dispatch(setStatusColorMapper(statusColorMapper));

  },[]);

  return (
    <div>
      <NavBarComponent/>
      <Container sx={{marginBottom: 4}}>
        <Routes>
          <Route path="/characters" element={<CharactersComponent />} />
          <Route
            path="/characters/:characterId"
            element={<CharacterDetailsComponent />}
          />
          <Route path="*" element={<Navigate to="/characters" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
