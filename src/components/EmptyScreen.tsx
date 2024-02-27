import { Stack, Typography } from "@mui/material";
import React from "react";

const EmptyScreen = () => {
  return (
    <Stack height="200px" justifyContent="center">
      <Typography
        typography="kodeMonoMedium"
        textAlign="center"
        fontSize="32px"
        color="neutral100.main"
      >
        No pokemon found :(
      </Typography>
    </Stack>
  );
};

export default EmptyScreen;
