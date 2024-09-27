"use client"

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div 
      className="w-full min-h-screen top-0 left-0 py-4 md:py-8"
      style={{ 
        backgroundImage: "url('/marymoorefalls.png'), linear-gradient(to bottom, #a8c8c0, #d6d3cc)", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 10
      }}  
    >
      <header className="flex justify-between px-2 md:px-10 z-20">
        <div className="space-y-2">
          <h1 className="font-serif text-white tracking-wide text-3xl md:text-6xl text-shadow">
            Our Travis Country...
          </h1>
          <p className="text-xl text-white md:text-4xl text-shadow whitespace-nowrap md:ml-10">
            examining our bylaws one section at a time.
          </p>
        </div>
      </header>
      <section className="mt-12 px-6 md:px-20 flex flex-col justify-center items-center gap-10">
        <div className="max-w-4xl flex flex-col gap-8 p-8 md:p-14 bg-beige rounded-md shadow-xl text-md md:text-xl text-blue">
          <h2 className="text-2xl md:text-3xl text-center font-semibold">We’ve all signed them, but have we <span className="italic underline">read</span> them?</h2>
          <p>
            As former board members, our goal is to educate you, the members and residents of
            Travis Country Community Service Association, Inc. (TCCSA), about your rights and
            responsibilities as provided in our governing documents. As fellow members of this
            association (HOA), we will zero in on key sections each month to provide
            information in a clear and concise manner so that members can better understand
            the Articles of Incorporation, the TCCSA Bylaws and Amendments, our Restrictive
            Covenants, and our Book of Resolutions. We will choose these sections based on
            criteria such as current actions within our leadership or general member rights that
            we feel need to be highlighted.
          </p>
          <p>
            Understanding the rules of our organization is the first step in taking an active role in
            our governance. If we know our rights as association members, we can preserve
            them.
          </p>
          <p>
            Join us by signing up on our contact page to receive the monthly segment as soon as
            we’ve uploaded it.
          </p>
          <div className="italic font-bold text-center space-y-2">
            <p>Thank you for visiting us!</p>
            <p className="font-serif">Suzann Madeley, Linda Farrow and Ibby Sowell</p>
          </div>
        </div>
        <button 
          className="bg-terracotta text-white md:text-xl mb-8 py-2 px-6 rounded-md hover:bg-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50"
          onClick={() => router.push('/monthly-feature')} 
        >
          Continue To Site
        </button>
      </section>
    </div>
  );
}





