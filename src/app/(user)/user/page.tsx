import { UserDashboard } from "@/components";
import getSession from "@/lib/getSession";
import { Role } from "@prisma/client";

const UserDashboardPage = async () => {
  const session = await getSession();

  // if user is not an user, show a message
  // this message not displayed because middleware handle this situation.
  // but we use this as our second layer of security.
  if (session?.user.role !== Role.USER) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">
          You are not authorized to view this page
        </h1>
      </div>
    );
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-between">
      <UserDashboard />
    </section>
  );
};

export default UserDashboardPage;
