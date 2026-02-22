import { auth } from "@repo/auth/server";
import { database } from "@repo/database";
import { notFound } from "next/navigation";
import { Header } from "../../components/header";

const AdminEventsPage = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    notFound();
  }

  const events = await database.event.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return (
    <>
      <Header page="Events Management" pages={["Admin", "Events"]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">Manage Events</h1>
          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Create New Event
          </button>
        </div>

        <div className="overflow-hidden rounded-md border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {event.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">
                    {event.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-muted-foreground text-sm">
                    <button className="mr-4 text-primary hover:underline">
                      Edit
                    </button>
                    <button className="text-destructive hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td
                    className="px-6 py-10 text-center text-muted-foreground"
                    colSpan={3}
                  >
                    No events managed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminEventsPage;
