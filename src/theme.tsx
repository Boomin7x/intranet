import { createTheme } from "@mui/material";

const theme = createTheme({
   typography: {
      fontFamily: "Outfit",
   },
   palette: {
      primary: {
         light: "#90caf9",
         main: "#1976d2",
         dark: "#0d47a1",
         contrastText: "#fff",
      },
      secondary: {
         light: "#c8e6c9",
         main: "#4caf50",
         dark: "#388e3c",
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
