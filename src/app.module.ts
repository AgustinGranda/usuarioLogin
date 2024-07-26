import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORM } from './common/config/config.data';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORM()) , UsuarioModule, RolModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
