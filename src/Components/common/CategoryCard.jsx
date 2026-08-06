import React from 'react'

const CategoryCard = ({item}) => {
  return (
     <div className="group relative overflow-hidden rounded-xl border border-gray-700 bg-[#111] cursor-pointer">

      <img
        src={item.image}
        alt={item.title}
        className="h-52   w-full object-fit transition duration-500 group-hover:scale-105"
      />

      <div className="absolute mt-4 inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

      <h2 className="absolute ml-29  top-1 left-5 text-2xl font-bold uppercase text-white tracking-wide">
        {item.title}
      </h2>

    </div>
  )
}

export default CategoryCard
