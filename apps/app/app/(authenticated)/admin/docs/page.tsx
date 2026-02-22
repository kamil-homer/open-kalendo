import { database } from "@repo/database";
import { Header } from "../../components/header";

const AdminDocsPage = async () => {
  const docs = await database.doc.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <>
      <Header page="Docs Management" pages={["Admin", "Docs"]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">Manage Documents</h1>
          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90">
            Create New Doc
          </button>
        </div>

        <div className="overflow-hidden rounded-md border bg-background">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {docs.map((doc) => (
                <tr key={doc.id}>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">
                    {doc.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-muted-foreground text-sm">
                    {doc.slug}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {doc.published ? (
                      <span className="inline-flex rounded-full bg-green-100 px-2 font-semibold text-green-800 text-xs leading-5 dark:bg-green-900/30 dark:text-green-400">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-yellow-100 px-2 font-semibold text-xs text-yellow-800 leading-5 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Draft
                      </span>
                    )}
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
              {docs.length === 0 && (
                <tr>
                  <td
                    className="px-6 py-10 text-center text-muted-foreground"
                    colSpan={4}
                  >
                    No documents found.
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

export default AdminDocsPage;
