import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswdRepository } from './passwd.repository';
import { ReadPasswdDto, CreatePasswdDto, UpdatePasswdDto } from './dto';
import { StatusType } from '../../shared/Utils/status.type.enum';
import { plainToClass } from 'class-transformer';
import { Passwd } from './passwd.entity';
import { UsuarioRepository } from '../usuario/usuario.repository';

@Injectable()
export class PasswdService {

    constructor(
        @InjectRepository(PasswdRepository) private readonly _passwdRepository: PasswdRepository,
        @InjectRepository(UsuarioRepository) private readonly _usuarioRepositorio: UsuarioRepository
    ) { }

    async getAllPasswd(): Promise<ReadPasswdDto[]> {

        const passwds = await this._passwdRepository.createQueryBuilder('pwd')
            .select(['pwd.id', 'pwd.server', 'pwd.usuario', 'pwd.password', 'pwd.descripcion', 'pwd.username'])
            .where('pwd.status = :status', { status: StatusType.ACTIVO })
            .orderBy('pwd.server', 'DESC')
            .getMany();

        return passwds.map((passwd: Passwd) => plainToClass(ReadPasswdDto, passwd));
    }

    async getOnePasswd(passwdId: number): Promise<ReadPasswdDto> {

        const passwd = await this._passwdRepository.createQueryBuilder('pwd')
            .select(['pwd.id', 'pwd.server', 'pwd.usuario', 'pwd.password', 'pwd.descripcion', 'pwd.username'])
            .where('pwd.status = :status', { status: StatusType.ACTIVO })
            .andWhere('pwd.id = :id', { id: passwdId })
            .getOne();

        if (!passwd) throw new NotFoundException('Credenciales No Encontradas');

        return plainToClass(ReadPasswdDto, passwd)

    }

    async createPasswd(createPasswdDto: CreatePasswdDto): Promise<ReadPasswdDto> {

        const { username } = createPasswdDto;
        const passwd = new Passwd();

        const userExiste = await this._usuarioRepositorio.createQueryBuilder('us')
            .where('us.username = :username', { username })
            .getOne();

        if (!userExiste) throw new NotFoundException('El usuario que quiere crea la Contraseña no Existe');

        passwd.server = createPasswdDto.server;
        passwd.usuario = createPasswdDto.usuario;
        passwd.password = createPasswdDto.password;
        passwd.descripcion = createPasswdDto.descripcion
        passwd.username = createPasswdDto.username;

        const savepasswd = await this._passwdRepository.save(passwd);

        if (!savepasswd) throw new ConflictException('No se Pudo Crear la Contraseña');

        return plainToClass(ReadPasswdDto, savepasswd);

    }

    async uppdatePasswd(passwdId: number, updatePasswdDto: UpdatePasswdDto): Promise<ReadPasswdDto> {

        const { usuario, password, descripcion } = updatePasswdDto;

        const passwdExist = await this._passwdRepository.createQueryBuilder('psw')
            .where('psw.id = :id', { id: passwdId })
            .getOne();

        if (!passwdExist) throw new NotFoundException('Credenciales no encontradas');

        passwdExist.usuario = usuario;
        passwdExist.password = password;
        passwdExist.descripcion = descripcion;

        const updatepasswsd = await this._passwdRepository.save(passwdExist);

        if (!updatepasswsd) throw new ConflictException('No se Pudo Actualizar las Credenciales');

        return plainToClass(ReadPasswdDto, updatepasswsd);

    }

    async deletePasswd(passwdId: number): Promise<ReadPasswdDto> {

        const passwdExist = await this._passwdRepository.createQueryBuilder('psw')
            .where('psw.id = :id', { id: passwdId })
            .getOne();


        if (!passwdExist) throw new NotFoundException('Las Credenciales No Existe');

        passwdExist.status = StatusType.INACTIVO;

        const deletepasswd = await this._passwdRepository.save(passwdExist);

        if (!deletepasswd) throw new ConflictException('No se Puede Eliminar las Credenciales');

        return plainToClass(ReadPasswdDto, deletepasswd);

    }

}
