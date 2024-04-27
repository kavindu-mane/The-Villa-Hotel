import { db } from "@/lib/db";

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const resetPasswordToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return resetPasswordToken;
  } catch (e) {
    return null;
  }
};

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return resetPasswordToken;
  } catch (e) {
    return null;
  }
};
