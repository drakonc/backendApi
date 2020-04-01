import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleMigracion1585758301121 implements MigrationInterface {
    name = 'RoleMigracion1585758301121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(25) NOT NULL, `description` text NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'Activo', `create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_648e3f5447f725579d7d4ffdfb` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_648e3f5447f725579d7d4ffdfb` ON `roles`", undefined);
        await queryRunner.query("DROP TABLE `roles`", undefined);
    }

}
