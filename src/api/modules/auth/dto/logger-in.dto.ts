import { IsString } from 'class-validator';
import { ReadeUsuarioDto } from '../../usuario/dto/read-usuario.dto';
import { Type, Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoggedInDto {

    @Expose()
    @IsString()
    token: string;

    @Expose()
    @Type(() => ReadeUsuarioDto)
    user: ReadeUsuarioDto;

}