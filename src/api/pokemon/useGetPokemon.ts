import { Pokemon } from "@src/types/pokemon";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

const queryKeyPokemon = "pokemon";

const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const { data } = await axios.get<Pokemon>(`/pokemon/${name}`);
  return data;
};

const useGetPokemon = (name: string) => {
  return useQuery({
    queryKey: [queryKeyPokemon, name],
    queryFn: () => fetchPokemon(name),
  });
};

export { fetchPokemon, useGetPokemon, queryKeyPokemon };
