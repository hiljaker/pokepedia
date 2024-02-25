import { CircularProgress, Stack } from "@mui/material";
import useNavbarHeight from "@src/hooks/useNavbarHeight";
import React from "react";

const LoadingScreen = () => {
  const navbarHeight = useNavbarHeight();

  return (
    <Stack height="300px" justifyContent="center">
      <CircularProgress
        size={90}
        sx={{ mx: "auto", color: "primaryGreen.main" }}
      />
    </Stack>
  );
};

export default LoadingScreen;
