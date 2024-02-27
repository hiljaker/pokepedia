import { Pokemon } from "./pokemon";

export interface PokemonType {
  pokemon: {
    pokemon: Pokemon;
  }[];
  results: Pokemon[];
}
