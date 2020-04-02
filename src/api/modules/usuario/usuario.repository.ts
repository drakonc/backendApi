import { Repository, EntityRepository, getConnection } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { NotFoundException } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> { }