import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Accord',
    },
    {
      id: uuid(),
      brand: 'Ford',
      model: 'Fusion',
    },
  ];
  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar = { id: uuid(), ...createCarDto };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    // Esta validacion estaria de mas porque ya lo hace el DTO ya que no encuentra el id
    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new NotFoundException(`Car with id ${id} in body is not valid`);
    }
    this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...car,
          ...updateCarDto,
          id,
        };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const carDB = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return carDB;
    // Sino retornamos nada devuelve un undefined por defecto para no dar error
  }
}
