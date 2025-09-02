'use client'

import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@phosphor-icons/react/ssr"
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import { links } from "@/data/data";

const Header = () => {
    const {user} = useUserContext() as UserContextType;

    return (
        <header className={`flex flex-row border-1 border-[#26252246] rounded-4xl my-3 p-3 items-center justify-between`}>
            <div className="flex flex-row ml-5">
                <div>
                    <Link href="/">
                        <Image src="/logo.png" alt="website logo" width={60} height={60}/>
                    </Link>
                </div>
                <Link href="/">
                    <h1 className="font-bold flex flex-col">
                        <span className="-mb-2">Dolce</span>
                        <span>&Dine</span>
                    </h1>
                </Link>
            </div>
            <div>
                { user !== null &&
                        <div>
                            <ul className="flex flex-row gap-4 m-auto">
                                {
                                    links.map((item, index) => 
                                        <li key={index} className="mx-15">
                                            <Link 
                                                className="hover:border-b-4 hover:border-[#EE6352]"
                                                href={item.url}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                }
            </div>
            <div>
                <div className={`${user ? "bg-[#F29C33] font-bold border-1 rounded-full py-2 px-4" : "bg-[#262522] border-2 rounded-full p-2"}`}>
                    { user
                        ? 
                            user.name.charAt(0).toUpperCase()
                        :            
                            <UserIcon size={24} color="white"/>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;