'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store';

export function CartRedirectOnEmpty() {
  const router = useRouter();
  const totalItemsInCart = useCartStore(s => s.getTotalItems());

  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  useEffect(() => {
    if (!loaded) return;          // espera montado en cliente
    if (totalItemsInCart === 0) {
      router.replace('/empty');   // redirige si quedó vacío
    }
  }, [loaded, totalItemsInCart, router]);

  return null;
}
