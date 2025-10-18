import { ProductSlideshow } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/products/slug/${slug}`,
      { cache: 'no-store' }
    );

    if (!res.ok) throw new Error('Error al cargar producto');
    return await res.json();
  } catch (error) {
    console.error('❌ Error al obtener producto:', error);
    return null;
  }
}


export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      
      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">
        <ProductSlideshow 
          title={product.title}
          images={product.images}
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm mt-6">Descripción</h3>
        <p className="font-light">{product.description}</p>

      </div>
    </div>
  );
}
