import { BadRequestException, Injectable } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriaInterface } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private categoriaModel: Model<CategoriaInterface>,
  ) {}

  async criarCategoria(criarCategoriaDto: CriarCategoriaDto) {
    if (this.verificarCategoria(criarCategoriaDto)) {
      throw new BadRequestException(
        `cat ${criarCategoriaDto.categoria} já existe`,
      );
    }
  }

  async verificarCategoria(criarCategoriaDto: CriarCategoriaDto) {
    const { categoria } = criarCategoriaDto;
    return await this.categoriaModel.findOne({ categoria: categoria }).exec();
  }
}
