'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import Link from "next/link";

export const ProductsInCart = () => {

  const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
  const removeProduct = useCartStore(state => state.removeProductFromCart);
  const productsInCart = useCartStore(state => state.cart);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={product.id} className="flex mb-5">
          
          <Image
            src={product.image}   // ✅ usa la URL completa
            width={100}
            height={100}
            style={{ width: "100px", height: "100px" }}
            alt={product.title}
            className="mr-5 rounded object-cover"
          />

          <div>
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              <p>{product.title}</p>
            </Link>

            <p className="font-semibold">${product.price}</p>

            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
            />

            <button
              className="underline mt-3 cursor-pointer text-red-600 hover:text-red-800"
              onClick={() => removeProduct(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
