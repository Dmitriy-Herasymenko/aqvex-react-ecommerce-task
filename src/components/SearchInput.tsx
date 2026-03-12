import { useProducts } from '../hooks/useProducts';
import { Search } from './Icons';

export const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useProducts();

  return (
    <div className="max-w-[453px] flex items-center gap-4 bg-[#F6F7F9]  px-[18px] py-[12px] text-[18px]  rounded-[12px] bg-[#F6F7F9]">
      <Search />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Поиск..."
        className=" w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
      />


      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 font-[400]"
        >
          <Search />
        </button>
      )}
    </div>
  );
};