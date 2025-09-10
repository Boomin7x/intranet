import { useTranslation } from "react-i18next";
import AuthFormCard from "../../../components/layout/auth/AuthFormCard";
import SigninForm from "./_forms/signinForm";

const Signin = () => {
   const { t } = useTranslation("signin");

   return (
      <AuthFormCard title={t("signInTitle")} desciption={t("signInDescription")}>
         <SigninForm />
      </AuthFormCard>
   );
};

export default Signin;
