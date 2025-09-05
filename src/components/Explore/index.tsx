'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type categoryType = {
    strCategory:string,
    strCategoryThumb:string
}

const Explore = () => {
    const router = useRouter();
    const [category, setCategory] = useState<categoryType[] | null>([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
                const data = await response.json();

                setCategory(data.categories)

            } catch (error:any) {
                console.log(`Error: ${error}`)
            }
        }

        fetchCategories();
    }, [])

    const handleClick = (selectedCategory:string) => {
        router.push(`/explore/${selectedCategory.toLowerCase()}`) 
    }

    return (
        <div className="flex flex-col my-5">
            <div className="md:w-[50%] m-auto text-center">
                <div className="my-5">
                    <h4 className="bg-[#EE6352] inline-block text-sm text-[#F0EBE1] py-1 px-3 rounded-4xl">EXPLORE</h4>
                </div>
                <div className="my-3">
                    <h2 className="text-4xl font-extrabold">OUR DIVERSE PALETTE</h2>
                    <p className="my-3">If you are a breakfast enthusiast, a connoisseur of savory delights, or on the lookout for irresistible desserts, our curated selection has something to satisfy every palate.</p>
                </div>
            </div>
            <div>
                { category !== null &&
                    <div className="flex flex-row flex-wrap gap-5 justify-center">
                        {
                            category.map((item, index) => 
                                <div 
                                    key={index}
                                    onClick={() => handleClick(item.strCategory)}
                                    className="hover:bg-[#d9d4ca] w-[40%] md:w-[30%] main-border flex flex-col justify-center items-center"
                                >
                                    <img src={item.strCategoryThumb} alt={item.strCategory} className="m-3 w-[80%] h-auto"/>
                                    <h2 className="font-bold cursor-pointer text-sm uppercase my-4">{item.strCategory}</h2>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Explore;