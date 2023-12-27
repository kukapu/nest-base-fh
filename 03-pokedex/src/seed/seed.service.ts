import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    
    private readonly http: AxiosAdapter,
  ) { }


  async executeSeed() {

    await this.pokemonModel.deleteMany({}) // delete * from pokemon ALL

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800')

    // const insertPromisesArray: any[] = []
    const pokemonToInsert: { name: string, no: number }[] = []

    data.results.forEach( async ({ name, url }) => {

      const segments = url.split('/')
      const no: number = +segments[segments.length - 2]

      // // const pokemon = await this.pokemonModel.create({name, no})
      // insertPromisesArray.push( this.pokemonModel.create({name, no}) )
      pokemonToInsert.push({ name, no }) // insert into pokemons (name, no) values (name, no)(name, no)(name, no)
    })

    // await Promise.all( insertPromisesArray )
    await this.pokemonModel.insertMany( pokemonToInsert ) // ESTA ES LA MAS EFICIENTE PORQUE ES UNA UNICA INSERCION

    return 'Seed executed'
  }

}
