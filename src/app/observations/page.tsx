import ObservationsContent from "@/components/ObservationsContent";
import { getFeaturedBylawContent } from "@/utils/supabase/actions";

export const revalidate = 0;

export default async function ObservationsPage() {
  const content = await getFeaturedBylawContent()

  return (
      <section className="flex flex-col items-center justify-start w-full mb-10">
        <ObservationsContent content={content} />
      </section>
  );
}