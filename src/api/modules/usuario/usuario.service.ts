import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateUsuarioDto, ReadeUsuarioDto, UpdateUsuarioDto } from './dto';
import { UsuarioRepository } from './usuario.repository';
import { Usuario } from './usuario.entity';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { genSalt, hash, compare } from 'bcryptjs';
import { StatusType } from '../../shared/Utils/status.type.enum';


@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioRepository) private readonly _usuarioRepositorio: UsuarioRepository,
        @InjectRepository(RoleRepository) private readonly _roleRepositorio: RoleRepository
    ) { }

    async getAllUsersActive() {

        const usuarios = await this._usuarioRepositorio
            .createQueryBuilder('us')
            .select(['us.id', 'us.nombre', 'us.apellido', 'us.correo', 'us.username', 'us.status', 'us.password'])
            .addSelect(['ro.id', 'ro.name', 'ro.description', 'ro.status'])
            .innerJoin('us.role', 'ro', 'us.role = ro.id')
            .where('us.status = :status', { status: StatusType.ACTIVO })
            .orderBy('us.id', 'ASC')
            .getMany();

        return usuarios.map((user: Usuario) => plainToClass(ReadeUsuarioDto, user));
    }

    async getOneUserActive(usuarioId: number): Promise<Usuario> {

        const usuario = await this._usuarioRepositorio
            .createQueryBuilder('us')
            .select(['us.id', 'us.nombre', 'us.apellido', 'us.correo', 'us.username', 'us.status', 'us.password'])
            .addSelect(['ro.id', 'ro.name', 'ro.description', 'ro.status'])
            .innerJoin('us.role', 'ro', 'us.role = ro.id')
            .where('us.id = :id', { id: usuarioId })
            .andWhere('us.status = :status', { status: StatusType.ACTIVO })
            .getOne();

        if (!usuario) throw new NotFoundException('Usuario No Encontrado');

        return usuario;
    }

    async crearUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        const { username, correo, password, role } = createUsuarioDto;
        const usuario = new Usuario();
        const salt = await genSalt(10);

        const userExists = await this._usuarioRepositorio.createQueryBuilder('us')
            .where('us.username = :username', { username })
            .orWhere('us.correo = :correo', { correo })
            .getOne();

        if (userExists) throw new ConflictException('El Username o el Correo Electronico ya Existen');

        const existRole: Role = await this._roleRepositorio.findOne(role);
        if (!existRole) throw new NotFoundException('El Role no Existe');

        usuario.nombre = createUsuarioDto.nombre;
        usuario.apellido = createUsuarioDto.apellido;
        usuario.correo = createUsuarioDto.correo;
        usuario.username = createUsuarioDto.username;
        usuario.password = await hash(password, salt);
        usuario.role = existRole;

        const saveUsuario = await this._usuarioRepositorio.save(usuario);

        if (!saveUsuario) throw new ConflictException('No se Puede Crear el Usuario');

        return saveUsuario
    }

    async updateUsuario(usuarioId: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
        const { nombre, apellido, password, role } = updateUsuarioDto;

        const userExists = await this._usuarioRepositorio
            .createQueryBuilder('us')
            .select(['us.id', 'us.nombre', 'us.apellido', 'us.correo', 'us.username', 'us.status', 'us.password'])
            .addSelect(['ro.id', 'ro.name', 'ro.description', 'ro.status'])
            .innerJoin('us.role', 'ro', 'us.role = ro.id')
            .where('us.id = :id', { id: usuarioId })
            .andWhere('us.status = :status', { status: StatusType.ACTIVO })
            .getOne();

        if (!userExists) throw new NotFoundException('El Username Seleccionado no Existe');

        const existRole: Role = await this._roleRepositorio.findOne(role);
        if (!existRole) throw new NotFoundException('El Role no Existe');

        userExists.nombre = nombre;
        userExists.apellido = apellido;
        userExists.role = existRole;

        const isMatch = await compare(password, userExists.password);

        if (!isMatch) {
            const salt = await genSalt(10);
            userExists.password = await hash(password, salt);
        }

        const updateUsuario = await this._usuarioRepositorio.save(userExists);
        if (!updateUsuario) throw new ConflictException('No se Puede Actualizar el Usuario');

        return updateUsuario;

    }

    async deleteUsuario(usuarioId: number) {

        const userExists = await this._usuarioRepositorio
            .createQueryBuilder('us')
            .select(['us.id', 'us.nombre', 'us.apellido', 'us.correo', 'us.username', 'us.status', 'us.password'])
            .addSelect(['ro.id', 'ro.name', 'ro.description', 'ro.status'])
            .innerJoin('us.role', 'ro', 'us.role = ro.id')
            .where('us.id = :id', { id: usuarioId })
            .andWhere('us.status = :status', { status: StatusType.ACTIVO })
            .getOne();

        if (!userExists) throw new ConflictException('El Username Seleccionado no Existe');

        userExists.status = StatusType.INACTIVO;

        const deleteUsuario = await this._usuarioRepositorio.save(userExists);

        if (!deleteUsuario) throw new ConflictException('No se Puede Eliminar el Usuario');

        return deleteUsuario;

    }

}
