
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { SigninDto, LoggedInDto } from './dto';
import { Usuario } from '../usuario/usuario.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { StatusType } from "../../shared/Utils/status.type.enum";

@Injectable()
export class AuthService {

    constructor(@InjectRepository(AuthRepository) private readonly _authRepository: AuthRepository, private readonly _jwtService: JwtService) { }

    async signin(signinDto: SigninDto): Promise<LoggedInDto> {

        const { username, password } = signinDto;

        const user: Usuario = await this._authRepository
            .createQueryBuilder('us')
            .select(['us.id', 'us.nombre', 'us.apellido', 'us.correo', 'us.username', 'us.status', 'us.password'])
            .addSelect(['ro.id', 'ro.name', 'ro.description', 'ro.status'])
            .innerJoin('us.role', 'ro', 'us.role = ro.id')
            .where('us.username = :username', { username })
            .andWhere('us.status = :status', { status: StatusType.ACTIVO })
            .getOne();

        if (!user) throw new NotFoundException('Usuario No Existe');

        const isMatch = await compare(password, user.password);

        if (!isMatch) throw new UnauthorizedException('Contraseña Invalida')
        console.log('compara clave ', isMatch);
        const payload: IJwtPayload = {
            id: user.id,
            email: user.correo,
            username: user.username,
            role: user.role,
        }

        const token = this._jwtService.sign(payload);

        return plainToClass(LoggedInDto, { token, user });

    }
}
