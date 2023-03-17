import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Eventos1678997439681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "eventos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "cliente_id",
                        type: "uuid"
                    },
                    {
                        name: "terceiro_id",
                        type: "uuid"
                    },
                    {
                        name: "veiculo",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_cliente",
                        columnNames: ["cliente_id"],
                        referencedTableName: "clientes",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_terceiro",
                        columnNames: ["terceiro_id"],
                        referencedTableName: "terceiros",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("eventos")
    }

}
