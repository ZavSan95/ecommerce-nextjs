'use client';

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useMemo, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  // solo leemos cart del store
  const cart = useCartStore(s => s.cart);

  // derivamos los valores SIN llamar al selector que devuelve objeto
  const { subTotal, tax, total, ItemsInCart } = useMemo(() => {
    const subTotal = cart.reduce((acc, p) => acc + p.quantity * p.price, 0);
    const tax = 0; // o tu cálculo real
    const total = subTotal + tax;
    const ItemsInCart = cart.reduce((acc, p) => acc + p.quantity, 0);
    return { subTotal, tax, total, ItemsInCart };
  }, [cart]);

  useEffect(() => { setLoaded(true); }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{ItemsInCart}</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
