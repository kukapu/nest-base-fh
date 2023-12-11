import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // console.log({ value, metadata}) // Puedes usar metadata para evaluar

    if( !isValidObjectId( value ) ){
      throw new BadRequestException(`"${ value }" is not a valid Mongo DB id`)
    }
    // return value.toLocaleUpperCase(); 
    // En el back lo recibimos tal cual y es al devolver al front donde transformamos
    return value
  }
}
