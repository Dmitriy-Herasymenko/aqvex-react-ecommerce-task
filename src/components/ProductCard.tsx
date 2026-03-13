import { useState } from 'react';
import type { Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { HighlightedText } from './HighlightedText';
import { Checked, Drop, Basket } from './Icons';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const [selectedVolume, setSelectedVolume] = useState(product.selected_volume_id);
    const [imgError, setImgError] = useState(false);

    const currentVolumeData = product.volumes?.find((v) => v.id === selectedVolume);
    const hasVolumes = product.volumes && product.volumes.length > 0;
    const isAvailable = hasVolumes ? currentVolumeData?.in_stock : product.in_stock;

    const { searchTerm } = useProducts();
    return (
        <div className="group relative flex flex-col w-full max-w-[347px] bg-white rounded-[16px]">
            <div className="relative flex items-center justify-center w-full mb-[19px] overflow-hidden rounded-md aspect-square bg-gray-50">
                {!imgError ? (
                    <img
                        src={`${product?.image}`}
                        alt={product.name}
                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-300">
                        <svg className="w-12 h-12 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            <div className="flex items-baseline gap-2 mb-[32px]">

                {product.old_price > product.price && (
                    <div className="flex items-center gap-2">
                        <span className="text-[22px] text-[#8090A4] line-through decoration-[#FF2741]">
                            {product.old_price} {product.currency} 
                        </span>

                    </div>
                )}
                <span className="text-[22px] text-[#2288ED] text-transparent bg-clip-text bg-gradient-to-r from-[#003181] to-[#2288ED]">
                    {product.price} <span className="">{product.currency}</span>
                </span>
                {product.discount_percent > 0 && (
                    <div className="bg-red-500 text-white text-[14px] font-bold px-3 py-0.5 [clip-path:polygon(12px_0%,100%_0%,100%_100%,12px_100%,0%_50%)] rounded-[5px]">
                        · {product.discount_percent}%
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1">
                <h3 className="mb-[16px] text-[18px] font-400 leading-[1.4]">
                    <HighlightedText text={product.name} highlight={searchTerm} /> 
                </h3>

                <div className="flex flex-col mt-auto">
                    <div className="flex items-center mb-[32px] gap-[8px]">
                        <div className="flex text-[#43A0FD] text-[12px]">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 '}>
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="text-[14px] font-normal underline decoration-[#CFD8DC] underline-offset-4 decoration-1">{product.reviews_count}</span>
                    </div>

                    <div className="flex items-center justify-between mb-[32px]">
                        <div className="flex items-center gap-1">
                            {isAvailable ? (
                                <>
                                    <div className="flex items-center gap-[14px] justify-center w-4 h-4 bg-green-100 rounded-full">
                                        <Checked />
                                    </div>

                                    <span className="text-[14px] font-normal">
                                        В наявності
                                    </span>
                                    <Drop />

                                </>
                            ) : (
                                <>
                                 <div className="flex items-center gap-[14px] justify-center w-4 h-4 bg-green-100 rounded-full">
                                    
                                    </div>
                                    <span className="text-[10px] font-normal text-red-400 uppercase tracking-tight">
                                    Немає в наявності
                                </span>
                                  <Drop />
                                </>
                                
                            )}
                            <p className="text-[14px]  font-normal text-[#8090A4]">
                                {product.category} 
                            </p>
                        </div>

                    </div>

                    <div className="flex gap-2 w-full">
                        {hasVolumes && (
                            <div className="relative w-[90px] shrink-0">
                                <select
                                    value={selectedVolume}
                                    onChange={(e) => setSelectedVolume(e.target.value)}
                                    className="w-full h-10 py-[1px] px-[20px] text-[11px]  border border-[#EBEBEB] rounded-[15px] appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
                                >
                                    {product.volumes.map((v) => (
                                        <option key={v.id} value={v.id}>
                                            {v.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-400">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        <button
                            disabled={!isAvailable}
                            className={`h-10 flex-1 gap-[4px] rounded-[15px] transition-all active:scale-95 flex items-center justify-center text-[18px]  cursor-pointer py-[16px] px-[27px]
            ${isAvailable
                                    ? 'bg-[#E8F4FF] hover:bg-[#43A0FD] hover:text-white shadow-sm'
                                    : 'bg-[#F5F5F5] text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <Basket />
                            <span >{hasVolumes ? 'В корзину' : 'Додати в кошик'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};