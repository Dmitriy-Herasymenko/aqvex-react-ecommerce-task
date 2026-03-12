import { useProducts } from '../hooks/useProducts';
import { type SortOption } from '../context/ProductContext';
import { Sort } from './Icons';

export const SortSelect = () => {
  const { sortOption, setSortOption } = useProducts();

  const togglePriceSort = () => {
    if (sortOption === 'price-low') {
      setSortOption('price-high');
    } else {
      setSortOption('price-low');
    }
  };

  return (
    <div className="flex items-center gap-[10px]">
      <button
        onClick={togglePriceSort}
        className={`p-1 rounded-md transition-colors cursor-pointer ${sortOption.includes('price') ? 'text-blue-500' : 'text-gray-500'
          }`}
        title="Сортувати за ціною"
      >
        <div className={`transition-transform duration-300 ${sortOption === 'price-high' ? 'rotate-180' : ''}`}>
          <Sort />
        </div>
      </button>

      <div className="relative">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="text-sm font-medium pr-2 bg-white cursor-pointer focus:outline-none"
        >
          <option value="popular">За популярністю</option>
          <option value="newest">За новинками</option>
          <option value="price-low">Від дешевих до дорогих</option>
          <option value="price-high">Від дорогих до дешевих</option>
        </select>
      </div>
    </div>
  );
};