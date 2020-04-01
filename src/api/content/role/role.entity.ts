import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { StatusType } from '../../shared/Utils/status.type.enum'
import { Usuario } from '../usuario/usuario.entity';

@Entity('roles')
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @OneToMany(type => Usuario, user => user.role, { nullable: false })
    users: Usuario[];

    @Column({ type: 'varchar', default: StatusType.ACTIVO, length: 8 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date;

}