'use client'

import RecipeCard from "@/components/RecipeCard";
import { useSavedRecipeContext, useUserContext } from "@/utils/contexts";
import { savedRecipeContextType, UserContextType } from "@/utils/types";

const myRecipes = () => {
    const { user } = useUserContext() as UserContextType;
    const { recipes } = useSavedRecipeContext() as savedRecipeContextType;
    
    return (
        <div>
            {recipes && recipes.length > 0 
                ?
                <div>
                    <div className="text-center font-bold text-4xl my-10">
                        {user &&
                            <h2>{user.name}, here are your saved recipes! </h2>
                        }
                    </div>
                    <div className="flex flex-row flex-wrap justify-center items-align my-5">
                        {   recipes.map((item, index) => (
                                <RecipeCard strMeal={item.name} strMealThumb={item.imgUrl} idMeal={item.id} key={index} />
                            ))
                        }
                    </div>
                </div>
                :   
                <div>
                    <h2 className="m-10">No saved recipes yet.</h2>
                </div>
            }
        </div>
    )
}

export default myRecipes;