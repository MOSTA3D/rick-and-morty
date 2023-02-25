import { Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ComponentOrLoading from "../containers/ComponentOrLoading";
import { useAppSelector } from "../custom-hooks/reduxHooks";
import { useGetCharactersQuery } from "../types/graphql-types";
import { PAGE_SIZE } from "../utils/config";
import CharacterCardComponent from "./CharacterCard";

function CharactersComponent() {
  const theme = useTheme();
  const { data, loading, error, fetchMore } = useGetCharactersQuery({
    variables: { page: 1, pageSize: PAGE_SIZE } as any,
  });
  const characters = data?.characters?.results;
  const favChar = useAppSelector((state) => state.favoriteChar);

  const handleLoadMore = () => {
    fetchMore({
      variables: { page: data?.characters?.info?.next, pageSize: PAGE_SIZE },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          characters: {
            ...fetchMoreResult.characters,
            results: [
              ...(prev?.characters?.results || []),
              ...(fetchMoreResult?.characters?.results || []),
            ],
          },
        });
      },
    });
  };

  let timeOutKey: NodeJS.Timeout;

  const handleWindowScroll = () => {
    if (timeOutKey) {
      clearTimeout(timeOutKey);
    }
    timeOutKey = setTimeout(() => {
      const scrollOffset = Math.ceil(window.scrollY + window.innerHeight);
      const pageScrollEnd = document.body.scrollHeight;
      if (scrollOffset > pageScrollEnd - 50) {
        handleLoadMore();
      }
    }, 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  useEffect(() => {
    console.group("Characters");
    console.log(characters);
    console.groupEnd();
  }, [data]);
  return (
    <ComponentOrLoading isLoading={loading}>
      <Grid container spacing={3}>
        {characters &&
          characters.map((character) => (
            <CharacterCardComponent
              isFavorite={favChar === character?.id}
              key={character?.name}
              {...{ character }}
            />
          ))}
      </Grid>
    </ComponentOrLoading>
  );
}

export default CharactersComponent;
