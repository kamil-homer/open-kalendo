import { database } from "@repo/database";
import type { Metadata } from "next";

const title = "Open Kalendo";
const description = "Open-source event management.";

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const events = await database.event.findMany({
    where: {
      published: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <div className="container mx-auto p-8">
      <header className="mb-8">
        <h1 className="font-bold text-4xl">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            className="rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md"
            key={event.id}
          >
            <h2 className="mb-2 font-semibold text-xl">{event.title}</h2>
            <div className="mb-4 flex aspect-video items-center justify-center rounded-md bg-muted">
              <span className="text-muted-foreground">Event Preview</span>
            </div>
            <button className="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground">
              View Details
            </button>
          </div>
        ))}
        {events.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
