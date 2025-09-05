'use client'

import { preferredCategoryContextType, UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import { useFavoriteCategoryContext, useUserContext } from "@/utils/contexts";
import RecipeCard from "../RecipeCard";

type RecipeType = {
    strMeal: string,
    idMeal: string,
    strMealThumb:string
}


const ForYou = () => {
    const {user} = useUserContext() as UserContextType;
    const [recipe, setRecipe] = useState<RecipeType[] | null>(null);
    const { preferredCategory, setPreferredCategory } = useFavoriteCategoryContext() as preferredCategoryContextType;
    
    useEffect(() => {
        const fetchRecipes = async () => {
            if (user && preferredCategory) {
                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${preferredCategory}`);
                    const data = await response.json();

                    setRecipe(data.meals);  

                } catch (error:any) {
                    console.log(`Error: ${error}`)
                }
            }
        }

        fetchRecipes();
    }, [user, preferredCategory]);

    return (
        <div className="my-4 text-center main-border">
            <h2 className="font-bold text-4xl uppercase m-5">{user!.name}, this is for you </h2>
            <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-center">
                {recipe && 
                    recipe.slice(0, 6).map((item, index) =>
                        <RecipeCard key={index} strMeal={item.strMeal} idMeal={item.idMeal} strMealThumb={item.strMealThumb} />
                    )
                }
            </div>
        </div>
    )
}

export default ForYou;