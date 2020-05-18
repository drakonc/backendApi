import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class SigninDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(2, { message: 'El Nombre de Usuario tiene que tener Minimo 2 Caracteres' })
    @MaxLength(25, { message: 'El Nombre de Usuario tiene que tener Maximo 25 Caracteres' })
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2, { message: 'La Contraseña tiene que tener Minico 2 Caracteres' })
    password: string;
}