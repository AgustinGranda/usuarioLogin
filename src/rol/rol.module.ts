import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret:'secreto-muy-secreto'
  }),TypeOrmModule.forFeature([Rol]), AuthModule],
  controllers: [RolController],
  providers: [RolService],
})
export class RolModule {}
