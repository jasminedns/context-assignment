'use client'

import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";

const explorePage = () => {
    const [exploreRecipe, setExploreRecipe] = useState<any[] | null>(null)
    
    useEffect(() => {
        const fetchExploreRecipes = async () => {
            try {
                const recipes: any[] = [];

                for(let i = 0; i <= 11; i++) {
                    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
                    const data = await response.json()
                    if (data.meals && data.meals.length > 0) {
                        recipes.push(data.meals[0]);
                    }
                }
                setExploreRecipe(recipes);

            } catch (error:any) {
                console.log(`Error: ${error}`)
            }
        }

        fetchExploreRecipes();
    }, []);

    return (
        <div className="flex flex-row flex-wrap justify-center">
            {exploreRecipe && exploreRecipe.map((item, index) =>
                <RecipeCard key={index} {...item} />
            )}
        </div>
    );
}

export default explorePage;