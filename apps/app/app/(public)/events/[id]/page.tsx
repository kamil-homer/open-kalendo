import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { notFound } from "next/navigation";
import { getEventById } from "../../../actions/events/get";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock, ExternalLink } from "lucide-react";

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
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Powrót do kalendarza
      </Link>

      <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
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
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-10">
            <p className="whitespace-pre-wrap text-lg leading-relaxed text-foreground/80">
              {event.description}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 pt-6 border-t font-medium">
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
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
