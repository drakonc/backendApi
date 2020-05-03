import { IsString, MaxLength, IsNumber, IsEmail } from 'class-validator';

export class UpdateUsuarioDto {

    @IsString()
    @MaxLength(25, { message: 'El Nombre tiene que tener Maximo 25 Caracteres' })
    readonly nombre: string;

    @IsString()
    @MaxLength(25, { message: 'El Apellido tiene que tener Maximo 25 Caracteres' })
    readonly apellido: string;

    @IsString()
    readonly password: string;

    @IsNumber()
    readonly role: number;

} 