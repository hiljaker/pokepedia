"use client";

import { Box, Stack, Typography, styled } from "@mui/material";
import PokemonTypeChip from "@src/components/PokemonTypeChip";
import { capitalizeEveryWord } from "@src/helpers/capitalizeWord";
import Image from "next/image";
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

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Card direction={{ xs: "column", md: "row" }} spacing={2}>
      <Box
        position="relative"
        minWidth={{ xs: "100px", md: "150px" }}
        height={{ xs: "100px", md: "150px" }}
        mx={{ xs: "auto", md: "unset" }}
        bgcolor="neutral600.main"
        borderRadius="4px"
      >
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          layout="fill"
        />
      </Box>

      <Box>
        <Number>#{pokemon.order}</Number>

        <Name mb={0.5}>{capitalizeEveryWord(pokemon.name || "")}</Name>

        <Stack spacing={1} alignItems="start">
          {Children.toArray(
            pokemon.types.map((type) => (
              <PokemonTypeChip type={type.type.name || ""} />
            ))
          )}
        </Stack>
      </Box>
    </Card>
  );
};

export default PokemonCard;
