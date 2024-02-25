import { createTheme, PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    primaryGreen: Palette["primary"];
    neutralBg: Palette["primary"];
    neutral100: Palette["primary"];
    neutral200: Palette["primary"];
    neutral300: Palette["primary"];
    neutral400: Palette["primary"];
    neutral500: Palette["primary"];
    neutral600: Palette["primary"];
    neutral700: Palette["primary"];
    neutral800: Palette["primary"];
    neutral900: Palette["primary"];
  }

  interface PaletteOptions {
    primaryGreen: PaletteOptions["primary"];
    neutralBg: PaletteOptions["primary"];
    neutral100: PaletteOptions["primary"];
    neutral200: PaletteOptions["primary"];
    neutral300: PaletteOptions["primary"];
    neutral400: PaletteOptions["primary"];
    neutral500: PaletteOptions["primary"];
    neutral600: PaletteOptions["primary"];
    neutral700: PaletteOptions["primary"];
    neutral800: PaletteOptions["primary"];
    neutral900: PaletteOptions["primary"];
  }
}

// for accessing getContrastText
const theme = createTheme();

export const colors = {
  primaryGreen: "#658864",
  neutralBg: "#FFFFF0",
  neutral100: "#171717",
  neutral200: "#262626",
  neutral300: "#434343",
  neutral400: "#8C8C8C",
  neutral500: "#BFBFBF",
  neutral600: "#D9D9D9",
  neutral700: "#F0F0F0",
  neutral800: "#FAFAFA",
  neutral900: "#FFFFFF",
};

export const customPalette: PaletteOptions = {
  // GENERAL //
  primaryGreen: {
    main: colors.primaryGreen,
    contrastText: theme.palette.getContrastText(colors.primaryGreen),
  },
  neutralBg: {
    main: colors.neutralBg,
    contrastText: theme.palette.getContrastText(colors.neutralBg),
  },
  neutral100: {
    main: colors.neutral100,
    contrastText: theme.palette.getContrastText(colors.neutral100),
  },
  neutral200: {
    main: colors.neutral200,
    contrastText: theme.palette.getContrastText(colors.neutral200),
  },
  neutral300: {
    main: colors.neutral300,
    contrastText: theme.palette.getContrastText(colors.neutral300),
  },
  neutral400: {
    main: colors.neutral400,
    contrastText: theme.palette.getContrastText(colors.neutral400),
  },
  neutral500: {
    main: colors.neutral500,
    contrastText: theme.palette.getContrastText(colors.neutral500),
  },
  neutral600: {
    main: colors.neutral600,
    contrastText: theme.palette.getContrastText(colors.neutral600),
  },
  neutral700: {
    main: colors.neutral700,
    contrastText: theme.palette.getContrastText(colors.neutral700),
  },
  neutral800: {
    main: colors.neutral800,
    contrastText: theme.palette.getContrastText(colors.neutral800),
  },
  neutral900: {
    main: colors.neutral900,
    contrastText: theme.palette.getContrastText(colors.neutral900),
  },
};
