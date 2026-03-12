import { useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { CaretLeft, CaretRight } from './Icons';

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
            className={`cursor-pointer w-[46px] h-[46px] rounded-[15px] text-[#182A42] text-[16px] font-bold text-sm transition-all duration-200 ${
              currentPage === i
                ? ' font-bold  border-[1.5px] border-[#43A0FD]'
                : ' border border-transparent'
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
    <div className="flex justify-center items-center gap-[12px] mt-16 py-8 border-t border-gray-100">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className=" text-gray-400  disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <CaretLeft />
      </button>

      <div className="flex items-center gap-1 ">
        {pageButtons}
      </div>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className=" disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <CaretRight />
      </button>
    </div>
  );
};