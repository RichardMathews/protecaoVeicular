import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Terceiros1678976688808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "terceiros",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "nome",
                        type: "varchar"
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "cliente_id",
                        type: "uuid"
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
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("terceiros")
    }

}
