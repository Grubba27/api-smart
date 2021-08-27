import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipe/jogadores-validacao-parametros.pipe';
import { AtualizarJogadorDto } from "./dtos/atualizar-jogador.dto";

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarAtualizarJogador(@Body() jogador: CriarJogadorDto) {
    return await this.jogadoresService.criarJogador(jogador);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async AtualizarJogador(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
    @Body() jogador: AtualizarJogadorDto,
  ) {
    return await this.jogadoresService.atualizarJogador(jogador, _id);
  }

  @Get()
  async consultaJogadores() {
    return this.jogadoresService.consultaJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPorId(@Param('_id') _id: string) {
    return this.jogadoresService.consultarJogador(_id);
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ) {
    await this.jogadoresService.deletarJogador(_id);
  }
}
