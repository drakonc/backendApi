import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { VpnRepository } from './vpn.repository';
import { UsuarioRepository } from '../usuario/usuario.repository'
import { CreateVpnDto, ReadVpnDto, UpdateVpnDto } from './dto';
import { Vpn } from './vpn.entity';
import { StatusType } from 'src/api/shared/Utils/status.type.enum';

@Injectable()
export class VpnService {

    constructor(
        @InjectRepository(VpnRepository) private readonly _vpnRepository: VpnRepository,
        @InjectRepository(UsuarioRepository) private readonly _usuarioRepositorio: UsuarioRepository
    ) { }

    async getAllVpns(): Promise<ReadVpnDto[]> {

        const vpns = await this._vpnRepository.createQueryBuilder('vpn')
            .select(['vpn.id', 'vpn.nombre', 'vpn.password', 'vpn.grupos', 'vpn.status', 'vpn.username'])
            .where('vpn.status = :status', { status: StatusType.ACTIVO })
            .orderBy('vpn.nombre', 'ASC')
            .getMany();

        return vpns.map((vpn: Vpn) => plainToClass(ReadVpnDto, vpn));

    }

    async getOneVpn(vpnId: number): Promise<ReadVpnDto> {

        const vpn = await this._vpnRepository.createQueryBuilder('vpn')
            .select(['vpn.id', 'vpn.nombre', 'vpn.password', 'vpn.grupos', 'vpn.status', 'vpn.username'])
            .where('vpn.id = :id', { id: vpnId })
            .andWhere('vpn.status = :status', { status: StatusType.ACTIVO })
            .getOne();

        if (!vpn) throw new NotFoundException('Vpn No Encontrada');

        return plainToClass(ReadVpnDto, vpn);

    }

    async createVpn(createVpnDto: CreateVpnDto): Promise<ReadVpnDto> {

        const { nombre, username } = createVpnDto;
        const vpn = new Vpn();

        const vpnExist = await this._vpnRepository.createQueryBuilder('vpn')
            .where('vpn.nombre = :nombre', { nombre })
            .getOne();

        if (vpnExist) throw new ConflictException('La Vpn que intenta crear ya Existen');

        const userExist = await this._usuarioRepositorio.createQueryBuilder('us')
            .where('us.username = :username', { username })
            .getOne();

        if (!userExist) throw new NotFoundException('El usuario que quiere crea la VPN no Existe');

        vpn.nombre = createVpnDto.nombre;
        vpn.password = createVpnDto.password;
        vpn.grupos = createVpnDto.grupos;
        vpn.username = createVpnDto.username;

        const saveVpn = await this._vpnRepository.save(vpn);

        if (!saveVpn) throw new ConflictException('No se Puede Crear la VPN');

        return plainToClass(ReadVpnDto, saveVpn)

    }

    async updateVpn(vpnId: number, updateVpnDto: UpdateVpnDto): Promise<ReadVpnDto> {

        const { password, grupos } = updateVpnDto;

        const vpnExist = await this._vpnRepository.createQueryBuilder('vpn')
            .where('vpn.id = :id', { id: vpnId })
            .getOne();

        if (!vpnExist) throw new NotFoundException('La Vpn No Existe');

        vpnExist.password = password;
        vpnExist.grupos = grupos;

        const updatevpn = await this._vpnRepository.save(vpnExist);

        return plainToClass(ReadVpnDto, updatevpn);

    }

    async deleteVpn(vpnId: number): Promise<ReadVpnDto> {

        const vpnExist = await this._vpnRepository.createQueryBuilder('vpn')
            .where('vpn.id = :id', { id: vpnId })
            .getOne();

        if (!vpnExist) throw new NotFoundException('La Vpn No Existe');

        vpnExist.status = StatusType.INACTIVO;

        const deletevpn = await this._vpnRepository.save(vpnExist);

        if (!deletevpn) throw new ConflictException('No se Puede Eliminar la VPN');

        return plainToClass(ReadVpnDto, deletevpn);

    }

}
