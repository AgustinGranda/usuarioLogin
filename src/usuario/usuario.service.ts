import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ){}


  async create(createUsuarioDto: CreateUsuarioDto, usuario) {

    this.validate(usuario.iat)

    const userExist = await this.usuarioRepository.findOne({where:{email:createUsuarioDto.email}})
    
    if(!userExist){
      createUsuarioDto.password = await bcrypt.hash(createUsuarioDto.password, 10);
      this.usuarioRepository.save(createUsuarioDto)
      return createUsuarioDto;
    } 
    throw new BadRequestException()
  }

  findAll() {
    
    return this.usuarioRepository.find()
  }

  findOne(id: string) {
   try {
    return this.usuarioRepository.findOne({where : {id:id}})
   } catch (error) {
      throw new BadRequestException()
   }
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto, usuario) {
    
    this.validate(usuario.rol)
    try {
        this.usuarioRepository.update({id:id}, updateUsuarioDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  remove(id: string, usuario) {
    this.validate(usuario.rol)
    try {
      this.usuarioRepository.softDelete(id)
      return(`usuario ${id} eliminado`)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  validate(rol: number){
    if(rol != 1722015570)
      throw new UnauthorizedException();
  }
}
