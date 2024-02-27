import HomeView from "@src/views/home";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = { title: "PokePedia" };

const Home = () => {
  return (
    <Suspense>
      <HomeView />
    </Suspense>
  );
};

export default Home;
