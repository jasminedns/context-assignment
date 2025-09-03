'use client'

import { UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";
import RecipeCard from "../RecipeCard";

type RecipeType = {
    strMeal: string,
    idMeal: string
}


const ForYou = () => {
    const {user} = useUserContext() as UserContextType;
    const [recipe, setRecipe] = useState<RecipeType[] | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            if (user) {
                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${user.favoriteCategory}`);
                    const data = await response.json();

                    setRecipe(data.meals);  

                } catch (error:any) {
                    console.log(`Error: ${error}`)
                }
            }
        }

        fetchRecipes();
    }, [user]);

    return (
        <div className="my-4 text-center border-1 border-[#26252246] rounded-4xl">
            <h2 className="font-bold text-4xl uppercase m-5">For You</h2>
            <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-center">
                {recipe && 
                    recipe.slice(0, 6).map((item, index) =>
                        <RecipeCard strMealThumb={""} key={index} {...item} />
                    )
                }
            </div>
        </div>
    )
}

export default ForYou;

































// type Recipe = {
//     idMeal: string;
//     strMeal: string;
//     strMealThumb: string;
// };

// const ForYou = ({favoriteCategory}:userType) => {
//     const [recipes, setRecipes] = useState<Recipe[]>([]);

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             try {
//                 const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${favoriteCategory}`);
//                 const data = await response.json();

//                 setRecipes(data.meals);                
//             } catch (error:any) {
//                 <h4>Sorry for the inconvenience. Error: {error}</h4>
//             }
//         }

//         fetchRecipes();
//     }, [favoriteCategory]);



//     return (
//         <div className="my-10 text-center border-1 border-[#26252246] rounded-4xl">
//             <h2 className="font-bold text-3xl uppercase">For You</h2>
//             {
//                 recipes.map((item, index) => 
//                     <RecipeCard key={index} id={item.idMeal}/>
//                 )
//             }
//         </div>
//     )
// }

// export default ForYou;