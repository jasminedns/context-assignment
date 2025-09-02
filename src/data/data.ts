import { userType } from "@/utils/types";
import { linkType } from "@/utils/types";

export const users:userType[] = [
    {
        name: "Jasmine",
        favoriteCategory: "Dessert",
        favoriteRecipes: [""]
    },
    {
        name: "Demi",
        favoriteCategory: "Seafood",
        favoriteRecipes: [""]
    },
    {
        name: "Pumpkin",
        favoriteCategory: "Beef",
        favoriteRecipes: [""]
    },
]

export const links:linkType[] = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Explore",
        url: "/explore"
    },
    {
        name: "My Recipes",
        url: "/my-recipes"
    }
]