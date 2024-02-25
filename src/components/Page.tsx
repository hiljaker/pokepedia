"use client";

import React, { ComponentProps, FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { Box, SxProps } from "@mui/material";
import useNavbarHeight from "@src/hooks/useNavbarHeight";

interface PageProps extends PropsWithChildren, ComponentProps<typeof Box> {
  sx?: SxProps;
}

const Page: FC<PageProps> = ({ sx, children, ...props }) => {
  const navbarHeight = useNavbarHeight();

  return (
    <>
      <Navbar />
      <Box pt={navbarHeight} sx={sx} {...props}>
        {children}
      </Box>
    </>
  );
};

export default Page;
