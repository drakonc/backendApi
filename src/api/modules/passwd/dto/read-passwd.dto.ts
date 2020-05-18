import { IsString, IsNumber, IsDate } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class ReadPasswdDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsString()
    readonly server: string;

    @Expose()
    @IsString()
    readonly usuario: string;

    @Expose()
    @IsString()
    readonly password: string;

    @Expose()
    @IsString()
    readonly descripcion: string;

    @Expose()
    @IsString()
    readonly username: string;
}