import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '../../config/config.service';
import { Configuration } from '../../config/config.key';
import { AuthRepository } from '../auth.repository';
import { IJwtPayload } from '../jwt-payload.interface';
import { StatusType } from '../../shared/Utils/status.type.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly _confgService: ConfigService, @InjectRepository(AuthRepository) private readonly _authRepository: AuthRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _confgService.get(Configuration.JWT_SECRET)
        });
    }

    async validate(payload: IJwtPayload) {
        const { username } = payload;
        const user = await this._authRepository.findOne({ where: { username, status: StatusType.ACTIVO } })

        if (!user) throw new UnauthorizedException();

        return payload;
    }
}