import { Container, SxProps } from "@mui/material";
import React, { FC, PropsWithChildren } from "react";

interface WrapperProps extends PropsWithChildren {
  sx?: SxProps;
}

const Wrapper: FC<WrapperProps> = ({ sx, children }) => {
  return (
    <Container disableGutters sx={{ px: { xs: "24px", md: "64px" }, ...sx }}>
      {children}
    </Container>
  );
};

export default Wrapper;
