import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('Rol')
export class Rol {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    descripcion:string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;   

    @OneToMany(()=> Usuario, usuario => usuario.rol)
    usuario:Usuario;
}
