import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
 
  constructor(@InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ){}

  async login(loginDto){
    const user = await this.usuarioRepository.findOne({where:{email: loginDto.email}})
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    
    if(!isMatch){
      throw new UnauthorizedException()
    }

    
    const payload = {id:user.id ,nombre: user.nombre };
    const token = this.jwtService.sign(payload, {secret:'secreto-muy-secreto'});

    return {token: token}

  }
  
}
