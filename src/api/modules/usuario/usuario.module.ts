import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UsuarioRepository } from './usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from '../role/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRepository, RoleRepository])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule { }
