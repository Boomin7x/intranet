import { type FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthFormCard from "../../../components/layout/auth/AuthFormCard";
import OtpForm from "./_forms/otpForm";
import { toast } from "../../../utils/toast";

const Otp: FC = () => {
   const { t } = useTranslation("otp");
   const { lang } = useParams();
   const navigate = useNavigate();
   const [isVerifying, setIsVerifying] = useState(false);
   const [isResending, setIsResending] = useState(false);
   const [resendCountdown, setResendCountdown] = useState(60);

   useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      if (resendCountdown > 0 && !isResending) {
         timer = setTimeout(() => {
            setResendCountdown((prev) => prev - 1);
         }, 1000);
      }
      return () => clearTimeout(timer);
   }, [resendCountdown, isResending]);

   const handleVerifyOtp = (otp: string) => {
      setIsVerifying(true);
      // Simulate API call
      setTimeout(() => {
         if (otp === "123456") {
            // Hardcoded for demonstrations
            toast.success(t("success") || "OTP verified successfully! Redirecting...");
            navigate(`/${lang}/`); // Redirect to dashboard or appropriate page
         } else {
            toast.error(t("error") || "Invalid OTP. Please try again.");
         }
         setIsVerifying(false);
      }, 2000);
   };

   const handleResendOtp = () => {
      setIsResending(true);
      setResendCountdown(60);
      // Simulate API call
      setTimeout(() => {
         toast.info(t("resendLink") || "Resend Code");
         setIsResending(false);
      }, 1500);
   };

   return (
      <AuthFormCard
         title={t("title") || "OTP Verification"}
         desciption={t("subtitle") || "Please enter the 6-digit code sent to your email address."}
      >
         <OtpForm
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
            isVerifying={isVerifying}
            isResending={isResending}
            resendCountdown={resendCountdown}
         />
      </AuthFormCard>
   );
};

export default Otp;
