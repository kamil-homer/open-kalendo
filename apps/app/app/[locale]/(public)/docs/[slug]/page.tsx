import { database } from "@repo/database";
import { getDictionary } from "@repo/internationalization";
import { ChevronLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await database.doc.findUnique({
    where: { slug },
  });

  return {
    title: doc?.title ?? `Docs: ${slug}`,
  };
}

const DocsPage = async ({ params }: Props) => {
  const { slug, locale } = await params;
  const dict = await getDictionary(locale);
  const doc = await database.doc.findUnique({
    where: {
      slug,
      published: true,
    },
  });

  if (!doc) {
    notFound();
  }

  // Handle content rendering
  const renderContent = () => {
    if (typeof doc.content === "string") {
      return <p className="whitespace-pre-wrap">{doc.content}</p>;
    }

    // Fallback for JSON content (could be enhanced if structured)
    try {
      return (
        <pre className="overflow-auto rounded-lg bg-muted p-4 font-mono text-sm">
          {JSON.stringify(doc.content, null, 2)}
        </pre>
      );
    } catch (e) {
      return <p>Error rendering content</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          className="mb-8 inline-flex items-center text-muted-foreground transition-colors hover:text-primary"
          href="/docs"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          {dict.app.public.docs.backToDocs}
        </Link>

        <header className="mb-12">
          <h1 className="mb-4 font-bold text-4xl tracking-tight">
            {doc.title}
          </h1>
          {doc.link && (
            <a
              className="inline-flex items-center gap-2 text-primary hover:underline"
              href={doc.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" />
              {dict.app.public.docs.goToDocLink}
            </a>
          )}
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
