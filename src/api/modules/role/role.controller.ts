import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';
import { RoleType } from '../../shared/Utils/role.type.enum'
import { RoleService } from './role.service';
import { Roles } from './decorators/role.decorators';
import { RoleGuard } from './guards/role.guard';

@Controller('role')
export class RoleController {

    constructor(private readonly _roleService: RoleService) { }

    @Roles(RoleType.Administrador)
    @UseGuards(AuthGuard(), RoleGuard)
    @Get('/rolesActive')
    getAllRoleActive(): Promise<ReadRoleDto[]> {
        return this._roleService.getAllRoleActive();
    }

    @Roles(RoleType.Administrador)
    @UseGuards(AuthGuard(), RoleGuard)
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

    @Roles(RoleType.Administrador)
    @UseGuards(AuthGuard(), RoleGuard)
    @Post()
    createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
        return this._roleService.createRole(role);
    }

    @Roles(RoleType.Administrador)
    @UseGuards(AuthGuard(), RoleGuard)
    @Put(':roleId')
    updateRole(@Param('roleId', ParseIntPipe) roleId: number, @Body() role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
        return this._roleService.update(roleId, role);
    }

    @Roles(RoleType.Administrador)
    @UseGuards(AuthGuard(), RoleGuard)
    @Delete(':roleId')
    async deleteRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<Boolean> {
        await this._roleService.delete(roleId);
        return true;
    }
}
