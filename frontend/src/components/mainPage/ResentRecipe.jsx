import React from 'react';

function RecentRecipe({ recipes }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4 border-b border-border-light dark:border-border-dark pb-2">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <span className="material-icons text-green-600">new_releases</span>
          따끈따끈한 레시피
        </h3>
        <a className="text-xs text-gray-500 hover:text-primary" href="#">더보기 &gt;</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {recipes.map((recipe, index) => (
          <div key={recipe.id} className={`bg-surface-light dark:bg-surface-dark rounded border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow ${index === 4 ? 'hidden lg:block' : ''}`}>
            <img alt={recipe.title} className="w-full h-24 object-cover" src={recipe.img} />
            <div className="p-2">
              <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1 mb-1">{recipe.title}</h5>
              <div className="flex justify-between items-center text-[10px] text-gray-500">
                <span>{recipe.chef}</span>
                <span>조회: {recipe.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentRecipe;