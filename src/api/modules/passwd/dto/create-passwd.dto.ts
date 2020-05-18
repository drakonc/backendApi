import { IsString, MaxLength } from 'class-validator';

export class CreatePasswdDto {

    @IsString()
    @MaxLength(50, { message: 'El Servidor tiene que tener Maximo 50 Caracteres' })
    server: string;

    @IsString()
    @MaxLength(25, { message: 'El Usuario tiene que tener Maximo 25 Caracteres' })
    usuario: string;

    @IsString()
    @MaxLength(25, { message: 'La Contraseña tiene que tener Maximo 25 Caracteres' })
    password: string;

    @IsString()
    @MaxLength(250, { message: 'El Servidor tiene que tener Maximo 250 Caracteres' })
    descripcion: string;

    @IsString()
    @MaxLength(25, { message: 'El username tiene que tener Maximo 25 Caracteres' })
    username: string;

}