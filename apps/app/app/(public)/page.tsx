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
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Event Preview</span>
            </div>
            <button className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium">
              View Details
            </button>
          </div>
        ))}
        {events.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
