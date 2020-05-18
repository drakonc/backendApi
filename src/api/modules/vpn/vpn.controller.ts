import { Controller, Post, UsePipes, ValidationPipe, Body, Get, ParseIntPipe, Param, Put, Delete } from '@nestjs/common';
import { CreateVpnDto, ReadVpnDto, UpdateVpnDto } from './dto'
import { VpnService } from './vpn.service';
import { Vpn } from './vpn.entity';


@Controller('vpn')
export class VpnController {

    constructor(private readonly _vpnService: VpnService) { }

    @Get()
    getAllVpn(): Promise<ReadVpnDto[]> {
        return this._vpnService.getAllVpns();
    }

    @Get(':vpnId')
    getOneVpn(@Param('vpnId', ParseIntPipe) vpnId: number): Promise<ReadVpnDto> {
        return this._vpnService.getOneVpn(vpnId);
    }

    @Post('/crearVpn')
    @UsePipes(ValidationPipe)
    crearVpn(@Body() vpn: CreateVpnDto): Promise<ReadVpnDto> {
        return this._vpnService.createVpn(vpn);
    }

    @Put('/updateVpn/:vpnId')
    @UsePipes(ValidationPipe)
    updateVpn(@Param('vpnId', ParseIntPipe) vpnId: number, @Body() vpn: UpdateVpnDto): Promise<ReadVpnDto> {
        return this._vpnService.updateVpn(vpnId, vpn);
    }

    @Delete('deleteVpn/:vpnId')
    @UsePipes(ValidationPipe)
    deleteVpn(@Param('vpnId', ParseIntPipe) vpnId: number) {
        return this._vpnService.deleteVpn(vpnId);
    }

}
