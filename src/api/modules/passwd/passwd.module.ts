import { Module } from '@nestjs/common';
import { PasswdController } from './passwd.controller';
import { PasswdService } from './passwd.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswdRepository } from './passwd.repository';
import { AuthModule } from '../auth/auth.module';
import { UsuarioRepository } from '../usuario/usuario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PasswdRepository, UsuarioRepository]), AuthModule],
  controllers: [PasswdController],
  providers: [PasswdService]
})
export class PasswdModule { }
