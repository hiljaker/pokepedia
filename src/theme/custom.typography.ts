import { TypographyOptions } from "@mui/material/styles/createTypography";
import { CSSProperties } from "react";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    kodeMono: true;
    kodeMonoMedium: true;
    kodeMonoBold: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    kodeMono: CSSProperties;
    kodeMonoMedium: CSSProperties;
    kodeMonoBold: CSSProperties;
  }

  interface TypographyVariantsOptions {
    kodeMono: CSSProperties;
    kodeMonoMedium: CSSProperties;
    kodeMonoBold: CSSProperties;
  }
}

export const customTypography: TypographyOptions = {
  kodeMono: {
    fontFamily: "Kode Mono, monospace",
  },
  kodeMonoMedium: {
    fontFamily: "Kode Mono, monospace",
    fontWeight: 500,
  },
  kodeMonoBold: {
    fontFamily: "Kode Mono, monospace",
    fontWeight: 700,
  },
};
