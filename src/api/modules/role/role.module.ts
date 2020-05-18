import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { AuthModule } from '../../auth/auth.module';
import { UsuarioRepository } from '../usuario/usuario.repository';


@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository, UsuarioRepository]), AuthModule],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule { }
