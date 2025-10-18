'use client';

import { Product } from "@/interfaces";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

  const [displayImage, setDisplayImage] = useState(product.images?.[0] || '/no-image.png');

  // Si las imágenes son URLs completas, las usamos tal cual
  const imageSrc = (src: string) =>
    src.startsWith('http') ? src : `/products/${src}`;

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={imageSrc(displayImage)}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          loading="lazy"
          onMouseEnter={() => product.images?.[1] && setDisplayImage(product.images[1])}
          onMouseLeave={() => product.images?.[0] && setDisplayImage(product.images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-600 font-medium">
          {product.title}
        </Link>

        {product.category && (
          <span className="text-sm text-gray-500">{product.category.name}</span>
        )}

        <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};
