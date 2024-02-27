import axios from "@src/utils/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "..";
import { Pokemon } from "@src/types/pokemon";
import { PokemonType } from "@src/types/pokemon-type";

const queryKeyPokemons = "pokemons";
const queryKeySelectedPokemons = "selected-pokemons";

const fetchPokemons = async (
  type?: string
): Promise<ApiReturnType<Pokemon[]> | PokemonType> => {
  if (type) {
    const { data } = await axios.get<PokemonType>(`/type/${type}`);

    const details = data.pokemon.map(async (poke) => {
      const detail = await fetchPokemon(poke.pokemon.name);
      return detail;
    });

    const pokemonDetails = await Promise.all(details);
    data.results = pokemonDetails;

    return data;
  }

  const { data } = await axios.get<ApiReturnType<Pokemon[]>>("/pokemon", {
    params: { limit: 10000 },
  });

  const details = data.results.map(async (pokemon) => {
    const detail = await fetchPokemon(pokemon.name);
    return detail;
  });

  const pokemonDetails = await Promise.all(details);
  data.results = pokemonDetails;

  return data;
};

const useGetPokemons = (type?: string) => {
  return useQuery({
    queryKey: [queryKeyPokemons, type],
    queryFn: () => fetchPokemons(type),
    placeholderData: keepPreviousData,
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
  queryKeyPokemons,
};
