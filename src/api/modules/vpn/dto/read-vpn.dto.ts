import { IsString, IsNumber, IsDate } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadVpnDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsString()
    readonly nombre: string;

    @Expose()
    @IsString()
    readonly password: string;

    @Expose()
    @IsString()
    readonly grupos: string;

    @Expose()
    @IsString()
    readonly username: string;

    @Expose()
    @IsDate()
    readonly createAt: Date;

}