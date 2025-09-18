import { createTheme } from "@mui/material";

const theme = createTheme({
   typography: {
      fontFamily: "Outfit",
   },
   palette: {
      primary: {
         light: "#3a5bb5",
         main: "#2a468c",
         dark: "#1a2d54",
         contrastText: "#fff",
      },
      secondary: {
         light: "#ff9d3c", // lighter shade of #e87204
         main: "#e87204", // as requested
         dark: "#a34e00", // darker shade of #e87204
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
