import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';
import { RoleType } from '../../shared/Utils/role.type.enum'
import { RoleService } from './role.service';
import { Roles } from './decorators/role.decorators';
import { RoleGuard } from './guards/role.guard';

@Controller('role')
@UseGuards(AuthGuard(), RoleGuard)
export class RoleController {

    constructor(private readonly _roleService: RoleService) { }

    @Get('/rolesActive')
    getAllRoleActive(): Promise<ReadRoleDto[]> {
        return this._roleService.getAllRoleActive();
    }

    @Get('/rolesInactive')
    getAllRoleInactive(): Promise<ReadRoleDto[]> {
        return this._roleService.getAllRoleInactive();
    }

    @Get()
    getAllRole(): Promise<ReadRoleDto[]> {
        return this._roleService.getAllRole();
    }

    @Get(':roleId')
    getRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<ReadRoleDto> {
        return this._roleService.getRole(roleId);
    }

    @Post()
    @Roles(RoleType.Administrador)
    createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
        return this._roleService.createRole(role);
    }

    @Put(':roleId')
    @Roles(RoleType.Administrador)
    updateRole(@Param('roleId', ParseIntPipe) roleId: number, @Body() role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
        return this._roleService.update(roleId, role);
    }

    @Delete(':roleId')
    @Roles(RoleType.Administrador)
    async deleteRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<Boolean> {
        await this._roleService.delete(roleId);
        return true;
    }
}
