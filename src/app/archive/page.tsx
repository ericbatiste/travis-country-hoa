import { getAllBylaws } from "@/actions/apiCalls";
import ArchiveBylawCard from "@/components/ArchiveBylawCard";

export default async function Archive() {
  const bylaws = await getAllBylaws();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Archived Bylaws</h1>
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
