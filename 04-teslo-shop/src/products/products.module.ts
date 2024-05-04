import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    // Aquí importamos el módulo TypeOrmModule que hemos creado en el archivo products.module.ts
    TypeOrmModule.forFeature([Product, ProductImage]),
  ],
})
export class ProductsModule {}
