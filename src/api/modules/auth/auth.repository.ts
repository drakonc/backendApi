import { Usuario } from '../usuario/usuario.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Usuario)
export class AuthRepository extends Repository<Usuario>{

}