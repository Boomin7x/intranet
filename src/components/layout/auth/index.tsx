import { alpha, Box, Typography } from "@mui/material";
import type { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { defaultImgs } from "../../../utils";
import { grey } from "@mui/material/colors";
import LanguageSwitcher from "../../languageSwithcer";
import { DashboardLogo } from "../sidebar";

const MainAuthLayout: FC = () => {
   return (
      <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
         <Box
            sx={{
               flex: 1,
               position: "relative",
               overflow: "hidden",
               display: { xs: "none", md: "block" },
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
                  padding: { xs: "2rem", md: "4rem" },
                  color: (theme) => theme.palette.secondary.contrastText,
               }}
            >
               <Typography variant="h4" sx={{ fontSize: { xs: "2.5rem", md: "3rem" } }}>
                  Intranet
               </Typography>
               <Typography
                  variant="body2"
                  sx={{
                     textAlign: "center",
                     color: grey[400],
                     fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
               >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, natus similique
                  rem pariatur iusto totam tenetur exercitationem veniam corporis suscipit molestias
                  id. Quasi doloremque veritatis voluptates ipsa quo sed molestias?
               </Typography>
            </Box>
         </Box>
         <Box
            sx={{
               flex: { xs: 1, md: 1 },
               width: { xs: "100%", md: "auto" },
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
                  alignItems: "center",
               }}
            >
               <DashboardLogo showSidebarBtn={false} />
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
      </Box>
   );
};

export default MainAuthLayout;
