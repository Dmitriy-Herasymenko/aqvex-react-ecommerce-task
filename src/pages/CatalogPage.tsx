import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { SortSelect } from '../components/SortSelect';
import { SearchInput } from '../components/SearchInput';
import { Pagination } from '../components/Pagination';
import { ProductSkeleton } from '../components/ProductSkeleton';

export const CatalogPage = () => {
  const { products, loading, searchTerm, setSearchTerm } = useProducts();

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(12)].map((_, i) => <ProductSkeleton key={i} />)}
    </div>
  );

  return (
    <>
      <div className="w-full mb-[20px] flex">
        <div className="ml-auto w-full md:w-[450px]">
          <SearchInput />
        </div>
      </div>

      <div className="w-full grid grid-cols-2 items-center mb-[20px]">
        <div className="text-[16px] font-500">
          {products.length > 0 ? (
            <span className='text-[#8090A4]'>{products.length} товаров</span>
          ) : (
            <span className="text-red-500">Нічого не знайдено</span>
          )}
        </div>
        <div className="justify-self-end">
          <SortSelect />
        </div>
      </div>

      <div className="w-full min-h-[500px]">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-[60px] justify-items-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-32 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
            <div className="bg-white p-6 rounded-full shadow-md mb-6">
              <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">За запитом "{searchTerm}" порожньо</h2>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
            >
              Показати всі товари
            </button>
          </div>
        )}
      </div>

      <Pagination />
    </>
  );
};