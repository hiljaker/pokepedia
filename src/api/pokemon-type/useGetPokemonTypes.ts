import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

const queryKeyPokemonTypes = "pokemon-types";

const fetchPokemonTypes = async () => {
  const { data } = await axios.get<ApiReturnType<Model[]>>(`/type`);
  return data;
};

const useGetPokemonTypes = () => {
  return useQuery({
    queryKey: [queryKeyPokemonTypes],
    queryFn: fetchPokemonTypes,
  });
};

export { queryKeyPokemonTypes, fetchPokemonTypes, useGetPokemonTypes };
