import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { Box, Stack, Typography, useMediaQuery, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetEvolutionChain, useGetSelectedPokemons } from "@src/api";
import { capitalizeEveryWord } from "@src/helpers/capitalizeWord";
import React, { Children, ComponentProps, FC, useMemo } from "react";

interface EvolutionProps extends ComponentProps<typeof Box> {
  evolutionChain: EvolutionChain;
}

const Image = styled("img")(() => ({}));

const Evolution: FC<EvolutionProps> = ({ evolutionChain, ...props }) => {
  const evolutionChains = useMemo<string[]>(() => {
    const names: string[] = [];

    if (evolutionChain?.chain.species) {
      names.push(evolutionChain.chain.species.name);

      if (
        evolutionChain.chain.evolves_to &&
        evolutionChain.chain.evolves_to.length > 0
      ) {
        for (const evolution of evolutionChain.chain.evolves_to) {
          names.push(evolution.species.name);

          if (evolution.evolves_to && evolution.evolves_to.length > 0) {
            for (const finalEvolution of evolution.evolves_to) {
              names.push(finalEvolution.species.name);
            }
          }
        }
      }
    }

    return names;
  }, [evolutionChain?.chain.evolves_to, evolutionChain?.chain.species]);

  const { data: pokemonEvolutions } = useGetSelectedPokemons(evolutionChains);

  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Box {...props}>
      <Typography
        typography="kodeMonoBold"
        fontSize="28px"
        color="neutral100.main"
        mb={5}
        textAlign="center"
      >
        Evolution
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        spacing={3}
      >
        {Children.toArray(
          pokemonEvolutions?.map((evolution, index) => {
            return (
              <>
                <Stack spacing={2}>
                  <Typography
                    typography="kodeMonoMedium"
                    textAlign="center"
                    fontSize="20px"
                  >
                    {capitalizeEveryWord(evolution?.name || "")}{" "}
                    <Typography
                      component="span"
                      typography="kodeMonoMedium"
                      color="neutral400.main"
                      fontSize="20px"
                    >
                      #{evolution?.order}
                    </Typography>
                  </Typography>

                  <Image
                    sx={{
                      width: { xs: "150px", md: "250px" },
                      height: { xs: "150px", md: "250px" },
                    }}
                    src={
                      evolution?.sprites.other["official-artwork"].front_default
                    }
                    alt={evolution?.name}
                  />
                </Stack>

                {index < pokemonEvolutions.length - 1 &&
                  (mobile ? (
                    <ExpandMore
                      sx={{ fontSize: "50px", color: "neutral300.main" }}
                    />
                  ) : (
                    <ChevronRight
                      sx={{ fontSize: "70px", color: "neutral300.main" }}
                    />
                  ))}
              </>
            );
          })
        )}
      </Stack>
    </Box>
  );
};

export default Evolution;
