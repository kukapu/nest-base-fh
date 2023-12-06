import { Car } from "src/cars/interfaces/car.interface";
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
  { 
    id: uuid(),
    brand: 'Ford',
    model: 'Fiesta'
  },
  { 
    id: uuid(),
    brand: 'Chevrolet',
    model: 'Camaro'
  },
  { 
    id: uuid(),
    brand: 'Honda',
    model: 'Civic'
  },
  { 
    id: uuid(),
    brand: 'Nissan',
    model: 'Sentra'
  },
  { 
    id: uuid(),
    brand: 'BMW',
    model: '3 Series'
  },
  { 
    id: uuid(),
    brand: 'Audi',
    model: 'A4'
  },
  { 
    id: uuid(),
    brand: 'Mercedes-Benz',
    model: 'C-Class'
  },
  { 
    id: uuid(),
    brand: 'Volkswagen',
    model: 'Golf'
  },
  { 
    id: uuid(),
    brand: 'Hyundai',
    model: 'Elantra'
  },
  { 
    id: uuid(),
    brand: 'Kia',
    model: 'Forte'
  },
  { 
    id: uuid(),
    brand: 'Mazda',
    model: '3'
  },
  { 
    id: uuid(),
    brand: 'Subaru',
    model: 'Impreza'
  },
  { 
    id: uuid(),
    brand: 'Tesla',
    model: 'Model 3'
  },
  { 
    id: uuid(),
    brand: 'Lexus',
    model: 'IS'
  },
  { 
    id: uuid(),
    brand: 'Dodge',
    model: 'Charger'
  },
  { 
    id: uuid(),
    brand: 'Jeep',
    model: 'Wrangler'
  },
  { 
    id: uuid(),
    brand: 'Porsche',
    model: '911'
  },
  { 
    id: uuid(),
    brand: 'Fiat',
    model: '500'
  },
  { 
    id: uuid(),
    brand: 'Alfa Romeo',
    model: 'Giulia'
  },
  { 
    id: uuid(),
    brand: 'Jaguar',
    model: 'XE'
  }


]