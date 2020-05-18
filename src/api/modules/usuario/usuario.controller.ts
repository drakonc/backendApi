import { Controller, Post, UsePipes, ValidationPipe, Body, Get, ParseIntPipe, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, ReadeUsuarioDto, UpdateUsuarioDto } from './dto';
import { Usuario } from './usuario.entity';
import { RoleGuard } from '../role/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleType } from '../../shared/Utils/role.type.enum';
import { Roles } from '../role/decorators/role.decorators';

@Controller('usuario')
@UseGuards(AuthGuard(), RoleGuard)
export class UsuarioController {

    constructor(private readonly _usuarioService: UsuarioService) { }

    @Get()
    @Roles(RoleType.Administrador)
    getAllUsersActive(): Promise<ReadeUsuarioDto[]> {
        return this._usuarioService.getAllUsersActive();
    }

    @Get(':usuarioId')
    @Roles(RoleType.Administrador)
    getOneUserActive(@Param('usuarioId', ParseIntPipe) usuarioId: number): Promise<Usuario> {
        return this._usuarioService.getOneUserActive(usuarioId);
    }

    @Post('/crearUsuario')
    @UsePipes(ValidationPipe)
    @Roles(RoleType.Administrador)
    crearUsuario(@Body() usuario: CreateUsuarioDto): Promise<Usuario> {
        return this._usuarioService.crearUsuario(usuario);
    }

    @Put('updateUsuario/:usuarioId')
    @UsePipes(ValidationPipe)
    @Roles(RoleType.Administrador)
    updateUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number, @Body() usuario: UpdateUsuarioDto): Promise<Usuario> {
        return this._usuarioService.updateUsuario(usuarioId, usuario);
    }

    @Delete('deleteUsuario/:usuarioId')
    @UsePipes(ValidationPipe)
    @Roles(RoleType.Administrador)
    deleteUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
        return this._usuarioService.deleteUsuario(usuarioId);
    }

}
