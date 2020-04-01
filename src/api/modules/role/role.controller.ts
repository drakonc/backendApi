import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';
import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
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
    createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
        return this._roleService.createRole(role);
    }

    @Put(':roleId')
    updateRole(@Param('roleId', ParseIntPipe) roleId: number, @Body() role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
        return this._roleService.update(roleId, role);
    }

    @Delete(':roleId')
    async deleteRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<Boolean> {
        await this._roleService.delete(roleId);
        return true;
    }
}
