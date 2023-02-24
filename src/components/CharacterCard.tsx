import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { Character, Maybe } from "../types/graphql-types";

interface CharacterCardProps {
  character: Maybe<Character>;
  isFavorite: boolean;
}
function CharacterCardComponent(props: CharacterCardProps) {
  const { character, isFavorite } = props;
  const timeout = useMemo<string>(() => (Math.random() * 300).toFixed(), []);
  const theme = useTheme();

  return (
    <Grid key={character?.id} item xs={12} sm={6} md={4} lg={3}>
      <Link to={`/characters/${character?.id}`}>
        <Zoom in style={{ transitionDelay: `${timeout}ms` }}>
          <Card
            sx={{
              position: "relative",
              cursor: "pointer",
              border: `2px solid ${theme.palette.secondary.main}`,
            }}
          >
            <CardMedia
              component="img"
              image={character?.image || ""}
              title={character?.name || ""}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              zIndex={1}
              boxShadow="#111 0px 150px 150px -12px inset"
              sx={{
                opacity: 0,
                transition: "box-shadow, opacity 0.2s ease-in-out",
                ":hover": { opacity: 1 },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  textAlign="left"
                  gutterBottom
                  variant="h5"
                  fontWeight="bold"
                  color="primary"
                  component="span"
                >
                  {character?.name}
                </Typography>
                {isFavorite && <StarIcon color="warning" />}
              </CardContent>
            </Box>
          </Card>
        </Zoom>
      </Link>
    </Grid>
  );
}

export default CharacterCardComponent;
