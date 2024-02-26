import { Box, Stack, Typography } from "@mui/material";
import { unslugString } from "@src/helpers/removeDash";
import { Stat } from "@src/types/pokemon";
import React, { Children, FC } from "react";

interface StatProps {
  stats: Stat[];
}

const Stat: FC<StatProps> = ({ stats }) => {
  return (
    <Box
      bgcolor="neutral700.main"
      p="16px 24px"
      borderRadius="16px"
      boxShadow="10px 10px 0px 0px rgba(0,0,0,0.5)"
    >
      <Typography
        typography="kodeMonoBold"
        fontSize={{ xs: "20px", md: "24px" }}
        color="neutral100.main"
        mb={2}
      >
        Stats
      </Typography>

      <Stack spacing={2}>
        {Children.toArray(
          stats.map((stat) => (
            <Stack spacing={1}>
              <Typography typography="kodeMono">
                {unslugString(stat.stat.name || "")} : {stat.base_stat}
              </Typography>

              <Box
                width="100%"
                bgcolor="neutral500.main"
                borderRadius="4px"
                overflow="hidden"
              >
                <Box
                  height="16px"
                  width={`${(stat.base_stat / 255) * 100}%`}
                  bgcolor="#40A2E3"
                ></Box>
              </Box>
            </Stack>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default Stat;
