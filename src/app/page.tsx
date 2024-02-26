import { fetchPokemons, queryKeyPokemons } from "@src/api";
import HomeView from "@src/views/home";
import { QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = { title: "PokePedia" };

const Home = () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: [queryKeyPokemons],
    queryFn: fetchPokemons,
  });

  return (
    <Suspense>
      <HomeView />
    </Suspense>
  );
};

export default Home;
