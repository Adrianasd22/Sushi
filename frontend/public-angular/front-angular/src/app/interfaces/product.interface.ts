import { Allergen } from "./allergen.interface";


export interface Product { 
    id: number;
    name: string;
    description: string;
    price: number;
    allergens: string[];
    // allergens: Allergen[];
}

