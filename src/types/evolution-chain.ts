interface EvolvesTo {
  evolves_to: EvolvesTo[];
  species: {
    name: string;
    url: string;
  };
}

export interface EvolutionChain {
  chain: EvolvesTo;
  id: number;
}
