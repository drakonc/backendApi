import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { RoleRepository } from './role.repository';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { Role } from './role.entity';
import { StatusType } from '../../shared/Utils/status.type.enum';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';


@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleRepository) private readonly _roleRepository: RoleRepository,
        @InjectRepository(UsuarioRepository) private readonly _usuarioRepositorio: UsuarioRepository,
    ) { }

    async getAllRoleActive(): Promise<ReadRoleDto[]> {
        const roles: Role[] = await this._roleRepository.find({ where: { status: StatusType.ACTIVO } });
        return roles.map((role: Role) => plainToClass(ReadRoleDto, role))
    }

    async getAllRoleInactive(): Promise<ReadRoleDto[]> {
        const roles: Role[] = await this._roleRepository.find({ where: { status: StatusType.INACTIVO } });
        return roles.map((role: Role) => plainToClass(ReadRoleDto, role))
    }


    async getAllRole(): Promise<ReadRoleDto[]> {
        const roles: Role[] = await this._roleRepository.find();
        return roles.map((role: Role) => plainToClass(ReadRoleDto, role))
    }

    async getRole(roleId: number): Promise<ReadRoleDto> {
        if (!roleId) throw new BadRequestException('No Fue enviado ningun ID de rol');
        const role: Role = await this._roleRepository.findOne(roleId, { where: { status: StatusType.ACTIVO } });
        if (!role) throw new NotFoundException('El Rol no Fue Encontrado')
        return plainToClass(ReadRoleDto, role)
    }

    async createRole(role: Partial<CreateRoleDto>) {
        if (!role) throw new BadRequestException('El Rol a Crear no fue Enviado')
        const roleExist: Role = await this._roleRepository.findOne({ where: { name: role.name } });
        if (roleExist) throw new BadRequestException(`El Rol ${role.name} ya Existe`)
        const saveRole: Role = await this._roleRepository.save(role);
        return plainToClass(ReadRoleDto, saveRole);
    }

    async update(roleId: number, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
        const foundRole: Role = await this._roleRepository.findOne(roleId, { where: { status: StatusType.ACTIVO } });
        if (!foundRole) throw new NotFoundException('No Fue enviado ningun ID de rol');
        foundRole.description = role.description;
        const updateRole: Role = await this._roleRepository.save(foundRole);
        return plainToClass(ReadRoleDto, updateRole);
    }

    async delete(id: number): Promise<void> {

        const usuario = await this._usuarioRepositorio
            .createQueryBuilder('us')
            .select(['us.id', 'us.nombre', 'us.apellido', 'us.correo', 'us.username', 'us.status', 'us.password'])
            .addSelect(['ro.id', 'ro.name', 'ro.description', 'ro.status'])
            .innerJoin('us.role', 'ro', 'us.role = ro.id')
            .where('ro.id = :id', { id: id })
            .andWhere('us.status = :status', { status: StatusType.ACTIVO })
            .getOne();

        if (usuario) throw new ConflictException('No se Puede Eliminar ya que hay usuarios con el Rol asignados');

        const roleExist: Role = await this._roleRepository.findOne(id, { where: { status: StatusType.ACTIVO } });
        if (!roleExist) throw new NotFoundException('No Fue enviado ningun ID de rol');
        await this._roleRepository.update(id, { status: StatusType.INACTIVO });
    }

}