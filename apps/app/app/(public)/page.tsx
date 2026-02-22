import { database } from "@repo/database";
import { format, startOfDay } from "date-fns";
import { pl } from "date-fns/locale";
import type { Metadata } from "next";

import Link from "next/link";

const title = "Open Kalendo";
const description = "Open-source event management.";

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
  const groupedEvents = events.reduce((acc, event) => {
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
  }, {} as Record<string, Record<string, typeof events>>);

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <header className="mb-10">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-primary">
          {title}
        </h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </header>

      {events.length > 0 ? (
        <div className="space-y-10">
          {Object.entries(groupedEvents).map(([month, days]) => (
            <section key={month} className="animate-in fade-in slide-in-from-bottom-2 duration-400">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground/80 border-b pb-2">
                {month}
              </h2>
              <div className="space-y-4">
                {Object.entries(days).map(([day, dayEvents]) => (
                  <div key={day} className="flex flex-col md:flex-row gap-2 md:gap-8">
                    <div className="md:w-32 flex-shrink-0">
                      <p className="text-sm font-semibold text-foreground/70 capitalize">{day}</p>
                    </div>
                    <ul className="flex-1 space-y-2">
                      {dayEvents.map((event) => (
                        <li
                          key={event.id}
                          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border bg-card p-4 transition-all hover:border-primary/30 hover:bg-accent/5"
                        >
                          <div className="flex flex-col gap-1">
                            <h3 className="text-base font-bold tracking-tight group-hover:text-primary transition-colors leading-tight">
                              {event.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
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
                          
                          <div className="flex items-center gap-3 shrink-0">
                            {event.link && (
                              <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
                              >
                                Idź na stronę wydarzenia
                              </a>
                            )}
                            <Link
                              href={`/events/${event.id}`}
                              className="inline-flex h-8 items-center justify-center rounded-lg bg-secondary px-4 text-xs font-bold text-secondary-foreground transition-all hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/20 active:scale-95"
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
          <p className="font-semibold text-foreground">Brak nadchodzących wydarzeń</p>
          <p className="text-sm text-muted-foreground mt-1">Zajrzyj do nas później!</p>
        </div>
      )}
    </div>
  );
};




export default App;
