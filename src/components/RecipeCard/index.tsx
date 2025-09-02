'use client'

import { useSavedRecipeContext } from "@/utils/contexts";
import { savedRecipeContextType } from "@/utils/types";
import { HeartIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
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

    const [meal, setMeal] = useState<MealType | null>(null);
    const [fillColor, setFillColor] = useState('black');    

    const { recipes, setRecipes } = useSavedRecipeContext() as savedRecipeContextType;
    
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
        setFillColor("red")
        setRecipes([...recipes, { name: meal.strMeal, id: meal.idMeal }]);
    }

    return (
        <div className="w-[25%] p-4">
            {   meal !== null 
                ? 
                    <div className="border-1 border-[#26252246] rounded-4xl">
                        <div>
                            <img src={meal.strMealThumb || strMealThumb} alt={`Image of ${meal.strMeal || strMeal}`} className="w-[100%] h-auto rounded-t-4xl"/>
                        </div>
                        <div className="min-h-[210px] flex flex-col justify-around">
                            <h4 className="text-2xl text-center font-extrabold mt-3 p-2">{meal.strMeal || strMeal}</h4>
                                <div className="flex flex-row justify-around items-center">
                                    <button 
                                    onClick={handleClick}
                                        className="border-1 border-[#26252246] rounded-4xl py-2 px-4 cursor-pointer hover:bg-[#9FDC26] hover:border-[#262522] hover:font-bold"
                                    >
                                        VIEW RECIPE
                                    </button>
                                    <HeartIcon size={32}
                                        fill={fillColor}
                                        onClick={() => saveRecipe(meal)}
                                        className="cursor-pointer"
                                    />
                            </div>
                        </div>
                    </div>
                : null
            }
        </div>
    )
}

export default RecipeCard;































// type RecipeCardProps = {
//     id: string;
// }

// type Meal = {
//     idMeal: string;
//     strMeal: string;
//     strMealThumb: string;
//     strArea:string
// };

// const RecipeCard = ({id}:RecipeCardProps) => {
//     const [meal, setMeal] = useState<Meal | null>(null);
//     useEffect(() => {
//         const fetchMoreDetails = async () => {
//             try {
//                 const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
//                 const data = await response.json();

//                 setMeal(data.meals[0]);
//             } catch (error:any) {
//                 <h4>Sorry for the inconvenience. Error: {error}</h4>
//             }
//         }
//         fetchMoreDetails();
//     }, [id]);

//     return (
//         <div>
//             {meal &&
//                 <div>
//                     <h4>{meal.strMeal}</h4>
//                     <p>{meal.strArea}</p>
//                 </div>
//             }
//         </div>
            
//     )
// }

// export default RecipeCard;