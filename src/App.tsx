import { useProducts } from './hooks/useProducts';
import { ProductCard } from './components/ProductCard';
import { SortSelect } from './components/SortSelect';
import { SearchInput } from './components/SearchInput';

function App() {
  const { products, loading, error, searchTerm, setSearchTerm } = useProducts();

  if (loading) return <div className="flex justify-center items-center h-screen text-blue-600 font-bold">Завантаження...</div>;

  return (
    <div className="w-full min-h-screen bg-white">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1">
        
        <header className="w-full mb-6 text-left">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            AQVEX <span className="text-blue-600">Store</span>
          </h1>
        </header>

        <div className="w-full mb-12 flex">
          <div className="ml-auto w-full md:w-[450px]">
            <SearchInput />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 items-center mb-8 pb-4 border-b border-gray-100">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            {products.length > 0 ? (
              <span>Знайдено {products.length} товарів</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
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
      </div>
    </div>
  );
}

export default App;