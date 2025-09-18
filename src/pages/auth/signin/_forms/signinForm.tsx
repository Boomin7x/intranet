import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yup, yupResolver, type InferFormValues } from "../../../../utils/validation";
import { toast } from "../../../../utils";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object({
   email: yup.string().email().required(),
});

type FormValues = InferFormValues<typeof schema>;

const SigninForm = () => {
   const { lang = "fr" } = useParams();
   const navigate = useNavigate();
   const { t } = useTranslation("signin");

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<FormValues>({
      resolver: yupResolver(schema),
      mode: "onTouched",
      defaultValues: { email: "" },
   });

   const onSubmit = async () => {
      // TODO: implement sign-in API call
      // Simulate request
      await new Promise(() =>
         setTimeout(() => {
            toast.success("Sign in successfully");
            navigate({
               pathname: `/${lang}/auth/otp`,
            });
         }, 500),
      );
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
         <Box
            sx={{
               paddingY: 1,

               width: "100%",
            }}
         >
            <TextField
               type="email"
               placeholder="example@email.com"
               label={t("emailLabel")}
               sx={{
                  width: "100%",
               }}
               error={!!errors.email}
               helperText={errors.email?.message as string | undefined}
               {...register("email")}
            />
         </Box>
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
            }}
         >
            <Button
               type="submit"
               variant="contained"
               disabled={isSubmitting}
               loading={isSubmitting}
               sx={{
                  width: "100%",
                  padding: 1.5,
                  mt: 2,
               }}
            >
               {t("signInButton")}
            </Button>
            <Box
               sx={{
                  marginY: 1.3,
               }}
            >
               {t("forgotPassword")}{" "}
               <Typography
                  component="a"
                  href="/auth/forgot-password"
                  sx={{
                     color: (theme) => theme.palette.primary.main,
                  }}
               >
                  {t("recoverLink")}
               </Typography>
            </Box>
         </Box>
      </form>
   );
};

export default SigninForm;
