import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

const queryKeyPokemon = "pokemon";

const fetchPokemon = async (name: string): Promise<Pokemon | null> => {
  if (name) {
    const { data } = await axios.get<Pokemon>(`/pokemon/${name}`);
    return data;
  }

  return null;
};

const useGetPokemon = (name: string) => {
  return useQuery({
    queryKey: [queryKeyPokemon, name],
    queryFn: () => fetchPokemon(name),
  });
};

export { fetchPokemon, useGetPokemon, queryKeyPokemon };