"use client";

import { ArrowBack } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useGetPokemon } from "@src/api";
import { useGetPokemonSpecies } from "@src/api/pokemon-species/useGetPokemonSpecies";
import LoadingScreen from "@src/components/LoadingScreen";
import Page from "@src/components/Page";
import Wrapper from "@src/components/Wrapper";
import { capitalizeEveryWord } from "@src/helpers/capitalizeWord";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PokemonDetailView = () => {
  const { back } = useRouter();
  const { name } = useParams();

  const [selectedVariety, setSelectedVariety] = useState<string>("");

  const { data: pokemonData, isLoading: isLoadingPokemon } =
    useGetPokemon(selectedVariety);
  const { data: pokemonSpeciesData, isLoading: isLoadingPokemonSpecies } =
    useGetPokemonSpecies(name as string);

  useEffect(() => {
    const defaultPokemon = pokemonSpeciesData?.varieties.find(
      (variety) => variety.is_default
    );

    setSelectedVariety(defaultPokemon?.pokemon.name || "");
  }, [pokemonSpeciesData?.varieties]);

  console.log(pokemonSpeciesData);

  return (
    <Page bgcolor="neutralBg.main">
      <Wrapper sx={{ py: "24px", minHeight: "100vh" }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          color="neutral300.main"
          sx={{ cursor: "pointer" }}
          onClick={back}
          mb={4}
        >
          <ArrowBack />
          <Typography typography="kodeMonoBold" fontSize="20px">
            Back to Collection
          </Typography>
        </Stack>

        {isLoadingPokemon || isLoadingPokemonSpecies ? (
          <LoadingScreen />
        ) : (
          <Typography
            typography="kodeMonoMedium"
            fontSize="32px"
            color="neutral300.main"
            textAlign="center"
          >
            {capitalizeEveryWord(pokemonSpeciesData?.name || "")}

            <Typography
              component="span"
              ml={2}
              typography="kodeMonoMedium"
              fontSize="32px"
              color="neutral400.main"
            >
              #{pokemonSpeciesData?.order}
            </Typography>
          </Typography>
        )}
      </Wrapper>
    </Page>
  );
};

export default PokemonDetailView;
