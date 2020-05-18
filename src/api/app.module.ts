import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { Configuration } from './config/config.key';
import { ConfigService } from './config/config.service';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { VpnModule } from './modules/vpn/vpn.module';
import { PasswdModule } from './modules/passwd/passwd.module';

@Module({
  imports: [ConfigModule, RoleModule, AuthModule, DatabaseModule, UsuarioModule, VpnModule, PasswdModule]
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configServices: ConfigService) {
    AppModule.port = this._configServices.get(Configuration.PORT)
  }

}
