import {
  fetchPokemon,
  fetchPokemonSpecies,
  queryKeyPokemon,
  queryKeyPokemonSpecies,
} from "@src/api";
import { unslugString } from "@src/helpers/removeDash";
import PokemonDetailView from "@src/views/pokemon-detail";
import { QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import React from "react";

interface Props {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pokemonName = unslugString(params.name);

  return { title: `PokePedia | ${pokemonName}` };
}

const PokemonDetail = ({ params }: Props) => {
  const { name } = params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: [queryKeyPokemon, name],
    queryFn: () => fetchPokemon(name),
  });

  queryClient.prefetchQuery({
    queryKey: [queryKeyPokemonSpecies, name],
    queryFn: () => fetchPokemonSpecies(name),
  });

  return <PokemonDetailView />;
};

export default PokemonDetail;
