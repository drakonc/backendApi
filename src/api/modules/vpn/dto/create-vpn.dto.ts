import { IsString, MaxLength } from 'class-validator';

export class CreateVpnDto {

    @IsString()
    @MaxLength(25, { message: 'El Nombre tiene que tener Maximo 25 Caracteres' })
    nombre: string;

    @IsString()
    @MaxLength(30, { message: 'La Contraseña tiene que tener Maximo 30 Caracteres' })
    password: string;

    @IsString()
    grupos: string;

    @IsString()
    @MaxLength(25, { message: 'El Grupo tiene que tener Maximo 250 Caracteres' })
    username: string;
}