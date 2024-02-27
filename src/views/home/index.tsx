"use client";

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material";
import { useGetPokemonTypes, useGetPokemons } from "@src/api";
import Page from "@src/components/Page";
import React, { Children, useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import Wrapper from "@src/components/Wrapper";
import LoadingScreen from "@src/components/LoadingScreen";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import qs from "query-string";
import { Search } from "@mui/icons-material";
import EmptyScreen from "@src/components/EmptyScreen";

const TextInput = styled(TextField)(({ theme }) => ({
  input: {
    fontFamily: "Kode Mono, monospace",
    fontSize: "16px",
  },

  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primaryGreen.main,
    },
  },
}));

const HomeView = () => {
  const url = typeof window !== "undefined" && window.location.href;
  const { query } = qs.parseUrl(url || "");

  const { push } = useRouter();
  const { get } = useSearchParams();
  const searchQuery = get("search");
  const typeQuery = get("type");

  const { data: typesData } = useGetPokemonTypes();
  const { data, isLoading, isFetching } = useGetPokemons(typeQuery as string);

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

  const handleFilterInput = (value: string) => {
    const searchQuery = query;

    if (value !== "all" && value) {
      searchQuery.type = value;
    } else {
      delete searchQuery.type;
    }

    push(`?${qs.stringify(searchQuery)}`);
  };

  const formik = useFormik({
    initialValues: { search: searchQuery || "", type: typeQuery || "" },
    onSubmit: (values) => {
      handleSearchInput(values.search);
      handleFilterInput(values.type);
    },
  });

  const { getFieldProps, handleSubmit, setFieldValue, values } = formik;

  const pokemonTypes = typesData?.results.map((result) => result.name);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, isLoading, initialPokemons?.length]);

  return (
    <Page sx={{ bgcolor: "neutralBg.main" }}>
      <Wrapper sx={{ py: "24px", minHeight: "100vh" }}>
        <Stack mb={4} direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextInput
            {...getFieldProps("search")}
            size="small"
            placeholder="Search by pokemon name..."
            sx={{ width: { xs: "100%", md: "300px" } }}
          />

          <Autocomplete
            options={["all", ...(pokemonTypes || [])]}
            value={values.type}
            renderInput={(params) => (
              <TextInput
                {...params}
                size="small"
                placeholder="Filter by pokemon type"
                sx={{ width: { xs: "100%", md: "300px" } }}
              />
            )}
            renderOption={(renderProps, option) => {
              return (
                <MenuItem
                  {...renderProps}
                  key={option}
                  sx={{ fontFamily: "Kode Mono, monospace" }}
                >
                  {option}
                </MenuItem>
              );
            }}
            onChange={(_e, value) => setFieldValue("type", value)}
          />

          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            sx={{
              backgroundColor: "primaryGreen.main",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "primaryGreen.main",
                boxShadow: "5px 5px 0px 0px rgba(0,0,0,0.5)",
              },
            }}
          >
            <Search />
          </Button>
        </Stack>

        {isLoading || isFetching ? (
          <LoadingScreen />
        ) : pokemons?.length ? (
          <>
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
                size="small"
                sx={{
                  button: {
                    fontFamily: "Kode Mono, monospace",
                    fontWeight: 700,
                    color: "neutral100.main",
                  },
                }}
              />
            </Box>
          </>
        ) : (
          <EmptyScreen />
        )}
      </Wrapper>
    </Page>
  );
};

export default HomeView;
