'use client'

import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import LogIn from "@/components/LogIn";
import Image from "next/image";
import ForYou from "@/components/ForYou";
import Explore from "@/components/Explore";
import Link from "next/link";

export default function Home() {

  const {user} = useUserContext() as UserContextType;

  return (
    <div className={user ? "" : "m-auto p-4"}>
      { user
        ? 
        <div>
          <div>
            <div className="relative">
              <div className="h-[350px] md:h-[450px]">
                <Image src="/hero-section.jpg" alt="hero image" fill className="object-cover rounded-2xl"/>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                <div className="w-[80%] md:w-[50%] m-auto">
                  <h3 className="text-2xl md:text-5xl font-extrabold my-2 md:my-4">UNLEASH CULINARY EXCELLENCE</h3>
                  <p className="py-3 my-2">Explore a world of flavors, discover handcrafted recipes, and let the aroma of our passion for cooking fill your kitchen</p>
                  <Link href="/explore">
                    <button 
                      className="bg-[#F29C33] font-bold py-2 px-3 rounded-3xl cursor-pointer hover:bg-[#e2912f]"
                    >
                      EXPLORE RECIPES
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <ForYou />
          <Explore />
        </div>
        : <div>
            <LogIn />
          </div>
      }
    </div>
  );
}