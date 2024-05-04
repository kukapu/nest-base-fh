import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntities } from './entities';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    // Aquí importamos el módulo TypeOrmModule que hemos creado en el archivo products.module.ts
    TypeOrmModule.forFeature([...ProductEntities]),
  ],
  exports: [
    ProductsService,
    TypeOrmModule,
  ]
})
export class ProductsModule {}
