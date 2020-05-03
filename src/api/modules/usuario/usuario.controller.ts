import { Controller, Post, UsePipes, ValidationPipe, Body, Get, ParseIntPipe, Param, Put, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, ReadeUsuarioDto, UpdateUsuarioDto } from './dto';
import { Usuario } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly _usuarioService: UsuarioService) { }

    @Get()
    getAllUsersActive(): Promise<ReadeUsuarioDto[]> {
        return this._usuarioService.getAllUsersActive();
    }

    @Get(':usuarioId')
    getOneUserActive(@Param('usuarioId', ParseIntPipe) usuarioId: number): Promise<Usuario> {
        return this._usuarioService.getOneUserActive(usuarioId);
    }

    @Post('/crearUsuario')
    @UsePipes(ValidationPipe)
    crearUsuario(@Body() usuario: CreateUsuarioDto): Promise<Usuario> {
        return this._usuarioService.crearUsuario(usuario);
    }

    @Put('updateUsuario/:usuarioId')
    @UsePipes(ValidationPipe)
    updateUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number, @Body() usuario: UpdateUsuarioDto): Promise<Usuario> {
        return this._usuarioService.updateUsuario(usuarioId, usuario);
    }

    @Delete('deleteUsuario/:usuarioId')
    @UsePipes(ValidationPipe)
    deleteUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
        return this._usuarioService.deleteUsuario(usuarioId);
    }

}
