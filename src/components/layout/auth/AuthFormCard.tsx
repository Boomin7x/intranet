import { Box, Card, CardContent, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import type { FC, ReactNode } from "react";

interface IAuthFormCard {
   title: string;
   desciption: string;
   children: ReactNode;
}
const AuthFormCard: FC<IAuthFormCard> = ({ children, desciption, title }) => {
   return (
      <Card
         sx={{
            boxShadow: "none",
            width: { xs: "90%", sm: "80%", md: "75%", lg: "60%" },
            borderRadius: 2,
         }}
      >
         <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            <Box>
               <Typography
                  variant="h5"
                  sx={{
                     fontWeight: "bold",
                     mb: 1,
                  }}
               >
                  {title}
               </Typography>
               <Typography
                  variant="body2"
                  sx={{
                     color: grey[700],
                     fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
               >
                  {desciption}
               </Typography>
            </Box>
            <Box mt={{ xs: 3, sm: 4 }} />
            {children}
         </CardContent>
      </Card>
   );
};

export default AuthFormCard;
