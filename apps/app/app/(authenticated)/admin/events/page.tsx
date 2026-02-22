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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Events</h1>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
            Create New Event
          </button>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{event.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{event.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    <button className="text-primary hover:underline mr-4">Edit</button>
                    <button className="text-destructive hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-muted-foreground">
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
