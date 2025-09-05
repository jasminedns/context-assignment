'use client'

import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@phosphor-icons/react/ssr"
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import { links } from "@/data/data";
import { Pivot as Hamburger } from 'hamburger-react'
import { useEffect, useState } from "react";
import "../../app/globals.css"

const Header = () => {
    const {user} = useUserContext() as UserContextType;
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

    }, [isOpen]);

    return (
        <header className={`flex flex-row my-3 p-3 items-center justify-between main-border`}>
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
                        <div className="hidden md:block">
                            <ul className="flex flex-row gap-4 m-auto items-center">
                                {
                                    links.map((item, index) => 
                                        <li key={index} className="md:mx-10 lg:mx-15">
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
                        <div className="md:hidden relative">
                            <div className="relative z-60">
                                <Hamburger toggled={isOpen} toggle={setOpen} color={`${isOpen ? "#F29C33" : "black"}`}/>
                            </div>
                            {isOpen &&
                                <div className="bg-[#262522] fixed z-50 top-0 left-0 w-screen h-screen flex">

                                    <ul className="flex flex-col gap-4 m-auto text-[#F0EBE1] uppercase text-3xl">
                                        { links.map((item, index) => 
                                            <li key={index} className="mx-15 p-2 text-center">
                                                <Link 
                                                    className="hover:border-b-4 hover:border-[#EE6352]"
                                                    href={item.url}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
            <div className="hidden md:block">
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