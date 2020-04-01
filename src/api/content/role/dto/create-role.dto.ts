import { IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {

    @IsString()
    @MaxLength(20, { message: 'El Nombre del Rol Solo Puede Tener 20 Caracteres Maximo' })
    readonly name: string;

    @IsString()
    @MaxLength(100, { message: 'La Descripción del Rol Solo Puede Tener Maximo 100 Caracteres' })
    readonly description: string;
}