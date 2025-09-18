import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface OtpFormInputs {
   otp: string;
}

const otpSchema = yup.object().shape({
   otp: yup
      .string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
});

interface OtpFormProps {
   onVerify: (otp: string) => void;
   onResend: () => void;
   isVerifying: boolean;
   isResending: boolean;
   resendCountdown: number;
}

const OtpForm: FC<OtpFormProps> = ({
   onVerify,
   onResend,
   isVerifying,
   isResending,
   resendCountdown,
}) => {
   const { t } = useTranslation("otp");
   const theme = useTheme();
   const { control, handleSubmit, formState } = useForm<OtpFormInputs>({
      resolver: yupResolver(otpSchema),
   });
   const { errors } = formState;

   const onSubmit = (data: OtpFormInputs) => {
      onVerify(data.otp);
   };

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
         <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label={t("otpPlaceholder") || "Enter OTP"}
            autoComplete="one-time-code"
            autoFocus
            inputProps={{ maxLength: 6 }}
            error={!!errors.otp}
            helperText={errors.otp?.message}
            {...control.register("otp")}
         />
         <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
               mt: 3,
               mb: 2,
               py: 1.5,
               borderRadius: 2,
               fontWeight: 600,
               fontSize: "1.1rem",
               boxShadow: theme.shadows[3],
               "&:hover": { boxShadow: theme.shadows[6] },
            }}
            disabled={isVerifying}
         >
            {isVerifying ? "Verifying..." : t("verifyButton") || "Verify"}
         </Button>

         <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}
         >
            <Typography variant="body2" color="text.secondary">
               {t("resendCode") || "Didn't receive the code?"}
            </Typography>
            <Button
               onClick={onResend}
               disabled={isResending || resendCountdown > 0}
               sx={{ textTransform: "none", fontWeight: 600, px: 0, py: 0 }}
            >
               {isResending
                  ? "Sending..."
                  : resendCountdown > 0
                    ? t("countdown", { seconds: resendCountdown }) ||
                      `Resend code in ${resendCountdown}s`
                    : t("resendLink") || "Resend Code"}
            </Button>
         </Box>
      </Box>
   );
};

export default OtpForm;
