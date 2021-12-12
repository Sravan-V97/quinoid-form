import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const projectTheme = createTheme({
  palette: {
    primary: {
      light: "#5cb8e4",
      main: "#279ddf",
    },
    error: {
      light: "#fc5a5a",
      main: "#ff0000",
      dark: "#b03e3e",
    },
    warning: {
      light: "#ffab6e",
      main: "#ff974a",
      dark: "#b26933",
    },
  },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  light: responsiveFontSizes(projectTheme),
};
