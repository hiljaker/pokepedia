import { Box, Typography, styled } from "@mui/material";
import { TYPE_COLOR } from "@src/static/type-color";
import React, { ComponentProps, FC } from "react";

interface PokemonTypeChip extends ComponentProps<typeof Typography> {
  type: string;
}

const Chip = styled(Box)(({ theme }) => ({
  borderRadius: "4px",
}));

const Type = styled(Typography)(({ theme }) => ({
  ...theme.typography.kodeMono,
  color: theme.palette.neutralBg.main,
}));

const PokemonTypeChip: FC<PokemonTypeChip> = ({ type, ...props }) => {
  return (
    <Chip bgcolor={TYPE_COLOR[type]} py={0.5} px={1}>
      <Type {...props}>{type}</Type>
    </Chip>
  );
};

export default PokemonTypeChip;
