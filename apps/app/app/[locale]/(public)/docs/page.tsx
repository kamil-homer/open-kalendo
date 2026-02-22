import { database } from "@repo/database";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import {
  BookOpen,
  CommandIcon,
  FileText,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { getDictionary } from "@repo/internationalization";

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
          <h2 className="mb-6 font-bold text-2xl">{dict.app.public.docs.browseTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {docs.map((doc) => (
              <Link
                className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                href={`/docs/${doc.slug}`}
                key={doc.id}
              >
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{doc.title}</span>
              </Link>
            ))}
            {docs.length === 0 && (
              <p className="col-span-2 text-muted-foreground italic">
                {dict.app.public.docs.noArticles}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
