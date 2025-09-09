import { useTranslation } from "react-i18next";
import AuthFormCard from "../../../components/layout/auth/AuthFormCard";
import SigninForm from "./_forms/signinForm";

const Signin = () => {
   const { t } = useTranslation();

   return (
      <AuthFormCard title={t("signin.signInTitle")} desciption={t("signin.signInDescription")}>
         <SigninForm />
      </AuthFormCard>
   );
};

export default Signin;
