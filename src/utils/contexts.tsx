'use client';

import { createContext, useContext, useState } from "react";
import { preferredCategoryContextType, savedRecipeContextType, savedRecipeType, UserContextType, userType } from "./types";

const UserContext =  createContext<UserContextType | null>(null);

export const UserContextProvider = (
    { children } : { children: React.ReactNode}
) => {

    const [user, setUser] = useState<userType | null>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}

const SavedRecipes = createContext<savedRecipeContextType| null>(null);

export const SavedRecipesContextProvider = (
    { children } : { children: React.ReactNode}
) => {

    const [recipes, setRecipes] = useState<savedRecipeType[]>([]);

    return (
        <SavedRecipes.Provider value={{recipes, setRecipes}}>
            {children}
        </SavedRecipes.Provider>
    )
}

export const useSavedRecipeContext = () => {
    return useContext(SavedRecipes)
}

const favoriteCategory = createContext<preferredCategoryContextType| null>(null);

export const FavoriteCategoryContextProvider = (
    { children } : { children: React.ReactNode}
) => {

    const [preferredCategory, setPreferredCategory] = useState<string | null>(null);

    return (
        <favoriteCategory.Provider value={{preferredCategory, setPreferredCategory}}>
            {children}
        </favoriteCategory.Provider>
    )
}

export const useFavoriteCategoryContext = () => {
    return useContext(favoriteCategory)
}
