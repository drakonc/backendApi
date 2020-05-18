import {MigrationInterface, QueryRunner} from "typeorm";

export class PasswdMigracion1589783824268 implements MigrationInterface {
    name = 'PasswdMigracion1589783824268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `passwds` (`id` int NOT NULL AUTO_INCREMENT, `server` varchar(50) NOT NULL, `usuario` varchar(25) NOT NULL, `password` varchar(25) NOT NULL, `descripcion` text NULL, `username` varchar(25) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'Activo', `create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` DROP FOREIGN KEY `FK_103ef6f6e21ebd7a1559716248c`", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `roleId` `roleId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` ADD CONSTRAINT `FK_103ef6f6e21ebd7a1559716248c` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuarios` DROP FOREIGN KEY `FK_103ef6f6e21ebd7a1559716248c`", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `roleId` `roleId` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` ADD CONSTRAINT `FK_103ef6f6e21ebd7a1559716248c` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("DROP TABLE `passwds`", undefined);
    }

}
