import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { CategoriasService } from './categorias.service';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
    await this.categoriasService.criarCategoria(criarCategoriaDto);
  }

  @Get()
  async consultarCategorias() {
    await this.categoriasService.consultaCategorias();
  }

  @Get('/:_id')
  async consultarCategoriaPorId(@Param('_id') _id: string) {
    return this.categoriasService.consultarCategoriaEspecifica(_id);
  }
}
