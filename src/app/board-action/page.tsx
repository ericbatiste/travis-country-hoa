import BoardActionContent from "@/components/BoardActionContent";
import { getBoardActionContent, getFeaturedBylawContent } from "@/utils/supabase/actions";

export const revalidate = 0;

export default async function BoardActionPage() {
  const boardAction = await getBoardActionContent();
  const featuredBylawContent = await getFeaturedBylawContent()

  return (
      <section className="flex flex-col items-center justify-start w-full mb-10">
        <BoardActionContent featuredBylawContent={featuredBylawContent} boardAction={boardAction}/>
      </section>
  );
}