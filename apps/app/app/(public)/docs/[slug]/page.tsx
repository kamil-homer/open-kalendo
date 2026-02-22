import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Docs: ${slug}`,
  };
}

const DocsPage = async ({ params }: Props) => {
  const { slug } = await params;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Documentation: {slug}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>This is a placeholder for the knowledge base content related to <strong>{slug}</strong>.</p>
        <p>Here you can add more information about the project, guides, and other useful documents.</p>
      </div>
    </div>
  );
};

export default DocsPage;
