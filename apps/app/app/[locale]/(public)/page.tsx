import { database } from "@repo/database";
import { format, startOfDay } from "date-fns";
import { pl } from "date-fns/locale";
import type { Metadata } from "next";

import Link from "next/link";

const title = "Open Kalendo";
const description = "Open-source events and docs management for communities.";

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const now = new Date();
  const today = startOfDay(now);

  const events = await database.event.findMany({
    where: {
      published: true,
      date: {
        gte: today,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  // Group events by month and then by day
  const groupedEvents = events.reduce(
    (acc, event) => {
      const month = format(event.date, "LLLL yyyy", { locale: pl });
      const day = format(event.date, "EEEE, d", { locale: pl });

      if (!acc[month]) {
        acc[month] = {};
      }
      if (!acc[month][day]) {
        acc[month][day] = [];
      }
      acc[month][day].push(event);
      return acc;
    },
    {} as Record<string, Record<string, typeof events>>
  );

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <header className="mb-10">
        <h1 className="mb-2 font-extrabold text-3xl text-primary tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </header>

      {events.length > 0 ? (
        <div className="space-y-10">
          {Object.entries(groupedEvents).map(([month, days]) => (
            <section
              className="fade-in slide-in-from-bottom-2 animate-in duration-400"
              key={month}
            >
              <h2 className="mb-4 border-b pb-2 font-bold text-muted-foreground/80 text-sm uppercase tracking-widest">
                {month}
              </h2>
              <div className="space-y-4">
                {Object.entries(days).map(([day, dayEvents]) => (
                  <div
                    className="flex flex-col gap-2 md:flex-row md:gap-8"
                    key={day}
                  >
                    <div className="flex-shrink-0 md:w-32">
                      <p className="font-semibold text-foreground/70 text-sm capitalize">
                        {day}
                      </p>
                    </div>
                    <ul className="flex-1 space-y-2">
                      {dayEvents.map((event) => (
                        <li
                          className="group flex flex-col justify-between gap-4 rounded-xl border bg-card p-4 transition-all hover:border-primary/30 hover:bg-accent/5 sm:flex-row sm:items-center"
                          key={event.id}
                        >
                          <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-base leading-tight tracking-tight transition-colors group-hover:text-primary">
                              {event.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 font-medium text-muted-foreground text-xs">
                              <span className="flex items-center gap-1">
                                <span className="text-foreground/50">⏰</span>
                                {format(event.date, "HH:mm", { locale: pl })}
                              </span>
                              {event.location && (
                                <span className="flex items-center gap-1">
                                  <span className="text-foreground/50">📍</span>
                                  {event.location}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            {event.link && (
                              <a
                                className="font-semibold text-muted-foreground text-xs transition-colors hover:text-primary"
                                href={event.link}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                Idź na stronę wydarzenia
                              </a>
                            )}
                            <Link
                              className="inline-flex h-8 items-center justify-center rounded-lg bg-secondary px-4 font-bold text-secondary-foreground text-xs transition-all hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/20 active:scale-95"
                              href={`/events/${event.id}`}
                            >
                              Szczegóły
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 py-16 text-center">
          <div className="mb-3 text-4xl">🗓️</div>
          <p className="font-semibold text-foreground">
            Brak nadchodzących wydarzeń
          </p>
          <p className="mt-1 text-muted-foreground text-sm">
            Zajrzyj do nas później!
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
