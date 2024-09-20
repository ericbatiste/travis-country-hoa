import BoardActionContent from "@/components/BoardActionContent";
import { getFeaturedBylawContent } from "@/utils/supabase/actions";

export const revalidate = 0;

export default async function BoardActionPage() {
  const content = await getFeaturedBylawContent()

  return (
      <section className="flex flex-col items-center justify-start w-full mb-10">
        <BoardActionContent content={content} />
      </section>
  );
}