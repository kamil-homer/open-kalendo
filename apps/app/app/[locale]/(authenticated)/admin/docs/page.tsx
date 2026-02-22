import { database } from "@repo/database";
import { Badge } from "@repo/design-system/components/ui/badge";
import { getDictionary } from "@repo/internationalization";
import { Header } from "../../components/header";
import { CreateDocDialog } from "./_components/create-doc-dialog";
import { DeleteDocDialog } from "./_components/delete-doc-dialog";
import { EditDocDialog } from "./_components/edit-doc-dialog";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const AdminDocsPage = async (props: Props) => {
  const params = await props.params;
  const dict = await getDictionary(params.locale);
  const docs = await database.doc.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Header 
        page={dict.app.admin.docs.page.headerTitle} 
        pages={[dict.app.admin.docs.page.headerAdmin, dict.app.admin.docs.page.headerDocs]} 
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">{dict.app.admin.docs.page.manageDocs}</h1>
          <CreateDocDialog dict={dict.app.admin.docs.createDialog} />
        </div>

        <div className="overflow-hidden rounded-md border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {dict.app.admin.docs.page.table.title}
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {dict.app.admin.docs.page.table.slug}
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {dict.app.admin.docs.page.table.link}
                </th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {dict.app.admin.docs.page.table.status}
                </th>
                <th className="px-6 py-3 text-right font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {dict.app.admin.docs.page.table.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {docs.map((doc) => (
                <tr key={doc.id}>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-sm">
                    {doc.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-muted-foreground text-sm">
                    {doc.slug}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-muted-foreground text-sm">
                    {doc.link || "-"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {doc.published ? (
                      <Badge variant="default">{dict.app.admin.docs.page.table.published}</Badge>
                    ) : (
                      <Badge variant="secondary">{dict.app.admin.docs.page.table.draft}</Badge>
                    )}
                  </td>
                  <td className="flex justify-end gap-3 whitespace-nowrap px-6 py-4 text-right text-muted-foreground text-sm">
                    <EditDocDialog dict={dict.app.admin.docs.editDialog} doc={doc} />
                    <DeleteDocDialog
                      dict={dict.app.admin.docs.deleteDialog}
                      docId={doc.id}
                      docTitle={doc.title}
                    />
                  </td>
                </tr>
              ))}

              {docs.length === 0 && (
                <tr>
                  <td
                    className="px-6 py-10 text-center text-muted-foreground"
                    colSpan={5}
                  >
                    {dict.app.admin.docs.page.table.noDocs}
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
