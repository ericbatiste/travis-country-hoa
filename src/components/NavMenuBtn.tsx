"use client";

import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { usePathname } from "next/navigation";

export default function NavMenuBtn({ admin }: { admin: User | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <>
      <button className="lg:hidden transition-all hover:scale-110" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Menu size={35} color={isMenuOpen ? '#AD5F40' : 'beige'} />
      </button>
      {isMenuOpen && (
        <div className="absolute flex items-center justify-center left-0 top-full py-8 bg-beige shadow-md rounded-lg w-full text-center lg:hidden">
          <Navigation admin={admin}/>
        </div>
      )}
    </>
  )
}
