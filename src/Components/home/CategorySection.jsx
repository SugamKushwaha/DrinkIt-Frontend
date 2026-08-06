import React from 'react'
import categoryData from "../../data/categories";
import CategoryCard from "../common/CategoryCard";

const CategorySection = () => {
  return (
    <section className="bg-black py-14">

      <div className="max-w-[1450px] mx-auto">

        <div className="flex items-center justify-center gap-5 mb-10">

          <div className="w-16 h-[2px] bg-yellow-500"></div>

          <h2 className="text-white text-4xl font-bold uppercase">
            Shop By Category
          </h2>

          <div className="w-16 h-[2px] bg-yellow-500"></div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categoryData.map((item) => (
            <CategoryCard
              key={item.id}
              item={item}
            />
          ))}

        </div>

      </div>

    </section>
  )
}

export default CategorySection
