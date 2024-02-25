interface Stat {
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

interface Pokemon {
  name: string;
  order: number;
  stats: Stat[];
  sprites: Sprite;
  types: Type[];
}
