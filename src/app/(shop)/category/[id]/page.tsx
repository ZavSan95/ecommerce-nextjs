import { ProductGrid, Title } from '@/components';
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProductsByCategory(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/products?category=${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Error al obtener productos por categoría');
    notFound();
  }

  const response = await res.json();
  const products = response.data || response.products || [];

  return products;
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params; // ✅ ahora esperamos la Promise

  const products = await getProductsByCategory(id);

  if (products.length === 0) {
    notFound();
  }

  return (
    <>
      <Title 
        title="Tienda"
        subtitle={`Productos en ${id.charAt(0).toUpperCase() + id.slice(1)}`}
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}
