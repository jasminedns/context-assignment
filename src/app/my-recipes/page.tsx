'use client'

import { categoryType } from "@/components/Explore";
import RecipeCard from "@/components/RecipeCard";
import { useFavoriteCategoryContext, useSavedRecipeContext, useUserContext } from "@/utils/contexts";
import { preferredCategoryContextType, savedRecipeContextType, UserContextType } from "@/utils/types";
import { CircleIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/app/globals.css"

const myRecipes = () => {
    const { user, setUser } = useUserContext() as UserContextType;
    const { recipes } = useSavedRecipeContext() as savedRecipeContextType;
    const { preferredCategory, setPreferredCategory } = useFavoriteCategoryContext() as preferredCategoryContextType;
    const [category, setCategory] = useState<categoryType[] | null>([])
    const router = useRouter();

    useEffect(() => {
        if (user?.name) {
            const storedCategory = localStorage.getItem(`preferredCategory-${user.name}`);
            if (storedCategory) {
                setPreferredCategory(storedCategory);
            } else if (user && user.favoriteCategory !== null) {
                setPreferredCategory(user.favoriteCategory);
            }
        }
    }, [user]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
                const data = await response.json();

                setCategory(data.categories)

            } catch (error:any) {
                console.log(`Error: ${error}`)
            }
        }

        fetchCategories();
    }, [])

    const newFavoriteCategory = (category:string) => {
        setPreferredCategory(category)
        if (user?.name) {
            localStorage.setItem(`preferredCategory-${user.name}`, category);
        }
    }

    const LogoutButton = () => {
        if (user?.name) {
            localStorage.removeItem(`preferredCategory-${user.name}`);
        }
        setUser(null)
        router.push("/")
    }

    return (
        <div>
            { user &&
                <div>
                    <div className="text-center font-bold text-4xl my-10">
                        <h2>{user.name}, here are your saved recipes! </h2>
                    </div>
                    { recipes && recipes.length > 0 
                        ?
                        <div>
                            <div className="flex flex-row flex-wrap justify-center items-align my-5">
                                {   recipes.map((item, index) => (
                                        <RecipeCard strMeal={item.name} strMealThumb={item.imgUrl} idMeal={item.id} key={index} />
                                    ))
                                }
                            </div>
                        </div>
                        :   
                        <div className="text-center">
                            <h2 className="m-10">No saved recipes yet.</h2>
                        </div>
                    }
                    <div className="text-center">
                        <h2 className="font-bold text-4xl my-10">Account Details</h2>
                        <div className="flex flex-row justify-around items-center">
                            <p><span className="font-bold">Name:</span> {user.name}</p>
                            <p><span className="font-bold">Favorite Category:</span> {preferredCategory === null ? "No favorite category" : preferredCategory}</p>
                        </div>
                        <div>
                            <h2 className="font-bold my-10">Select a new favorite category:</h2>
                            <div className="gap-5 flex flex-row flex-wrap w-[85%] md:w-[50%] m-auto items-center justify-center">
                                {category?.map((item, index) =>
                                <div key={index} className="gap-1 flex flex-row justify-center items-center">
                                    <CircleIcon 
                                        size={16} 
                                        weight={preferredCategory === item.strCategory ? "fill" : "regular"}
                                        onClick={() => newFavoriteCategory(item.strCategory)}
                                        className="hover:cursor-pointer"
                                    />
                                    <p>{item.strCategory}</p>
                                </div>
                                )}
                            </div>
                        </div>
                        <div className="m-3">
                            <button
                                className="main-border py-2 px-4 m-3 cursor-pointer hover:bg-[#9FDC26] hover:border-[#262522] hover:font-bold"
                                onClick={LogoutButton}
                            >
                                LOG OUT
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default myRecipes;