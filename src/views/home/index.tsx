"use client";

import { Grid } from "@mui/material";
import { useGetPokemons } from "@src/api";
import Page from "@src/components/Page";
import React, { Children } from "react";
import PokemonCard from "./components/PokemonCard";
import Wrapper from "@src/components/Wrapper";
import Link from "next/link";
import LoadingScreen from "@src/components/LoadingScreen";

const HomeView = () => {
  const { data: pokemons, isLoading } = useGetPokemons();

  return (
    <Page sx={{ bgcolor: "neutralBg.main" }}>
      <Wrapper sx={{ py: "24px", minHeight: "100vh" }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {Children.toArray(
              pokemons?.results.map((pokemon) => {
                return (
                  <Grid item xs={12} sm={4} lg={3}>
                    <Link
                      href={{ pathname: pokemon.name }}
                      style={{ textDecoration: "none" }}
                    >
                      <PokemonCard pokemon={pokemon} />
                    </Link>
                  </Grid>
                );
              })
            )}
          </Grid>
        )}
      </Wrapper>
    </Page>
  );
};

export default HomeView;
