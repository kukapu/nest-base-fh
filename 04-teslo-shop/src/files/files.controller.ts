import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Post('product')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: { fileSize: 3000 },
    storage: diskStorage({
      // destination: './static/uploads',
      destination: './static/products',
      // filename: this.filesService.modifyFilename,
      filename: fileNamer
    })
  }))
  uploadProdectImage(
    @UploadedFile() file: Express.Multer.File 
  ){
    if(!file) {
      throw new BadRequestException('Make sure file is an image')
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`
    return {
      // fileName: file.originalname
      secureUrl
    }
  }

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ){
    const path = this.filesService.getStaticProductImage(imageName)
    // res.status(403).json({ 
    //   ok: false,
    //   path  
    // })
    res.sendFile(path)
  }
}
