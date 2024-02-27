import EmptyScreen from "@src/components/EmptyScreen";
import Page from "@src/components/Page";
import Wrapper from "@src/components/Wrapper";
import React from "react";

const NotFound = () => {
  return (
    <Page bgcolor="neutralBg.main" minHeight="100vh">
      <Wrapper>
        <EmptyScreen />
      </Wrapper>
    </Page>
  );
};

export default NotFound;
