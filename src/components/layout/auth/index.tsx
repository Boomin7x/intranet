import { alpha, Box, Grid, Typography } from "@mui/material";
import type { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { defaultImgs } from "../../../utils";
import { grey } from "@mui/material/colors";
import LanguageSwitcher from "../../languageSwithcer";
import { DashboardLogo } from "../sidebar";

const MainAuthLayout: FC = () => {
   return (
      <Grid container width="100vw" height="100vh">
         <Grid
            size={6}
            sx={{
               //    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
               position: "relative",
               overflow: "hidden",
            }}
         >
            <Box
               component="img"
               src={defaultImgs.bgAuth}
               alt="auth-bg"
               sx={{
                  position: "absolute",
                  inset: 0,
                  objectFit: "cover",
                  objectPosition: "center",
               }}
            />
            <Box
               sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(0deg, ${alpha("#000", 0.8)} 8%,transparent 100%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "end",
                  fontSize: "3rem",
                  padding: "4rem",
                  color: (theme) => theme.palette.secondary.contrastText,
               }}
            >
               <Typography variant="h2">Intranet</Typography>
               <Typography
                  variant="body1"
                  sx={{
                     textAlign: "center",
                     color: grey[400],
                  }}
               >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, natus similique
                  rem pariatur iusto totam tenetur exercitationem veniam corporis suscipit molestias
                  id. Quasi doloremque veritatis voluptates ipsa quo sed molestias?
               </Typography>
            </Box>
         </Grid>
         <Grid size={6}>
            <Box
               sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
               }}
            >
               <Box
                  sx={{
                     p: 2,
                     display: "flex",
                     justifyContent: "space-between",
                  }}
               >
                  <DashboardLogo />
                  <LanguageSwitcher />
               </Box>
               <Box
                  sx={{
                     flex: 1,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  <Outlet />
               </Box>
               <Box
                  sx={{
                     p: 2,
                     textAlign: "center",
                     color: "text.secondary",
                     fontSize: "0.9rem",
                  }}
                  component="footer"
               >
                  © Copyright {new Date().getFullYear()} Powered by{" "}
                  <Typography
                     component={Link}
                     to="#"
                     sx={{
                        color: (theme) => theme.palette.primary.main,
                     }}
                  >
                     Univsoft
                  </Typography>
               </Box>
            </Box>
         </Grid>
      </Grid>
   );
};

export default MainAuthLayout;
