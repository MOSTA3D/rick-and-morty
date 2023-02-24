import { useEffect } from "react";
import { useParams } from "react-router";
import { useGetCharacterByIdQuery } from "../types/graphql-types";
import ComponentOrLoading from "../containers/ComponentOrLoading";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
  Avatar,
  Box,
  Button,
  Card,
  Slide,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAppDispatch, useAppSelector } from "../custom-hooks/reduxHooks";
import { setFavoriteChar } from "../features/favoriteCar";
import StarIcon from "@mui/icons-material/Star";


interface CharacterState {
  [key: string]: string;
}

const useStyles = makeStyles((_theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
}));

function CharacterDetailsComponent() {
  const { characterId } = useParams();
  const favCharId = useAppSelector((state) => state.favoriteChar);
  const dispatch = useAppDispatch();
  const [character, setCharacter] = React.useState<CharacterState>({
    name: "",
    gender: "",
    status: "",
    specie: "",
  });
  const { loading, error, data } = useGetCharacterByIdQuery({
    variables: { id: characterId || "" },
  });
  const id = data?.character?.id;
  const classes = useStyles();
  const theme: Theme = useTheme();
  const isFavorite = id === favCharId;

  const handleSetFavClick = (_e: React.MouseEvent<HTMLElement>) => {
    dispatch(setFavoriteChar(id || ""));
  };

  useEffect(() => {
    const characterResponse = data?.character;
    setCharacter({
      ["Name"]: characterResponse?.name || "",
      ["Gender"]: characterResponse?.gender || "",
      ["Status"]: characterResponse?.status || "",
      ["Specie"]: characterResponse?.species || "",
    });
  }, [data]);
  return (
    <ComponentOrLoading isLoading={loading}>
      <Box className={classes.root}>
        <Slide direction="right" in mountOnEnter unmountOnExit>
          <Avatar
            variant="rounded"
            src={data?.character?.image as string}
            sx={{
              width: 400,
              height: "auto",
              marginBottom: 5,
              "@media (max-width: 600px)": {
                width: 280,
              },
            }}
          />
        </Slide>
        <Slide direction="up" in mountOnEnter unmountOnExit>
          <Table
            sx={{ backgroundColor: theme.palette.primary.main, width: 500 }}
            component={Card}
          >
            <TableBody>
              <TableRow>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSetFavClick}
                  >
                    {isFavorite && ("Un")}Set Favorite
                  </Button>
                </TableCell>
                <TableCell>{isFavorite && <StarIcon color="warning"/>}</TableCell>
              </TableRow>
              {character &&
                Object.entries(character).map((e) => (
                  <TableRow key={e[0]}>
                    <TableCell>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary.dark"
                      >
                        {e[0]}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" color="white ">
                        {e[1]}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Slide>
      </Box>
    </ComponentOrLoading>
  );
}

export default CharacterDetailsComponent;
