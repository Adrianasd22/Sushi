import { Allergen } from "./allergen.interface";


export interface Product { 
    id: number;
    name: string;
    price: number;
    allergens: string[];
    // allergens: Allergen[];
}

