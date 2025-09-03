interface Params {
  params: {
    id: string;
  };
}

const RecipePage = async ({ params }: Params) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`);
    const data = await response.json();
    const recipeData = data.meals[0];
    const measuresWithIngredients:string[] = []

    const keys = Object.keys(recipeData).filter(item => item.includes("strIngredient"));

    for (let i = 0; i < keys.length; i++ ) {
        if (recipeData[keys[i]]) {
            measuresWithIngredients.push(recipeData[keys[i]] + " - " + recipeData[`strMeasure${i + 1}`])
        } else {
            break
        }
    }

    return (
        <div className="mx-auto my-4 border-1 border-[#26252246] rounded-4xl p-4">
            <div className="text-center">
                <h2 className="bg-[#EE6352] inline-block text-[#FFFBF2] py-2 px-3 rounded-4xl text-sm">RECIPE</h2>
            </div>
            <h1 className="uppercase text-center text-3xl m-5">{recipeData.strMeal}</h1>
            <div className="flex flex-col justify-center">
                <div>
                    <img src={recipeData.strMealThumb} alt={recipeData.strMeal} className="md:w-[35%] h-auto rounded-4xl m-auto"/>
                </div>
                <div className="flex flex-col md:flex-row justify-around items-center my-10">
                    <p className="order-2 whitespace-pre-line my-10 text-center w-[90%] md:w-[50%]">{recipeData.strInstructions}</p>
                    <div className="order-1 text-center md:border-1 border-[#26252246] rounded-4xl py-4 px-15">
                        <h3 className="font-bold text-2xl">Ingredients:</h3>
                        <div>
                            {measuresWithIngredients.map((item, index) =>
                                <p key={index} className="capitalize p-1">{item}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipePage;
