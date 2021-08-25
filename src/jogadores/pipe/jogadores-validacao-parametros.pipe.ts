import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class JogadoresValidacaoParametrosPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value) {
      throw new BadRequestException(`${metadata.data} é requerido`);
    }
  }
}
