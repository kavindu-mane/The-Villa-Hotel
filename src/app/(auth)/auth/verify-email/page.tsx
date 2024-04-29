import { NewVerificationEmailForm } from "@/components";
import { Suspense } from "react";

const VerifyEmail = () => {
  return (
    <Suspense>
      <NewVerificationEmailForm />
    </Suspense>
  );
};

export default VerifyEmail;
