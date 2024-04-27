import { Register } from "@/components";
import { Suspense } from "react";
import { AuthFooter, GoogleAuth } from "@/components";

const RegisterPage = () => {
  return (
    <Suspense>
      <Register />
      <GoogleAuth />
      <AuthFooter />
    </Suspense>
  );
};

export default RegisterPage;
