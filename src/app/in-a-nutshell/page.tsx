import { getFeaturedBylawContent } from "@/utils/supabase/actions";
import InANutshellContent from "@/components/InANutshellContent";

export const revalidate = 0;

export default async function InANutshellPage() {
  const content = await getFeaturedBylawContent();

  return (
    <div className="flex flex-col items-center justify-start w-full mb-10">
      <InANutshellContent content={content} />
    </div>
  );
}
