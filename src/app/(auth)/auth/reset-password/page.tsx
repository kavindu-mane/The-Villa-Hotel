import { NewPasswordForm } from "@/components";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
