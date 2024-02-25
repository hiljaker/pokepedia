"use client";

import React, { FC, PropsWithChildren } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { customPalette } from "./custom.palette";
import { customBreakpoints } from "./custom.breakpoints";
import { customTypography } from "./custom.typography";

const theme = createTheme({
  palette: customPalette,
  breakpoints: customBreakpoints,
  typography: customTypography,
});

const MuiThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
