import RecipeCard from "@/components/RecipeCard";

interface Params {
  params: {
    category: string;
  };
}

const ExploreRecipesPage = async ({ params }: Params) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`);
    const data = await response.json();
    const recipeData = data.meals;

    return (
      <div className="w-full my-4 border-1 border-[#26252246] rounded-4xl p-4 flex flex-row flex-wrap">
          { recipeData.map((item: any, index: number) =>             
              <RecipeCard key={index} {...item} />
          )}
      </div>
    );
};

export default ExploreRecipesPage;