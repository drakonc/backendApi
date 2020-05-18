import { Module } from '@nestjs/common';
import { PasswdController } from './passwd.controller';
import { PasswdService } from './passwd.service';

@Module({
  controllers: [PasswdController],
  providers: [PasswdService]
})
export class PasswdModule {}
