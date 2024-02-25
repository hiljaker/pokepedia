interface Variety {
  is_default: boolean;
  pokemon: Model;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Model;
}

export interface PokemonSpecies {
  name: string;
  order: number;
  evolution_chain: Model;
  varieties: Variety[];
  flavor_text_entries: FlavorTextEntry[];
}
