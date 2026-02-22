import { database } from "@repo/database";
import { getDictionary } from "@repo/internationalization";
import { BookOpen, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function DocsPage(props: Props) {
  const params = await props.params;
  const dict = await getDictionary(params.locale);
  const docs = await database.doc.findMany({
    where: {
      published: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-xl bg-primary/10 p-3">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-4xl tracking-tight">
              {dict.app.public.docs.title}
            </h1>
            <p className="mt-2 text-muted-foreground text-xl">
              {dict.app.public.docs.description}
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="mb-6 font-bold text-2xl">
            {dict.app.public.docs.browseTitle}
          </h2>
          <div className="flex flex-col gap-4">
            {docs.map((doc) => (
              <div
                className="group flex flex-col justify-between gap-4 rounded-xl border bg-card p-4 transition-all hover:border-primary/30 hover:bg-accent/5 sm:flex-row sm:items-center"
                key={doc.id}
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/5 p-2 text-primary transition-colors group-hover:bg-primary/10">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-tight tracking-tight transition-colors group-hover:text-primary">
                      {doc.title}
                    </h3>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  {doc.link && (
                    <a
                      className="flex items-center gap-1 font-semibold text-muted-foreground text-xs transition-colors hover:text-primary"
                      href={doc.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {dict.app.public.docs.goToDocLink}
                    </a>
                  )}
                  <Link
                    className="inline-flex h-8 items-center justify-center rounded-lg bg-secondary px-4 font-bold text-secondary-foreground text-xs transition-all hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/20 active:scale-95"
                    href={`/docs/${doc.slug}`}
                  >
                    {dict.app.public.docs.details}
                  </Link>
                </div>
              </div>
            ))}
            {docs.length === 0 && (
              <p className="text-muted-foreground italic">
                {dict.app.public.docs.noArticles}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
