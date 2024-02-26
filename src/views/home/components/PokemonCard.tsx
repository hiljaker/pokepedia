"use client";

import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material";
import PokemonTypeChip from "@src/components/PokemonTypeChip";
import { capitalizeEveryWord } from "@src/helpers/capitalizeWord";
import { Pokemon } from "@src/types/pokemon";
import React, { Children, FC } from "react";

interface PokemonCardProps {
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

const Number = styled(Typography)(({ theme }) => ({
  ...theme.typography.kodeMonoBold,
  color: theme.palette.neutral400.main,
}));

const Name = styled(Typography)(({ theme }) => ({
  ...theme.typography.kodeMonoBold,
  color: theme.palette.neutral300.main,
}));

const Image = styled("img")(() => ({}));

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Card direction={{ xs: "row", md: "row" }} spacing={2}>
      <Image
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        sx={{
          width: { xs: "100px", md: "150px" },
          height: { xs: "100px", md: "150px" },
          bgcolor: "neutral600.main",
          borderRadius: "4px",
        }}
      />

      <Box>
        <Number>#{pokemon.order}</Number>

        <Name mb={0.5}>{capitalizeEveryWord(pokemon.name || "")}</Name>

        <Stack
          spacing={1}
          direction={{ xs: "row", md: "column" }}
          alignItems="start"
        >
          {Children.toArray(
            pokemon.types.map((type) => (
              <PokemonTypeChip type={type.type.name || ""} fontSize="12px" />
            ))
          )}
        </Stack>
      </Box>
    </Card>
  );
};

export default PokemonCard;
