import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarCategoria(
    @Param('_id') _id: string,
    @Body() categoria: CriarCategoriaDto,
  ) {
    return await this.categoriasService.atualizarCategoria(categoria);
  }

  @Get()
  @UsePipes(ValidationPipe)
  async consultarCategorias() {
    await this.categoriasService.consultaCategorias();
  }

  @Get('/:_id')
  @UsePipes(ValidationPipe)
  async consultarCategoriaPorId(@Param('_id') _id: string) {
    return this.categoriasService.consultarCategoriaEspecifica(_id);
  }

  @Delete('/:_id')
  async deletarCategoria(@Param('_id') _id: string) {
    await this.categoriasService.deletarCategoria(_id);
  }
}
