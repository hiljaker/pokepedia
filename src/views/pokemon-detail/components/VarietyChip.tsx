import { Box } from "@mui/material";
import { styled } from "@mui/material";
import { unslugString } from "@src/helpers/removeDash";
import React, { ComponentProps, Dispatch, FC, SetStateAction } from "react";

interface VarietyChipProps {
  variety: string;
  selectedVariety: string;
  setSelectedVariety: Dispatch<SetStateAction<string>>;
}

interface BoxComponentProps extends ComponentProps<typeof Box> {
  selected: boolean;
}

const BoxComponent: FC<BoxComponentProps> = ({ selected, ...props }) => (
  <Box {...props} />
);
const Chip = styled(BoxComponent)(({ selected, theme }) => ({
  ...theme.typography.kodeMonoMedium,
  backgroundColor: selected ? "#40A2E3" : theme.palette.neutral700.main,
  color: selected ? "white" : theme.palette.neutral300.main,
  border: `2px solid ${theme.palette.neutral500.main}`,
  padding: "4px 8px",
  borderRadius: "6px",
  cursor: "pointer",
}));

const VarietyChip: FC<VarietyChipProps> = ({
  variety,
  selectedVariety,
  setSelectedVariety,
}) => {
  return (
    <Chip
      selected={variety === selectedVariety}
      onClick={() => setSelectedVariety(variety)}
      sx={{ textAlign: { xs: "center", md: "left" } }}
    >
      {unslugString(variety)}
    </Chip>
  );
};

export default VarietyChip;
