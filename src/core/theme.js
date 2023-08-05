import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    common: {
      green: '#025206',
      grey: '#9e9e9e',
      white: '#fff',
      black: '#000',
    }
  },
});

export default theme;
