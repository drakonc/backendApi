import {MigrationInterface, QueryRunner} from "typeorm";

export class migrar1589805081209 implements MigrationInterface {
    name = 'migrar1589805081209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `vpns` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(25) NOT NULL, `password` varchar(30) NOT NULL, `grupos` varchar(250) NOT NULL, `username` varchar(25) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'Activo', `create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_531371e490ca111bddfc3001d6` (`nombre`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `passwds` CHANGE `descripcion` `descripcion` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` DROP FOREIGN KEY `FK_103ef6f6e21ebd7a1559716248c`", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` DROP COLUMN `password`", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` ADD `password` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `roleId` `roleId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` ADD CONSTRAINT `FK_103ef6f6e21ebd7a1559716248c` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuarios` DROP FOREIGN KEY `FK_103ef6f6e21ebd7a1559716248c`", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `roleId` `roleId` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` DROP COLUMN `password`", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` ADD `password` text NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` ADD CONSTRAINT `FK_103ef6f6e21ebd7a1559716248c` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `passwds` CHANGE `descripcion` `descripcion` text NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("DROP INDEX `IDX_531371e490ca111bddfc3001d6` ON `vpns`", undefined);
        await queryRunner.query("DROP TABLE `vpns`", undefined);
    }

}
