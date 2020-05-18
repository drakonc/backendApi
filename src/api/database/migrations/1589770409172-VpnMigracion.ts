import {MigrationInterface, QueryRunner} from "typeorm";

export class VpnMigracion1589770409172 implements MigrationInterface {
    name = 'VpnMigracion1589770409172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuarios` DROP FOREIGN KEY `FK_103ef6f6e21ebd7a1559716248c`", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `roleId` `roleId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` ADD CONSTRAINT `FK_103ef6f6e21ebd7a1559716248c` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuarios` DROP FOREIGN KEY `FK_103ef6f6e21ebd7a1559716248c`", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `roleId` `roleId` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `usuarios` ADD CONSTRAINT `FK_103ef6f6e21ebd7a1559716248c` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
