import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { StatusType } from "../../shared/Utils/status.type.enum";

@Entity('vpns')
export class Vpn extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 30, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 250, nullable: false })
    grupos: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    username: string;

    @Column({ type: 'varchar', default: StatusType.ACTIVO, length: 8 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date

}
