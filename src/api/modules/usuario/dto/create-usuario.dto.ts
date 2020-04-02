import { IsString, MaxLength, IsNumber, IsEmail } from 'class-validator';

export class CreateUsuarioDto {

    @IsString()
    @MaxLength(25, { message: 'El Nombre tiene que tener Maximo 25 Caracteres' })
    readonly nombre: string;

    @IsString()
    @MaxLength(25, { message: 'El Apellido tiene que tener Maximo 25 Caracteres' })
    readonly apellido: string;

    @IsString()
    @MaxLength(25, { message: 'El Username tiene que tener Maximo 25 Caracteres' })
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsEmail({}, { message: 'Correo Invalido' })
    readonly correo: string;

    @IsNumber()
    readonly role: number;

} 