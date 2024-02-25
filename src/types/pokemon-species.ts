interface Variety {
  is_default: boolean;
  pokemon: Model;
}

export interface PokemonSpecies {
  name: string;
  order: number;
  evolution_chain: Model;
  varieties: Variety[];
}
