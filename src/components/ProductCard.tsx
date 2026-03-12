import { useState } from 'react';
import type { Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { HighlightedText } from './HighlightedText';

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
        <div className="group relative flex flex-col w-full max-w-[347px] p-4 bg-white border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative flex items-center justify-center w-full mb-4 overflow-hidden rounded-md aspect-square bg-gray-50">
                {!imgError ? (
                    <img
                        src={`https://ip-194-99-21-145-139178.vps.hosted-by-mvps.net/storage/${product.image}`}
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

            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xl font-bold text-gray-900">
                    {product.price} <span className="text-sm font-medium">{product.currency}</span>
                </span>

                {product.old_price > product.price && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 line-through">
                            {product.old_price} {product.currency}
                        </span>
                        {product.discount_percent > 0 && (
                            <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                -{product.discount_percent}%
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1">
                <h3 className="mb-4 text-sm font-semibold leading-tight text-gray-900">
                    <HighlightedText text={product.name} highlight={searchTerm} />
                </h3>

                <div className="flex flex-col mt-auto">
                    <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}>
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="text-[11px] text-gray-500 ml-2">({product.reviews_count})</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                            {isAvailable ? (
                                <>
                                    <div className="flex items-center justify-center w-4 h-4 bg-green-100 rounded-full">
                                        <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-tight">
                                        В наявності
                                    </span>
                                </>
                            ) : (
                                <span className="text-[10px] font-bold text-red-400 uppercase tracking-tight">
                                    Немає в наявності
                                </span>
                            )}
                        </div>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                            {product.category}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        {hasVolumes && (
                            <div className="relative flex-1">
                                <select
                                    value={selectedVolume}
                                    onChange={(e) => setSelectedVolume(e.target.value)}
                                    className="w-full h-10 pl-3 pr-8 text-xs font-medium text-black border border-gray-200 rounded-md appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                >
                                    {product.volumes.map((v) => (
                                        <option key={v.id} value={v.id}>
                                            {v.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 pointer-events-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => alert(`Додано: ${product.name}\nОб'єм: ${selectedVolume || 'стандарт'}`)}
                            disabled={!isAvailable}
                            className={`h-10 rounded-md transition-all active:scale-95 flex items-center justify-center gap-2 font-semibold text-sm shrink-0
                ${hasVolumes ? 'px-4' : 'w-full'} 
                ${isAvailable
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                                    : 'bg-[#E8F4FF] text-blue-400 cursor-not-allowed'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {!hasVolumes && <span>Додати в кошик</span>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};