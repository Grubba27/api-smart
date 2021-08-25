import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from "./dtos/atualizar-jogador.dto";

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async atualizarJogador(jogadorDto: AtualizarJogadorDto, _id: string) {
    const jogadorEncontrado = await this.verificarJogador(_id);
    if (jogadorEncontrado) {
      await this.atualizar(jogadorEncontrado, jogadorDto);
    } else {
      throw new BadRequestException(
        `Jogador com o ${_id} não encontrado`
      )
    }
  }

  async criarJogador(jogadorDto: CriarJogadorDto) {
    const jogadorEncontrado = await this.verificarJogador(
      jogadorDto.email,
      'email',
    );
    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com o ${jogadorDto.email} já existe`,
      );
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
    jogadorDto: AtualizarJogadorDto,
  ) {
    return await this.jogadorModel
      .findOneAndUpdate({ id: jogadorEncontrado.id }, { $set: jogadorDto })
      .exec();
  }

  async consultaJogadores() {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogador(id: string) {
    const res = await this.verificarJogador(id);
    if (res) {
      return res;
    } else {
      throw new NotFoundException(`Jogador de ${id} não cadastrado`);
    }
  }

  async deletarJogador(_id: string) {
    const jogadorVerificado = this.verificarJogador(_id);
    if (jogadorVerificado) {
      return await this.jogadorModel.deleteOne({ id: _id }).exec();
    } else {
      throw new NotFoundException(`Jogador de ${_id} não cadastrado`);
    }
  }

  async verificarJogador(filter: string, _param = 'id') {
    switch (_param) {
      case 'id':
        return this.jogadorModel.findOne({ id: filter }).exec();
      default:
        return this.jogadorModel.findOne({ email: filter }).exec();
    }
  }
}
