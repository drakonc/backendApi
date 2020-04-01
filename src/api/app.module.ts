import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { Configuration } from './config/config.key';
import { ConfigService } from './config/config.service';
import { RoleModule } from './content/role/role.module';
import { AuthModule } from './content/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsuarioModule } from './content/usuario/usuario.module';

@Module({
  imports: [ConfigModule, RoleModule, AuthModule, DatabaseModule, UsuarioModule]
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configServices: ConfigService) {
    AppModule.port = this._configServices.get(Configuration.PORT)
  }

}
