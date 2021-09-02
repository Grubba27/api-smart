import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (await this.verificarCategoria(criarCategoriaDto)) {
      throw new BadRequestException(
        `cat ${criarCategoriaDto.categoria} já existe`,
      );
    } else {
      const novaCategoria = new this.categoriaModel(criarCategoriaDto);
      return await novaCategoria.save();
    }
  }

  async atualizarCategoria(criarCategoriaDto: CriarCategoriaDto) {
    const categoriaEncontrada = await this.verificarCategoria(
      criarCategoriaDto,
    );
    if (categoriaEncontrada) {
      if (!(categoriaEncontrada instanceof BadRequestException)) {
        await this.categoriaModel
          .findOneAndUpdate(
            { id: categoriaEncontrada.id },
            { $set: criarCategoriaDto },
          )
          .exec();
      }
    } else {
      throw new BadRequestException(
        `cat ${criarCategoriaDto.categoria} não existe`,
      );
    }
  }

  async consultaCategorias() {
    return await this.categoriaModel.find().exec();
  }

  async consultarCategoriaEspecifica(_id: string) {
    return await this.verificarCategoria(_id, 'id');
  }

  async verificarCategoria(
    criarCategoriaDto: CriarCategoriaDto | any,
    _param = 'cat',
  ) {
    switch (_param) {
      case 'cat':
        const { categoria } = criarCategoriaDto;
        return await this.categoriaModel
          .findOne({ categoria: categoria })
          .exec();
      case 'id':
        return await this.categoriaModel
          .findOne({ id: criarCategoriaDto })
          .exec();
      default:
        return new BadRequestException(`${_param} não é parametro valido`);
    }
  }

  async deletarCategoria(_id: string) {
    const categoriaEncontrada = await this.verificarCategoria(_id, 'id');
    if (categoriaEncontrada) {
      return await this.categoriaModel.deleteOne({ id: _id }).exec();
    } else {
      throw new NotFoundException(`${_id} não existe em categorias `);
    }
  }
}
