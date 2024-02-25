import { queryKeyPokemon } from "@src/api";
import PokemonDetailView from "@src/views/pokemon-detail";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

interface Props {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const PokemonDetail = ({ params }: Props) => {
  const { name } = params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: [queryKeyPokemon, name],
  });

  return <PokemonDetailView />;
};

export default PokemonDetail;