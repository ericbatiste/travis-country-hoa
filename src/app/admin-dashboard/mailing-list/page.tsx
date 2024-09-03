import AdminNav from "@/components/AdminNav";
import MailingList from "@/components/MailingList";
import { fetchMailgunSubscribers } from "@/utils/mailgun";

export const revalidate = 0;

export default async function Subscribers() {
  const subscribers = await fetchMailgunSubscribers();

  return (
    <div className="flex w-screen">
      <aside className="top-0 left-0 h-screen w-min p-4">
        <AdminNav />
      </aside>
      <div className="flex flex-col flex-grow items-center mt-4">
        <MailingList subscribers={subscribers} />
      </div>
    </div>
  );
}
