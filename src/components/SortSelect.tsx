import { useProducts } from '../hooks/useProducts';
import { type SortOption } from '../context/ProductContext';

export const SortSelect = () => {
  const { sortOption, setSortOption } = useProducts();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
        Сортувати за:
      </span>
      <div className="relative">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="h-10 pl-4 pr-10 text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
        >
          <option value="popular">Популярністю</option>
          <option value="newest">Новинками</option>
          <option value="price-low">Найдешевшими</option>
          <option value="price-high">Найдорожчими</option>
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};