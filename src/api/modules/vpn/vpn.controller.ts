import { Controller, Post, UsePipes, ValidationPipe, Body, Get, ParseIntPipe, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CreateVpnDto, ReadVpnDto, UpdateVpnDto } from './dto'
import { VpnService } from './vpn.service';
import { Roles } from '../role/decorators/role.decorators';
import { RoleGuard } from '../role/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleType } from '../../shared/Utils/role.type.enum';


@Controller('vpn')
@UseGuards(AuthGuard(), RoleGuard)
export class VpnController {

    constructor(private readonly _vpnService: VpnService) { }

    @Get()
    @Roles(RoleType.Administrador, RoleType.Tecnico)
    getAllVpn(): Promise<ReadVpnDto[]> {
        return this._vpnService.getAllVpns();
    }

    @Get(':vpnId')
    @Roles(RoleType.Administrador, RoleType.Tecnico)
    getOneVpn(@Param('vpnId', ParseIntPipe) vpnId: number): Promise<ReadVpnDto> {
        return this._vpnService.getOneVpn(vpnId);
    }

    @Post('/crearVpn')
    @UsePipes(ValidationPipe)
    @Roles(RoleType.Administrador)
    crearVpn(@Body() vpn: CreateVpnDto): Promise<ReadVpnDto> {
        return this._vpnService.createVpn(vpn);
    }

    @Put('/updateVpn/:vpnId')
    @UsePipes(ValidationPipe)
    @Roles(RoleType.Administrador)
    updateVpn(@Param('vpnId', ParseIntPipe) vpnId: number, @Body() vpn: UpdateVpnDto): Promise<ReadVpnDto> {
        return this._vpnService.updateVpn(vpnId, vpn);
    }

    @Delete('/deleteVpn/:vpnId')
    @UsePipes(ValidationPipe)
    @Roles(RoleType.Administrador)
    deleteVpn(@Param('vpnId', ParseIntPipe) vpnId: number) {
        return this._vpnService.deleteVpn(vpnId);
    }

}
