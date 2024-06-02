import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor (
    private productService: ProductsService,
    @InjectRepository( User )
    private readonly userRepository: Repository<User>
  ){}

  async runSeed() {
    await this.deleteTables()
    const user = await this._insertNewUsers()
    await this._insertNewProdcuts(user)
    return 'SEED EJECUTED'
  }

  private async deleteTables() {
    await this.productService.deleteAllProducts()

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()
  }

  private async _insertNewUsers() {
    const seedUsers = initialData.users;

    const users: User[] = []
    seedUsers.forEach( seedUser => {
      seedUser.password = bcrypt.hashSync( seedUser.password, 10 )
      users.push( this.userRepository.create( seedUser ) )
    })

    const dbUsers = await this.userRepository.save( users )
    return dbUsers[0]
  }

  private async _insertNewProdcuts( user: User ) {
    await this.productService.deleteAllProducts()
    const products = initialData.products

    const insertPromises = []

    products.forEach( product => {
      insertPromises.push(this.productService.create( product, user ))
    })

    await Promise.all( insertPromises )
    
    return true
  }
}

