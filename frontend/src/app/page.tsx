import { FeedPublicaciones } from "@/features/publicaciones";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return <FeedPublicaciones queryInicial={q} />;
}
