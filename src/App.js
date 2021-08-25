import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Home from "./container";
import theme from "./utils/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
