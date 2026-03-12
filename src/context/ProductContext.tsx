import { createContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { fetchProducts } from '../api/products';
import type { Product } from '../types';

export type SortOption = 'popular' | 'newest' | 'price-low' | 'price-high';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await fetchProducts();
        setProducts(res.data.products);
      } catch (err) {
        setError('Не вдалося завантажити товари');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption]);

  const { paginatedProducts, totalPages } = useMemo(() => {
    let items = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedItems = [...items].sort((a, b) => {
      switch (sortOption) {
        case 'popular':
          return b.reviews_count !== a.reviews_count 
            ? b.reviews_count - a.reviews_count 
            : b.rating - a.rating;
        case 'newest':
          return Number(b.id) - Number(a.id);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    const total = Math.ceil(sortedItems.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = sortedItems.slice(start, start + itemsPerPage);

    return { paginatedProducts: paginated, totalPages: total };
  }, [products, sortOption, searchTerm, currentPage]);

  return (
    <ProductContext.Provider
      value={{
        products: paginatedProducts,
        loading,
        error,
        sortOption,
        setSortOption,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};