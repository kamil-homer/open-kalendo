import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { ArrowLeft, Calendar, Clock, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventById } from "../../../../actions/events/get";

type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const { data: event, error } = await getEventById(id);

  if (error || !event) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl p-6 py-12">
      <Link
        className="mb-8 inline-flex items-center gap-2 font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
        href="/"
      >
        <ArrowLeft className="h-4 w-4" />
        Powrót do kalendarza
      </Link>

      <article className="fade-in slide-in-from-bottom-4 animate-in duration-500">
        <header className="mb-8">
          <h1 className="mb-4 font-extrabold text-4xl text-primary tracking-tight sm:text-5xl">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary/60" />
              <span className="font-medium text-sm">
                {format(event.date, "d MMMM yyyy", { locale: pl })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary/60" />
              <span className="font-medium text-sm">
                {format(event.date, "HH:mm", { locale: pl })}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary/60" />
                <span className="font-medium text-sm">{event.location}</span>
              </div>
            )}
          </div>
        </header>

        {event.description && (
          <div className="prose prose-neutral dark:prose-invert mb-10 max-w-none">
            <p className="whitespace-pre-wrap text-foreground/80 text-lg leading-relaxed">
              {event.description}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 border-t pt-6 font-medium">
          {event.link && (
            <a
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-bold text-primary-foreground text-sm shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]"
              href={event.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" />
              Idź na stronę wydarzenia
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
