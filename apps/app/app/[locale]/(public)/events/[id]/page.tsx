import { getDictionary } from "@repo/internationalization";
import { format } from "date-fns";
import { enUS, pl } from "date-fns/locale";
import {
  Calendar,
  ChevronLeft,
  Clock,
  ExternalLink,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventById } from "../../../../actions/events/get";

type EventPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id, locale } = await params;
  const { data: event, error } = await getEventById(id);
  const dict = await getDictionary(locale);
  const dateLocale = locale === "pl" ? pl : enUS;

  if (error || !event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          className="mb-8 inline-flex items-center text-muted-foreground transition-colors hover:text-primary"
          href="/"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          {dict.app.public.page.backToCalendar}
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
                  {format(event.date, "d MMMM yyyy", { locale: dateLocale })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary/60" />
                <span className="font-medium text-sm">
                  {format(event.date, "HH:mm", { locale: dateLocale })}
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

          {event.link && (
            <div className="border-t pt-6">
              <a
                className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                href={event.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="h-4 w-4" />
                {dict.app.public.page.goToEventPage}
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
