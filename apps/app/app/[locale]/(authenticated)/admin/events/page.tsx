import { database } from "@repo/database";
import { Badge } from "@repo/design-system/components/ui/badge";
import { getDictionary } from "@repo/internationalization";
import { format } from "date-fns";
import { enUS, pl } from "date-fns/locale";
import { Header } from "../../components/header";
import { CreateEventDialog } from "./_components/create-event-dialog";
import { DeleteEventDialog } from "./_components/delete-event-dialog";
import { EditEventDialog } from "./_components/edit-event-dialog";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const AdminEventsPage = async (props: Props) => {
  const params = await props.params;
  const dict = await getDictionary(params.locale);
  const dateLocale = params.locale === "pl" ? pl : enUS;
  const events = await database.event.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return (
    <>
      <Header
        page={dict.app.admin.events.page.headerTitle}
        pages={[
          dict.app.admin.events.page.headerAdmin,
          dict.app.admin.events.page.headerEvents,
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">
            {dict.app.admin.events.page.manageEvents}
          </h1>
          <CreateEventDialog dict={dict.app.admin.events.createDialog} />
        </div>

        <div className="overflow-hidden rounded-md border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {dict.app.admin.events.page.table.title}
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {dict.app.admin.events.page.table.date}
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {dict.app.admin.events.page.table.location}
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {dict.app.admin.events.page.table.status}
                </th>
                <th className="px-6 py-3 text-right font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {dict.app.admin.events.page.table.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">
                    {event.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-muted-foreground text-sm">
                    {format(new Date(event.date), "PPP p", {
                      locale: dateLocale,
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-muted-foreground text-sm">
                    {event.location || "-"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {event.published ? (
                      <Badge variant="default">
                        {dict.app.admin.events.page.table.published}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        {dict.app.admin.events.page.table.draft}
                      </Badge>
                    )}
                  </td>
                  <td className="flex justify-end gap-3 whitespace-nowrap px-6 py-4 text-right text-muted-foreground text-sm">
                    <EditEventDialog
                      dict={dict.app.admin.events.editDialog}
                      event={event}
                    />
                    <DeleteEventDialog
                      dict={dict.app.admin.events.deleteDialog}
                      eventId={event.id}
                      eventTitle={event.title}
                    />
                  </td>
                </tr>
              ))}

              {events.length === 0 && (
                <tr>
                  <td
                    className="px-6 py-10 text-center text-muted-foreground"
                    colSpan={5}
                  >
                    {dict.app.admin.events.page.table.noEvents}
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
