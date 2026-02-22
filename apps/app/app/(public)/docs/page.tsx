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

export default async function DocsPage() {
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
            <CommandIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-4xl tracking-tight">Documentation</h1>
            <p className="mt-2 text-muted-foreground text-xl">
              Everything you need to know about working with Open Kalendo.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 text-left">
          <Card className="group cursor-pointer transition-colors hover:border-primary/50">
            <Link href="/docs/getting-started">
              <CardHeader>
                <div className="w-fit rounded-lg bg-blue-500/10 p-2 transition-colors group-hover:bg-blue-500/20">
                  <Rocket className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle className="mt-4">Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm text-left">
                  Learn how to install and configure your first Open Kalendo
                  instance.
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="group cursor-pointer transition-colors hover:border-primary/50">
            <Link href="/docs/features">
              <CardHeader>
                <div className="w-fit rounded-lg bg-orange-500/10 p-2 transition-colors group-hover:bg-orange-500/20">
                  <Zap className="h-5 w-5 text-orange-500" />
                </div>
                <CardTitle className="mt-4">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm text-left">
                  Explore the powerful features and tools available in the
                  platform.
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="group cursor-pointer transition-colors hover:border-primary/50">
            <Link href="/docs/architecture">
              <CardHeader>
                <div className="w-fit rounded-lg bg-purple-500/10 p-2 transition-colors group-hover:bg-purple-500/20">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                </div>
                <CardTitle className="mt-4">Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm text-left">
                  Deep dive into the technical details and how things work under
                  the hood.
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="group cursor-pointer transition-colors hover:border-primary/50">
            <Link href="/docs/security">
              <CardHeader>
                <div className="w-fit rounded-lg bg-green-500/10 p-2 transition-colors group-hover:bg-green-500/20">
                  <Shield className="h-5 w-5 text-green-500" />
                </div>
                <CardTitle className="mt-4">Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm text-left">
                  Understand how we keep your data safe and protected.
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>

        <div className="mt-20">
          <h2 className="mb-6 font-bold text-2xl">Browse All Articles</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {docs.map((doc) => (
              <Link
                key={doc.id}
                href={`/docs/${doc.slug}`}
                className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{doc.title}</span>
              </Link>
            ))}
            {docs.length === 0 && (
              <p className="col-span-2 text-muted-foreground italic">
                No articles published yet.
              </p>
            )}
          </div>
        </div>

        <div className="mt-20 border rounded-2xl bg-muted/50 p-8">
          <h2 className="mb-4 font-bold text-2xl">Need help?</h2>
          <p className="text-muted-foreground">
            Can't find what you're looking for? Join our community or contact
            support.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Join Discord
            </button>
            <button className="rounded-lg border bg-background px-6 py-2 font-medium transition-colors hover:bg-muted">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
