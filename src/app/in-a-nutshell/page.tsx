import { getFeaturedBylawContent } from '@/actions/apiCalls';
import InANutshell from "@/components/InANutshell";

export const revalidate = 0;

export default async function Home() {
  const featuredBylawContent = await getFeaturedBylawContent();

  return (
    <div className="flex flex-col items-center justify-start w-full mb-10">
      <InANutshell featuredBylawContent={featuredBylawContent} />
    </div>
  );
}
