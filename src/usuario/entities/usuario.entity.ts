import { Rol } from "src/rol/entities/rol.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Usuario')
export class Usuario {


    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    nombre:string;

    @Column('text')
    email:string;

    @Column('text')
    password:string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(()=> Rol ,rol => rol.usuario)
    rol: Rol;

}
