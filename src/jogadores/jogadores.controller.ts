import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { JogadoresService } from "./jogadores.service";

@Controller("api/v1/jogadores")
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {
  }

  @Post()
  async criarAtualizarJogador(@Body() jogador: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizarJogador(jogador);
  }

  @Get()
  async consultaJogadores(@Query('email') email: string) {
    if (email){
      return this.jogadoresService.consultarJogador(email);
    } else {
      return this.jogadoresService.consultaJogadores();
    }
  }

  @Delete()
  async deletarJogador(@Query('email') email: string) {
    await this.jogadoresService.deletarJogador(email);
  }
}
