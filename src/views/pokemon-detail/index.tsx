"use client";

import { ArrowBack } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  useGetEvolutionChain,
  useGetPokemon,
  useGetPokemonSpecies,
} from "@src/api";
import LoadingScreen from "@src/components/LoadingScreen";
import Page from "@src/components/Page";
import Wrapper from "@src/components/Wrapper";
import { useParams, useRouter } from "next/navigation";
import React, {
  Children,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import VarietyChip from "./components/VarietyChip";
import Profile from "./sections/Profile";
import Evolution from "./sections/Evolution";
import Stat from "./sections/Stat";
import { Pokemon } from "@src/types/pokemon";
import { unslugString } from "@src/helpers/removeDash";
import { EvolutionChain } from "@src/types/evolution-chain";

interface LoaderProps extends PropsWithChildren {
  loading: boolean;
}

const Loader: FC<LoaderProps> = ({ children, loading }) => {
  return loading ? <LoadingScreen /> : children;
};

const Image = styled("img")(() => ({}));

const PokemonDetailView = () => {
  const { back } = useRouter();
  const { name } = useParams();

  const [selectedVariety, setSelectedVariety] = useState<string>("");

  const { data: pokemonData, isLoading: isLoadingPokemon } = useGetPokemon(
    name as string
  );
  const { data: pokemonVarietyData, isLoading: isLoadingPokemonVariety } =
    useGetPokemon(selectedVariety);
  const { data: pokemonSpeciesData, isLoading: isLoadingPokemonSpecies } =
    useGetPokemonSpecies(pokemonData?.species.name || "");
  const { data: evolutionChainData, isLoading: isLoadingEvolutionChain } =
    useGetEvolutionChain(pokemonSpeciesData?.evolution_chain?.url || "");

  useEffect(() => {
    const defaultPokemon = pokemonSpeciesData?.varieties?.find(
      (variety) => variety?.is_default
    );

    setSelectedVariety(defaultPokemon?.pokemon.name || "");
  }, [pokemonSpeciesData?.varieties]);

  return (
    <Page bgcolor="neutralBg.main">
      <Wrapper sx={{ py: "24px", minHeight: "100vh" }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          color="neutral300.main"
          sx={{ cursor: "pointer", width: "fit-content" }}
          onClick={back}
          mb={4}
        >
          <ArrowBack />
          <Typography typography="kodeMonoBold" fontSize="20px">
            Back to Collection
          </Typography>
        </Stack>

        <Loader
          loading={
            isLoadingPokemon ||
            isLoadingPokemonSpecies ||
            isLoadingEvolutionChain
          }
        >
          <Typography
            typography="kodeMonoMedium"
            fontSize={{ xs: "32px", md: "52px" }}
            color="neutral300.main"
            textAlign="center"
          >
            {unslugString(pokemonData?.name || "")}

            <Typography
              component="span"
              ml={{ xs: 1, md: 2 }}
              typography="kodeMonoMedium"
              fontSize={{ xs: "20px", md: "32px" }}
              color="neutral400.main"
            >
              #{pokemonData?.id}
            </Typography>
          </Typography>

          {(pokemonSpeciesData?.varieties?.length || 0) > 1 && (
            <Stack
              spacing={1}
              rowGap={1}
              direction={{ xs: "column", md: "row" }}
              justifyContent="center"
              mt={2}
              flexWrap="wrap"
            >
              {Children.toArray(
                pokemonSpeciesData?.varieties.map((variety) => (
                  <VarietyChip
                    variety={variety.pokemon.name || ""}
                    selectedVariety={selectedVariety}
                    setSelectedVariety={setSelectedVariety}
                  />
                ))
              )}
            </Stack>
          )}

          <Loader loading={isLoadingPokemonVariety}>
            <Stack alignItems="center" mt={4}>
              <Image
                src={
                  pokemonVarietyData?.sprites?.other["official-artwork"]
                    .front_default
                }
                alt={pokemonVarietyData?.name}
                sx={{
                  width: "250px",
                  height: "250px",
                  mx: "auto",
                  mb: 6,
                }}
              />
            </Stack>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Profile pokemon={pokemonVarietyData || ({} as Pokemon)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stat stats={pokemonVarietyData?.stats || []} />
              </Grid>
            </Grid>

            <Evolution
              mt={5}
              evolutionChain={evolutionChainData || ({} as EvolutionChain)}
            />
          </Loader>
        </Loader>
      </Wrapper>
    </Page>
  );
};

export default PokemonDetailView;
