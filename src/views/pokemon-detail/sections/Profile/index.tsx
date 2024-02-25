import React, { Children, ComponentProps, FC } from "react";
import { styled } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import { useGetPokemonSpecies } from "@src/api/pokemon-species/useGetPokemonSpecies";
import PokemonTypeChip from "@src/components/PokemonTypeChip";

interface ProfileProps extends ComponentProps<typeof Stack> {
  pokemon: Pokemon;
}

const Card = styled(Stack)(({ theme }) => ({
  border: `2px solid ${theme.palette.neutral500.main}`,
  borderRadius: "8px",
  padding: "8px",
  backgroundColor: theme.palette.neutral800.main,
  transition: "0.3s",

  "&:hover": {
    boxShadow: "10px 10px 0px 0px rgba(0,0,0,0.5)",
  },
}));

const Image = styled("img")(() => ({}));

const Profile: FC<ProfileProps> = ({ pokemon, ...props }) => {
  const { name, sprites, species, types, abilities } = pokemon || {};

  const { data } = useGetPokemonSpecies(species?.name || "");

  const pokemonDescription = data?.flavor_text_entries?.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text;

  const pokemonAbilities = abilities
    ?.map((ability) => ability.ability.name)
    .join(", ");

  return (
    <Stack {...props} direction="column" spacing={2}>
      <Image
        src={sprites?.other["official-artwork"].front_default}
        alt={name}
        sx={{
          width: "250px",
          height: "250px",
          alignSelf: "center",
        }}
      />

      <Stack
        spacing={3}
        flexGrow={1}
        bgcolor="neutral700.main"
        p="16px 24px"
        borderRadius="16px"
        boxShadow="10px 10px 0px 0px rgba(0,0,0,0.5)"
      >
        <Typography
          typography="kodeMono"
          fontSize={{ md: "18px" }}
          color="neutral100.main"
        >
          {pokemonDescription}
        </Typography>

        <Stack spacing={1}>
          <Typography
            typography="kodeMonoBold"
            fontSize={{ xs: "20px", md: "24px" }}
            color="neutral100.main"
          >
            Type
          </Typography>

          <Stack direction="row" spacing={1}>
            {Children.toArray(
              types?.map((type) => (
                <PokemonTypeChip type={type.type.name || ""} />
              ))
            )}
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography
            typography="kodeMonoBold"
            fontSize={{ xs: "20px", md: "24px" }}
            color="neutral100.main"
          >
            Ability
          </Typography>

          <Typography
            typography="kodeMono"
            fontSize={{ md: "18px" }}
            color="neutral100.main"
          >
            {pokemonAbilities}
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography
            typography="kodeMonoBold"
            fontSize={{ xs: "20px", md: "24px" }}
            color="neutral100.main"
          >
            Weight
          </Typography>

          <Typography
            typography="kodeMono"
            fontSize={{ md: "18px" }}
            color="neutral100.main"
          >
            {(pokemon.weight || 0) / 10} kg
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography
            typography="kodeMonoBold"
            fontSize="24px"
            color="neutral100.main"
          >
            Height
          </Typography>

          <Typography
            typography="kodeMono"
            fontSize={{ md: "18px" }}
            color="neutral100.main"
          >
            {(pokemon.height || 0) * 10} cm
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Profile;
