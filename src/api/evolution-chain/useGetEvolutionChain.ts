import { PokemonSpecies } from "@src/types/pokemon-species";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryKeyEvolutionChain = "evolution-chain";

const fetchEvolutionChain = async (
  url: string
): Promise<EvolutionChain | undefined> => {
  if (!url) return undefined;

  const { data } = await axios.get(url);
  return data;
};

const useGetEvolutionChain = (url: string) => {
  return useQuery({
    queryKey: [queryKeyEvolutionChain, url],
    queryFn: () => fetchEvolutionChain(url),
  });
};

export { fetchEvolutionChain, useGetEvolutionChain, queryKeyEvolutionChain };
