
import { initialData } from '@/seed/seed';
import { Title } from '../../components/ui/title/Title';
import { ProductGrid } from '@/components';


async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Error al cargar productos');

  const response = await res.json();
  console.log('🧩 Productos recibidos desde API:', response);

  // Aquí el array real está en response.data
  return response.data;
}

(async () => {
  const products = await getProducts();
  console.log('📦 Lista final de productos:', products);
})();

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
