export interface Product {
  id: string;
  category: string;
  description: string;
  title: string;
  price: string;
  featured: boolean;
  imageURLs: string[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}
