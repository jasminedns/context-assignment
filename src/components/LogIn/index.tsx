'use client'

import { users } from "@/data/data";
import { useState } from "react";
import { useFavoriteCategoryContext, useUserContext } from "@/utils/contexts";
import { preferredCategoryContextType, UserContextType } from "@/utils/types";

const LogIn = () => {
    const [userInput, setUserInput] = useState<string>("")
    const {user, setUser} = useUserContext() as UserContextType;
    const { setPreferredCategory } = useFavoriteCategoryContext() as preferredCategoryContextType;
    
    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const loggedUser = users.filter(user => user.name === userInput)

        if (loggedUser.length > 0) {
            const foundUser = loggedUser[0]
            setUser(foundUser)

            const storedCategory = localStorage.getItem(`preferredCategory-${foundUser.name}`);
                if (storedCategory) {
                    setPreferredCategory(storedCategory);
                } else if (foundUser.favoriteCategory !== null) {
                    setPreferredCategory(foundUser.favoriteCategory);
                }
        } else {
            alert("User not found");
        }
    }

    const handleChange = (e: { target: { value: any}}) => {
        setUserInput(e.target.value);
    }

    return (
        <form className="flex flex-col justify-center items-center main-border shadow-md p-3">
            <h2 className="text-4xl text-center p-3">Hi, log in to see the content!</h2>
            <div className="my-4 flex flex-col justify-center items-center">
                <label htmlFor="username" className="font-bold">Username</label>
                <input name="username" type="text" placeholder="username" className="main-border my-3 p-2" onChange={handleChange}/>
                <label htmlFor="password" className="font-bold">Password</label>
                <input name="password" type="text" placeholder="password" className="main-border my-3 p-2"/>
            </div>
            <button 
                onClick={handleClick}
                className="bg-[#F29C33] font-bold py-3 px-5 rounded-3xl cursor-pointer hover:bg-[#e2912f]"
            >
                Submit
            </button>
      </form>

    )
}

export default LogIn;