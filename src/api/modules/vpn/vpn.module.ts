import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VpnController } from './vpn.controller';
import { VpnService } from './vpn.service';
import { VpnRepository } from './vpn.repository';
import { AuthModule } from '../../auth/auth.module';
import { UsuarioRepository } from '../usuario/usuario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VpnRepository, UsuarioRepository]), AuthModule],
  controllers: [VpnController],
  providers: [VpnService]
})
export class VpnModule { }
