import { PokemonSpecies } from "@src/types/pokemon-species";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

const queryKeyPokemonSpecies = "pokemon-species";

const fetchPokemonSpecies = async (name: string): Promise<PokemonSpecies> => {
  const { data } = await axios.get<PokemonSpecies>(`/pokemon-species/${name}`);
  return data;
};

const useGetPokemonSpecies = (name: string) => {
  return useQuery({
    queryKey: [queryKeyPokemonSpecies, name],
    queryFn: () => fetchPokemonSpecies(name),
  });
};

export { fetchPokemonSpecies, useGetPokemonSpecies, queryKeyPokemonSpecies };
