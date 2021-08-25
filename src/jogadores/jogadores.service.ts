import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}
  async criarAtualizarJogador(jogadorDto: CriarJogadorDto) {
    const jogadorEncontrado = await this.verificarJogador(jogadorDto.email);
    if (jogadorEncontrado) {
      await this.atualizar(jogadorEncontrado, jogadorDto);
    } else {
      await this.criar(jogadorDto);
    }
  }

  private async criar(jogadorDto: CriarJogadorDto) {
    const jogadorCriado = new this.jogadorModel(jogadorDto);
    return await jogadorCriado.save();
  }

  private async atualizar(
    jogadorEncontrado: Jogador,
    jogadorDto: CriarJogadorDto,
  ) {
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: jogadorEncontrado.email },
        { $set: jogadorDto },
      )
      .exec();
  }

  async consultaJogadores() {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogador(email: string) {
    const res = await this.verificarJogador(email);
    if (res) {
      return res;
    } else {
      throw new NotFoundException(`Jogador de ${email} não cadastrado`);
    }
  }

  async deletarJogador(email: string) {
    return await this.jogadorModel.deleteOne({ email: email }).exec();
  }

  async verificarJogador(email: string) {
    return this.jogadorModel.findOne({ email: email }).exec();
  }
}
