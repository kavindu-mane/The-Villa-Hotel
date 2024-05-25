import { AdminTableReservations } from "@/components";
import getSession from "@/lib/getSession";
import { Role } from "@prisma/client";

const AdminTableReservationsPage = async () => {
  const session = await getSession();

  // if user is not an admin, show a message
  // this message not displayed because middleware handle this situation.
  // but we use this as our second layer of security.
  if (session?.user.role !== Role.ADMIN) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">
          You are not authorized to view this page
        </h1>
      </div>
    );
  }

  return (
    <section className="">
      <AdminTableReservations />
    </section>
  );
};

export default AdminTableReservationsPage;