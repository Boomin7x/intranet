import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Outfit",
  },
  palette: {
    primary: {
      light: "#f8ebe6",
      //   lightHover:"#f5e1da",
      main: "#bc3808",
      dark: "#8d2a06",
      contrastText: "#fff",
    },
    secondary: {
      light: "#efe8e6",
      main: "#621707",
      dark: "#4a1105",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      //   styleOverrides: {
      //     root: {
      //       borderRadius: "10px",
      //     },
      //   },
    },
  },
});

export default theme;
