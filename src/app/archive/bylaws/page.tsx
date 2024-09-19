import { getAllBylaws } from "@/utils/supabase/actions";
import ArchiveBylawCard from "@/components/ArchiveBylawCard";

export default async function Archive() {
  const bylaws = await getAllBylaws();

  return (
    <div className="px-4 lg:px-20 my-4">
      <h1 className="my-6 md:my-10 text-2xl md:text-5xl font-semibold text-blue text-center">Bylaw Archive</h1>
      <div className="space-y-4">
        {bylaws?.map(bylaw => (
          <ArchiveBylawCard 
            key={bylaw.id}
            id={bylaw.id}
            createdAt={bylaw.created_at}
            sectionNumber={bylaw.section_number}
            sectionTitle={bylaw.section_title}
            description={bylaw.description}
          />
        ))}
      </div>
    </div>
  );
}