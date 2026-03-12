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
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [sortOption, setSortOption] = useState<SortOption>('popular');

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

const sortedProducts = useMemo(() => {
  const items = [...products];

  switch (sortOption) {
    case 'popular':
      return items.sort((a, b) => {
        if (b.reviews_count !== a.reviews_count) {
          return b.reviews_count - a.reviews_count;
        }
        return b.rating - a.rating;
      });

    case 'newest':
      return items.sort((a, b) => Number(b.id) - Number(a.id));

    case 'price-low':
      return items.sort((a, b) => a.price - b.price);

    case 'price-high':
      return items.sort((a, b) => b.price - a.price);

    default:
      return items;
  }
}, [products, sortOption]);

  return (
    <ProductContext.Provider 
      value={{ 
        products: sortedProducts, 
        loading, 
        error, 
        sortOption, 
        setSortOption 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};