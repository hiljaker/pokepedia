import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useNavbarHeight from "@src/hooks/useNavbarHeight";
import Wrapper from "./Wrapper";
import Link from "next/link";

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.kodeMonoMedium,
  fontSize: "24px",
  color: theme.palette.neutralBg.main,
}));

const Navbar = () => {
  const navbarHeight = useNavbarHeight();

  return (
    <Box bgcolor="primaryGreen.main" position="fixed" width="100%" zIndex={99}>
      <Wrapper
        sx={{
          display: "flex",
          alignItems: "center",
          height: navbarHeight,
        }}
      >
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Title>PokePedia</Title>
          </Link>
        </Stack>
      </Wrapper>
    </Box>
  );
};

export default Navbar;
