import { IsString, MaxLength } from 'class-validator';

export class UpdatePasswdDto {

    @IsString()
    @MaxLength(25, { message: 'El Usuario tiene que tener Maximo 25 Caracteres' })
    usuario: string;

    @IsString()
    @MaxLength(25, { message: 'La Contraseña tiene que tener Maximo 25 Caracteres' })
    password: string;

    @IsString()
    @MaxLength(250, { message: 'El Servidor tiene que tener Maximo 250 Caracteres' })
    descripcion: string;

}