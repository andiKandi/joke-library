import React from "react";
import { GlobalStyle } from "./components/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { DashboardPage } from "./Dashboard/DashboardPage";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <DashboardPage />
    </ThemeProvider>
  );
};
