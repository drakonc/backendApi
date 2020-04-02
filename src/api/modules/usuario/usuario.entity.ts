import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { StatusType } from '../../shared/Utils/status.type.enum'
import { Role } from '../role/role.entity';

@Entity('usuarios')
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    apellido: string;

    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    correo: string;

    @ManyToOne(type => Role, role => role.users)
    role: Role;

    @Column({ type: 'varchar', default: StatusType.ACTIVO, length: 8 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date;

}