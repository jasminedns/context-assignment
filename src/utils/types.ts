export type userType = {
    name:string, 
    favoriteCategory: string | null,
    favoriteRecipes: string[]
}

export type UserContextType = {
    user: userType | null,
    setUser: (user:userType | null) => void
}

export type linkType = {
    name: string,
    url: string
}

export type savedRecipeType = {
    name: string;
    id: string;
    imgUrl: string
}

export type savedRecipeContextType = {
    recipes: savedRecipeType[],
    setRecipes: (recipes:savedRecipeType[]) => void
}

export type preferredCategoryContextType = {
    preferredCategory: string | null,
    setPreferredCategory: (preferredCategory:string) => void
}