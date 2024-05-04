import { Login } from "@/components";
import { Suspense } from "react";
import { AuthFooter, GoogleAuth } from "@/components";

const LoginPage = () => {
  return (
    <Suspense>
      <Login />
      <GoogleAuth />
      <AuthFooter />
    </Suspense>
  );
};

export default LoginPage;
