import { Theme, useMediaQuery } from "@mui/material";

const useNavbarHeight = () => {
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  return mobile ? "72px" : "64px";
};

export default useNavbarHeight;
