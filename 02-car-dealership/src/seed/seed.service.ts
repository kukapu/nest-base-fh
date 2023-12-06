import { CARS_SEED } from './data/cars.seed';
import { Injectable } from '@nestjs/common';
import { BRANDS_SEED } from './data/brands.seed';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) { }
  
  populateDB () {
    this.carsService.fillCarsWithSeed(CARS_SEED);
    this.brandsService.fillBrandsWithSeed(BRANDS_SEED);
    return 'Database populated';
  }
}
