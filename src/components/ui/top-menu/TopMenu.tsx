'use client';

import { titleFont } from '@/config/fonts';
import { useCartStore, useUIStore } from '@/store';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

interface Category {
  id: string;
  slug: string;
  name: string;
}

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setLoaded(true);
    // Traer categorías dinámicamente
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/categories`);
        const data = await res.json();
        setCategories(data.data || data.categories || []); // depende de tu estructura
      } catch (error) {
        console.error('❌ Error cargando categorías:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Ecommerce</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Link
              key={cat.id}
              className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
              href={`/category/${cat.slug}`}
            >
              {cat.name}
            </Link>
          ))
        ) : (
          <span className="text-gray-400 text-sm">Cargando...</span>
        )}
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-3">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link
          href={loaded && totalItemsInCart === 0 ? '/empty' : '/cart'}
          className="mx-3"
        >
          <div className="relative">
            {loaded && totalItemsInCart > 0 && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
