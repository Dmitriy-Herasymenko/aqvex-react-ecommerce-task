import { useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';

export const Pagination = () => {
  const { currentPage, setCurrentPage, totalPages } = useProducts();

  if (totalPages <= 1) return null;

  const pageButtons = useMemo(() => {
    const pages = [];
    const siblingCount = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - siblingCount && i <= currentPage + siblingCount)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`cursor-pointer w-10 h-10 rounded-lg font-bold text-sm transition-all duration-200 ${
              currentPage === i
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110'
                : 'text-gray-500 hover:bg-gray-100 border border-transparent'
            }`}
          >
            {i}
          </button>
        );
      } else if (
        i === currentPage - siblingCount - 1 || 
        i === currentPage + siblingCount + 1
      ) {
        pages.push(
          <span key={`dots-${i}`} className="px-1 text-gray-400 font-bold select-none">
            ...
          </span>
        );
      }
    }
    return pages;
  }, [currentPage, totalPages, setCurrentPage]); 

  return (
    <div className="flex justify-center items-center gap-2 mt-16 py-8 border-t border-gray-100">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex items-center gap-1 ">
        {pageButtons}
      </div>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};