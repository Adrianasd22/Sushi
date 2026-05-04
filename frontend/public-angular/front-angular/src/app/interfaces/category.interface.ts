import { Product } from "./product.interface";

export interface Category { 
    id: number;
    name: string;
}

export interface CategoryWithProducts { 
    id: number;
    name: string;
    products: Product[];
}