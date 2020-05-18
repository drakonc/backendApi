import { Controller, Post, UsePipes, ValidationPipe, Body, Get, ParseIntPipe, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CreatePasswdDto, ReadPasswdDto, UpdatePasswdDto } from './dto'
import { AuthGuard } from '@nestjs/passport';
import { PasswdService } from './passwd.service';
import { Roles } from '../role/decorators/role.decorators';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../../shared/Utils/role.type.enum';

@Controller('passwd')
@UseGuards(AuthGuard(), RoleGuard)
export class PasswdController {

    constructor(private readonly _passwdService: PasswdService) { }

    @Get()
    @Roles(RoleType.Administrador, RoleType.Tecnico)
    getAllPasswd(): Promise<ReadPasswdDto[]> {
        return this._passwdService.getAllPasswd();
    }

    @Get(':passwdId')
    @Roles(RoleType.Administrador, RoleType.Tecnico)
    getOnePasswd(@Param('passwdId', ParseIntPipe) passwdId: number): Promise<ReadPasswdDto> {
        return this._passwdService.getOnePasswd(passwdId);
    }

    @Post('/createPasswd')
    @Roles(RoleType.Administrador, RoleType.Tecnico)
    createPasswd(@Body() passwd: CreatePasswdDto): Promise<ReadPasswdDto> {
        return this._passwdService.createPasswd(passwd);
    }

    @Put('/updatePasswd/:passwdId')
    @Roles(RoleType.Administrador, RoleType.Tecnico)
    updtaePasswd(@Param('passwdId', ParseIntPipe) passwdId: number, @Body() passwd: CreatePasswdDto): Promise<ReadPasswdDto> {
        return this._passwdService.uppdatePasswd(passwdId, passwd);
    }

    @Delete('/deletePasswd/:passwdId')
    @Roles(RoleType.Administrador, RoleType.Tecnico)
    deleteVpn(@Param('passwdId', ParseIntPipe) passwdId: number): Promise<ReadPasswdDto> {
        return this._passwdService.deletePasswd(passwdId);
    }

}
