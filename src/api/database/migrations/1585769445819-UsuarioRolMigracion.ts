import {MigrationInterface, QueryRunner} from "typeorm";

export class UsuarioRolMigracion1585769445819 implements MigrationInterface {
    name = 'UsuarioRolMigracion1585769445819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `usuarios` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(25) NOT NULL, `apellido` varchar(25) NOT NULL, `username` varchar(25) NOT NULL, `password` text NOT NULL, `correo` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'Activo', `create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `roleId` int NULL, UNIQUE INDEX `IDX_9f78cfde576fc28f279e2b7a9c` (`username`), UNIQUE INDEX `IDX_63665765c1a778a770c9bd585d` (`correo`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` ADD CONSTRAINT `FK_103ef6f6e21ebd7a1559716248c` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuarios` DROP FOREIGN KEY `FK_103ef6f6e21ebd7a1559716248c`", undefined);
        await queryRunner.query("DROP INDEX `IDX_63665765c1a778a770c9bd585d` ON `usuarios`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9f78cfde576fc28f279e2b7a9c` ON `usuarios`", undefined);
        await queryRunner.query("DROP TABLE `usuarios`", undefined);
    }

}
