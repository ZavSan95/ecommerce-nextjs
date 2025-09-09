import { initialData } from '@/seed/seed';
import { ProductGrid, Title } from '@/components';
import { notFound } from "next/navigation";
import { Category } from '@/interfaces';

interface Props {
  params: Promise<{id: Category}>
}

export default async function ({ params }: Props) {

  const products = initialData.products;

  const { id } = await params;

  const labels: Record<Category, string> = {
    'men' : 'Hombres',
    'women' : 'Mujeres',
    'kid' : 'Niños',
    'unisex' : 'Todos'
  }

  // Filtrar los productos por el gender recibido en la URL
  const filteredProducts = products.filter(product => product.gender === id);

  // Si no hay productos para ese id, mostrar 404
  if (filteredProducts.length === 0) {
    notFound();
  }

  return (
    <>
      <Title 
        title='Tienda'
        subtitle={`Productos para ${labels[id]}`}
        className='mb-2'    
      />

      <ProductGrid products={filteredProducts}/>
    </>
  );
}