import { getAllBylaws } from "@/actions/apiCalls";
import ArchiveBylawCard from "@/components/ArchiveBylawCard";

export default async function Archive() {
  const bylaws = await getAllBylaws();

  return (
    <div className="px-4 lg:px-8">
      <h1 className="text-2xl lg:text-6xl font-bold text-blue text-center my-10">Bylaw Archive</h1>
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
