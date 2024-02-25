import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "..";

const queryKeyPokemon = "pokemons";

const fetchPokemons = async (): Promise<ApiReturnType<Pokemon[]>> => {
  const { data } = await axios.get<ApiReturnType<Pokemon[]>>("/pokemon");

  const details = data.results.map(async (pokemon) => {
    const detail = await fetchPokemon(pokemon.name);
    return detail;
  });

  const pokemonDetails = await Promise.all(details);
  data.results = pokemonDetails;

  return data;
};

const useGetPokemons = () => {
  return useQuery({
    queryKey: [queryKeyPokemon],
    queryFn: fetchPokemons,
  });
};

export { fetchPokemons, useGetPokemons };
