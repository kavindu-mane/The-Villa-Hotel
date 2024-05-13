import { db } from "@/lib/db";

// get reset password token by email
export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const resetPasswordToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return resetPasswordToken;
  } catch (e: any) {
    return e.message;
  }
};

// get reset password token by token
export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return resetPasswordToken;
  } catch (e: any) {
    return e.message;
  }
};
