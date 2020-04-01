import { IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {

    @IsString()
    @MaxLength(100, { message: 'La Descripción del Rol Solo Puede Tener Maximo 100 Caracteres' })
    readonly description: string;

}