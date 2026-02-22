import { database } from "@repo/database";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import Link from "next/link";
import { Header } from "../components/header";

const AdminPage = async () => {
  const eventsCount = await database.event.count();
  const docsCount = await database.doc.count();

  return (
    <>
      <Header page="Overview" pages={["Admin"]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">{eventsCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">
                Total Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">{docsCount}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Welcome to Admin Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                This is your central hub for managing the Open Kalendo platform.
                From here, you can view key metrics and navigate to specific
                management sections.
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow transition-colors hover:bg-primary/90"
                  href="/admin/events"
                >
                  Manage Events
                </Link>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 font-medium text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  href="/admin/docs"
                >
                  Manage Docs
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
