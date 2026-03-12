import { useProducts } from './hooks/useProducts';
import { ProductCard } from './components/ProductCard';
import { SortSelect } from './components/SortSelect';

function App() {
  const { products, loading, error } = useProducts();

  if (loading) return (
    <div className="flex justify-center items-center h-screen font-bold text-xl text-blue-600">
      Завантаження...
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-500 font-bold">
      {error}
    </div>
  );

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-22 ">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">AQVEX</h1>
      </header>
      <div className='mb-3 flex justify-between items-center'>
        <div>{products.length + 1} товаров</div>
        <SortSelect />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">

        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;