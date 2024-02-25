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
import React, {
  Children,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import VarietyChip from "./components/VarietyChip";
import Profile from "./sections/Profile";

interface LoaderProps extends PropsWithChildren {
  loading: boolean;
}

const Loader: FC<LoaderProps> = ({ children, loading }) => {
  return loading ? <LoadingScreen /> : children;
};

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
    useGetPokemonSpecies(name as string);

  useEffect(() => {
    const defaultPokemon = pokemonSpeciesData?.varieties.find(
      (variety) => variety.is_default
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
          sx={{ cursor: "pointer" }}
          onClick={back}
          mb={4}
        >
          <ArrowBack />
          <Typography typography="kodeMonoBold" fontSize="20px">
            Back to Collection
          </Typography>
        </Stack>

        <Loader loading={isLoadingPokemon}>
          <Typography
            typography="kodeMonoMedium"
            fontSize="32px"
            color="neutral300.main"
            textAlign="center"
          >
            {capitalizeEveryWord(pokemonData?.name || "")}

            <Typography
              component="span"
              ml={2}
              typography="kodeMonoMedium"
              fontSize="32px"
              color="neutral400.main"
            >
              #{pokemonData?.order}
            </Typography>
          </Typography>

          {(pokemonSpeciesData?.varieties.length || 0) > 1 && (
            <Stack
              spacing={1}
              direction={{ xs: "column", md: "row" }}
              justifyContent="center"
              mt={2}
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
            <Profile pokemon={pokemonVarietyData || ({} as Pokemon)} mt={4} />
          </Loader>
        </Loader>
      </Wrapper>
    </Page>
  );
};

export default PokemonDetailView;
