export interface Stat {
  base_stat: number;
  effort: number;
  stat: Model;
}

interface SpriteType {
  front_default: string;
}

interface Sprite {
  other: {
    "official-artwork": SpriteType;
    dream_world: SpriteType;
  };
}

interface Type {
  slot: number;
  type: Model;
}

interface Ability {
  ability: Model;
}

export interface Pokemon {
  id: number;
  is_default: boolean;
  abilities: Ability[];
  name: string;
  order: number;
  stats: Stat[];
  species: Model;
  sprites: Sprite;
  types: Type[];
  weight: number;
  height: number;
}
