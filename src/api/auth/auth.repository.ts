import { Usuario } from '../modules/usuario/usuario.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Usuario)
export class AuthRepository extends Repository<Usuario>{

}