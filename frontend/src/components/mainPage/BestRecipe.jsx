import React from 'react';

function BestRecipe({ recipes }) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 border-b border-border-light dark:border-border-dark pb-2">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <span className="material-icons text-secondary">favorite</span>
          오늘의 베스트 요리
        </h3>
        <a className="text-xs text-gray-500 hover:text-primary" href="#">더보기 &gt;</a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recipes.map((recipe, index) => (
          <div key={recipe.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg aspect-square mb-2 bg-gray-200">
              <img alt={recipe.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" src={recipe.img} />
              <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">{index + 1}</span>
            </div>
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-2 mb-1 group-hover:underline">{recipe.title}</h4>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{recipe.chef}</span>
              <span className="flex items-center gap-0.5 text-red-400"><span className="material-icons text-[10px]">favorite</span> {recipe.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BestRecipe;