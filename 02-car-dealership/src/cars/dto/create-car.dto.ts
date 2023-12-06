import { IsString, MinLength } from 'class-validator';

export class CreateCarDto {
  // Podemos personalizar los mensajes de error
  @IsString({ message: 'Brand must be a string' })
  readonly brand: string;

  @IsString()
  @MinLength(3)
  readonly model: string;
}
