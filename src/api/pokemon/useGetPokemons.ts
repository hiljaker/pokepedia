import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "..";
import { Pokemon } from "@src/types/pokemon";

const queryKeyPokemon = "pokemons";
const queryKeySelectedPokemons = "selected-pokemons";

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

const fetchSelectedPokemons = async (pokemons: string[]) => {
  if (!pokemons.length) return [];

  const pokemonPromises = pokemons.map(async (pokemon) => {
    const pokemonData = await fetchPokemon(pokemon);
    return pokemonData;
  });

  const collectedPokemons = await Promise.all(pokemonPromises);

  return collectedPokemons;
};

const useGetSelectedPokemons = (pokemons: string[]) => {
  return useQuery({
    queryKey: [queryKeySelectedPokemons, ...pokemons],
    queryFn: () => fetchSelectedPokemons(pokemons),
  });
};

export {
  fetchPokemons,
  useGetPokemons,
  fetchSelectedPokemons,
  useGetSelectedPokemons,
};
