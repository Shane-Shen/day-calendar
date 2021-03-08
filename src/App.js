import React from "react";
import Styled from "styled-components";

import { Calendar } from "./pages";

const AppWrapper = Styled.div`
  margin-bottom:20px;
  text-align: left;
  display: flex;
  justify-content: center;
`;

const App = () => {
  return (
    <AppWrapper>
      <Calendar />
    </AppWrapper>
  );
};

export default App;
