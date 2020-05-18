import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { StatusType } from "../../shared/Utils/status.type.enum";

@Entity('passwds')
export class Passwd extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    server: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    usuario: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    password: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    username: string;

    @Column({ type: 'varchar', default: StatusType.ACTIVO, length: 8 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date
}

