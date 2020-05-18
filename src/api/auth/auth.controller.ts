import { Controller, Post, UsePipes, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, LoggedInDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly _authService: AuthService) { }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signin(@Body() signinDto: SigninDto): Promise<LoggedInDto> {
        return this._authService.signin(signinDto)
    }

}
