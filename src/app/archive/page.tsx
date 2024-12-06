import { getAllBylaws } from "@/utils/supabase/actions";
import ArchiveBylawCard from "@/components/ArchiveBylawCard";

export default async function Archive() {
  const bylaws = await getAllBylaws();

  return (
    <div className="px-4 lg:px-20 my-4 min-h-screen">
      <h1 className="my-4 md:my-10 text-2xl md:text-5xl font-semibold text-blue text-center">Archive</h1>
      <p className="mb-2 md:mb-4 md:text-2xl font-semibold text-blue text-center">Select an entry to view Bylaw along with associated In A Nutshell and Board Action content...</p>
      <div className="grid grid-cols-3 md:grid-cols-7 text-center bg-blue text-white font-bold mb-4">
        <div className="p-2 border">Featured Date</div>
        <div className="p-2 border">Section Number</div>
        <div className="p-2 border">Section Title</div>
        <div className="col-span-4 p-2 border hidden md:block">Description</div>
      </div>
      <div className="space-y-2">
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
