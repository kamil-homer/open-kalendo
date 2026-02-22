import { auth } from "@repo/auth/server";
import { database } from "@repo/database";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Header } from "../../components/header";
import { CreateEventDialog } from "./_components/create-event-dialog";
import { EditEventDialog } from "./_components/edit-event-dialog";
import { DeleteEventDialog } from "./_components/delete-event-dialog";

const AdminEventsPage = async () => {
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
          <CreateEventDialog />
        </div>

        <div className="overflow-hidden rounded-md border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">
                    {event.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {format(new Date(event.date), "PPP p")}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {event.location || "-"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {event.published ? (
                      <Badge variant="default">Published</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-muted-foreground text-sm flex justify-end gap-3">
                    <EditEventDialog event={event} />
                    <DeleteEventDialog eventId={event.id} eventTitle={event.title} />
                  </td>
                </tr>
              ))}

              {events.length === 0 && (
                <tr>
                  <td
                    className="px-6 py-10 text-center text-muted-foreground"
                    colSpan={5}
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
