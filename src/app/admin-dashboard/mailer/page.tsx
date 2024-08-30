import AdminNav from "@/components/AdminNav"
import Mailer from "@/components/Mailer"

export default function EmailSubscribers() {
  return (
    <div className="flex w-screen">
      <aside className="top-0 left-0 h-screen w-min p-4">
        <AdminNav />
      </aside>
      <div className="flex flex-col flex-grow items-center mt-4">
        <Mailer />
      </div>
    </div>
  )
}