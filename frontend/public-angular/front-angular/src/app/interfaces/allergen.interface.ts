
export interface Allergen { 
    id: number;
    name: string;
    code: AllergenCode;
    // icon: string;
}

export type AllergenCode =
  | 'GLUTEN'
  | 'CRUSTACEOS'
  | 'HUEVOS'
  | 'PESCADO'
  | 'CACAHUETES'
  | 'SOJA'
  | 'LACTEOS'
  | 'FRUTOS_SECOS'
  | 'APIO'
  | 'MOSTAZA'
  | 'SESAMO'
  | 'SULFITOS'
  | 'ALTRAMUCES'
  | 'MOLUSCOS';
