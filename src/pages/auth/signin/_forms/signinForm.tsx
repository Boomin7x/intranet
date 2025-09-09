import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const SigninForm = () => {
   const { t } = useTranslation();

   return (
      <>
         <Box
            sx={{
               paddingY: 1,

               width: "100%",
            }}
         >
            <TextField
               type="Email"
               placeholder="example@email.com"
               label={t("signin.emailLabel")}
               sx={{
                  width: "100%",
               }}
            />
         </Box>
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
            }}
         >
            <Button
               variant="contained"
               sx={{
                  width: "100%",
                  padding: 1.5,
                  mt: 2,
               }}
            >
               {t("signin.signInButton")}
            </Button>
            <Box
               sx={{
                  marginY: 1.3,
               }}
            >
               {t("signin.forgotPassword")}{" "}
               <Typography
                  component="a"
                  href="/auth/forgot-password"
                  sx={{
                     color: (theme) => theme.palette.primary.main,
                  }}
               >
                  {t("signin.recoverLink")}
               </Typography>
            </Box>
         </Box>
      </>
   );
};

export default SigninForm;
