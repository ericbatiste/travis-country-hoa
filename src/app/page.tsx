import FeaturedBylawContent from "@/components/FeaturedBylawContent";
import { getFeaturedBylawContent } from '@/actions/apiCalls';

export const revalidate = 0;

export default async function Home() {
  const featuredBylawContent = await getFeaturedBylawContent();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full">
      <FeaturedBylawContent featuredBylawContent={featuredBylawContent} />
    </div>
  );
}
