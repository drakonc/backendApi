import { IsString, IsEmail, IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadRoleDto } from '../../role/dto';

@Exclude()
export class ReadeUsuarioDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsString()
    readonly nombre: string;

    @Expose()
    @IsString()
    readonly apellido: string;

    @Expose()
    @IsEmail()
    readonly correo: string;

    @Expose()
    @IsString()
    readonly username: string;

    @Expose()
    @IsString()
    readonly status: string;

    @Expose()
    @Type(type => ReadRoleDto)
    readonly role: ReadRoleDto;

} 