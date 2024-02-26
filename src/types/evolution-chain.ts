interface EvolvesTo {
  evolves_to: EvolvesTo[];
  species: {
    name: string;
    url: string;
  };
}

interface EvolutionChain {
  chain: EvolvesTo;
  id: number;
}
