export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: any;
  images: string[];
  quantity?: number;
  variants?: Variant[];
}

export interface Variant {
  size?: string;
  color?: string;
}