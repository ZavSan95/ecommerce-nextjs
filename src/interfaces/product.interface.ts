export interface Category {
  id: string;
  slug: string;
  name: string;
  parentId?: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  price: number;
  stock: number;
  images: string[];
  active: boolean;
  categoryId?: string | null;
  category?: Category | null;
  createdAt: string;
  updatedAt: string;
}
