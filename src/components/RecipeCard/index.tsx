'use client'

import { useSavedRecipeContext } from "@/utils/contexts";
import { savedRecipeContextType } from "@/utils/types";
import { HeartIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type RecipeCardProps = {
    strMeal:string,
    strMealThumb:string,
    idMeal:string
}

type MealType = {
    idMeal:string,
    strMeal:string,
    strCategory:string,
    strArea:string,
    strMealThumb:string
}

const RecipeCard = ({strMeal, strMealThumb, idMeal}:RecipeCardProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const { recipes, setRecipes } = useSavedRecipeContext() as savedRecipeContextType;
    const [meal, setMeal] = useState<MealType | null>(null);

    const saved = recipes.find(item => item.id === idMeal);
    const fillColor = saved ? "red" : "black";

    useEffect(() => {
        const fetchMoreDetails = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                const data = await response.json();

                setMeal(data.meals[0]);

            } catch (error:any) {
                console.log(`Error: ${error}`)
            }
        }

        fetchMoreDetails();
    }, [idMeal]);

    const handleClick = () => {
        if (meal) {
            router.push(`/recipe/${meal.idMeal}`)
        } else if (meal === null) {
            router.push(`/recipe/${idMeal}`)
        }
    }

    const saveRecipe = (meal:MealType) => {
        const alreadySaved = recipes.find(item => item.id === meal.idMeal);
        if (!alreadySaved) {
            setRecipes([...recipes, { name: meal.strMeal, id: meal.idMeal, imgUrl: ""}]);
        }
    }

    return (
        <div className="lg:w-[25%] md:w-[40%] p-4">
            {   meal !== null 
                ? 
                    <div className="main-border">
                        <div>
                            <img src={meal.strMealThumb || strMealThumb} alt={`Image of ${meal.strMeal || strMeal}`} className="w-[100%] h-auto rounded-t-4xl"/>
                        </div>
                        <div className="min-h-[210px] flex flex-col justify-around">
                            <h4 className="text-2xl text-center font-extrabold mt-3 p-2">{meal.strMeal || strMeal}</h4>
                            <div className="flex flex-row justify-around items-center">
                                <button 
                                onClick={handleClick}
                                    className="main-border py-2 px-4 cursor-pointer hover:bg-[#9FDC26] hover:border-[#262522] hover:font-bold"
                                >
                                    VIEW RECIPE
                                </button>
                                {pathname !== "/my-recipes" 
                                    ?
                                        <HeartIcon size={32}
                                            weight= {fillColor === "black" ? "regular" : "fill"}
                                            color={fillColor}
                                            onClick={saved ? undefined : () => saveRecipe(meal)}
                                            className={`cursor-pointer ${saved ? "pointer-events-none" : ""}`}
                                        />
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                : null
            }
        </div>
    )
}

export default RecipeCard;