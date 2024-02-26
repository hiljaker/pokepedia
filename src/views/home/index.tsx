"use client";

import { Box, Button, Grid, Pagination, Stack, TextField } from "@mui/material";
import { useGetPokemons } from "@src/api";
import Page from "@src/components/Page";
import React, { Children, useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import Wrapper from "@src/components/Wrapper";
import LoadingScreen from "@src/components/LoadingScreen";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import qs from "query-string";

const HomeView = () => {
  const url = typeof window !== "undefined" && window.location.href;
  const { query } = qs.parseUrl(url || "");

  const { push } = useRouter();
  const { get } = useSearchParams();
  const searchQuery = get("search");

  const { data, isLoading } = useGetPokemons();
  const initialPokemons = data?.results.filter((result) => result.is_default);
  const [pokemons, setPokemons] = useState(initialPokemons);

  const page = Number(get("page") || 1);
  const limit: number = 20;
  const count: number = Math.ceil((pokemons?.length || 0) / limit);

  const startIndex = limit * (page - 1);
  const endIndex = limit * page;

  const handleChangePage = (value: number) => {
    const searchQuery = query;
    searchQuery.page = String(value);
    push(`?${qs.stringify(searchQuery)}`);
  };

  const handleSearchInput = (value: string) => {
    const searchQuery = query;

    if (value) {
      searchQuery.search = value;
    } else {
      delete searchQuery.search;
    }

    delete searchQuery.page;
    push(`?${qs.stringify(searchQuery)}`);
  };

  const formik = useFormik({
    initialValues: { search: searchQuery || "" },
    onSubmit: (values) => {
      handleSearchInput(values.search);
    },
  });

  const { getFieldProps, handleSubmit } = formik;

  useEffect(() => {
    if (!isLoading) {
      if (searchQuery) {
        const filteredPokemons = initialPokemons?.filter((pokemon) =>
          pokemon.name.includes(searchQuery)
        );
        setPokemons(filteredPokemons);
      } else {
        setPokemons(initialPokemons);
      }
    }
  }, [searchQuery, isLoading]);

  return (
    <Page sx={{ bgcolor: "neutralBg.main" }}>
      <Wrapper sx={{ py: "24px", minHeight: "100vh" }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Box>
            <Stack mb={4} direction="row">
              <TextField {...getFieldProps("search")} />
              <Button onClick={() => handleSubmit()}>coba</Button>
            </Stack>

            <Grid container spacing={{ xs: 2, md: 3 }}>
              {Children.toArray(
                pokemons?.slice(startIndex, endIndex).map((pokemon) => {
                  return (
                    <Grid item xs={12} sm={4} lg={3}>
                      <PokemonCard pokemon={pokemon} />
                    </Grid>
                  );
                })
              )}
            </Grid>

            <Box width="fit-content" alignSelf="center" mt={4} mx="auto">
              <Pagination
                count={count}
                page={page}
                onChange={(_e, value: number) => handleChangePage(value)}
              />
            </Box>
          </Box>
        )}
      </Wrapper>
    </Page>
  );
};

export default HomeView;
