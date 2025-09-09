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
            width: { md: "75%", lg: "60%" },
         }}
      >
         <CardContent>
            <Box>
               <Typography
                  variant="h4"
                  sx={{
                     fontWeight: "bold",
                  }}
               >
                  {title}
               </Typography>
               <Typography
                  variant="body2"
                  sx={{
                     color: grey[700],
                  }}
               >
                  {desciption}
               </Typography>
            </Box>
            <Box mt={5} />
            {children}
         </CardContent>
      </Card>
   );
};

export default AuthFormCard;
