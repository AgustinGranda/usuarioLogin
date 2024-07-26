import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RolService {


  constructor(@InjectRepository(Rol)
  private readonly rolRepository : Repository<Rol>){}


  create(createRolDto: CreateRolDto, usuario) {
    this.validate(usuario.rol)
    this.rolRepository.save(createRolDto);
    return createRolDto;
  }

  findAll() {
    return this.rolRepository.find();
  }

  findOne(id: string) {
    try {

      return this.rolRepository.findOne({where: {id:id}})
      
    } catch (error) {
      throw new BadRequestException()
    }
  }

  update(id: string, updateRolDto: UpdateRolDto, usuario) {
    this.validate(usuario.rol)
    try {
      this.rolRepository.update({id:id} , updateRolDto)
      return updateRolDto;
      
    } catch (error) {
      throw new BadRequestException()
    }
  }

  remove(id: string, usuario) {
    this.validate(usuario.rol)
    try {
      this.rolRepository.softDelete(id)
    } catch (error) {
      throw new BadRequestException()
    }
    
  }
  validate(rol: string){
    if(rol != 'admin')
      throw new UnauthorizedException();
  }
}
