import { Controller, Post, UsePipes, ValidationPipe, Body, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, ReadeUsuarioDto } from './dto';
import { Usuario } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly _usuarioService: UsuarioService) { }

    @Get()
    getAllUsersActive(): Promise<ReadeUsuarioDto[]> {
        return this._usuarioService.getAllUsersActive();
    }

    @Post('/crearUsuario')
    @UsePipes(ValidationPipe)
    crearUsuario(@Body() usuario: CreateUsuarioDto): Promise<Usuario> {
        return this._usuarioService.crearUsuario(usuario);
    }
}
