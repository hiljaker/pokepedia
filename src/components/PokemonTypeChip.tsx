import { Box, Typography, styled } from "@mui/material";
import { TYPE_COLOR } from "@src/static/type-color";
import React, { FC } from "react";

interface PokemonTypeChip {
  type: string;
}

const Chip = styled(Box)(({ theme }) => ({
  borderRadius: "4px",
}));

const Type = styled(Typography)(({ theme }) => ({
  ...theme.typography.kodeMono,
  color: theme.palette.neutralBg.main,
  fontSize: "12px",
}));

const PokemonTypeChip: FC<PokemonTypeChip> = ({ type }) => {
  return (
    <Chip bgcolor={TYPE_COLOR[type]} py={0.5} px={1}>
      <Type>{type}</Type>
    </Chip>
  );
};

export default PokemonTypeChip;
