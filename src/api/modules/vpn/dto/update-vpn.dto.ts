import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateVpnDto {

    @IsString()
    @MaxLength(30, { message: 'La Contraseña tiene que tener Maximo 30 Caracteres' })
    password: string;

    @IsString()
    grupos: string;
}