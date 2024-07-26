import {IsEmail, IsString, IsUUID } from "class-validator";
import { Rol } from "src/rol/entities/rol.entity";

export class CreateUsuarioDto {

    @IsString()
    nombre:string;

    @IsEmail()
    email:string;

    @IsString()
    password: string;

    @IsUUID()
    rol: Rol;
}
