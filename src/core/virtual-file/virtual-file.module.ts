import { Module } from '@nestjs/common';
import { VirtualFileController } from './infrastructure/controllers/virtual-file.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [VirtualFileController],
})
export class VirtualFileModule {}
