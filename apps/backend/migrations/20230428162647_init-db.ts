import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("submissions", (table) => {
        table.specificType("id", "CHAR(16)").primary();
        table.jsonb("data");
        table.timestamp("submittedAt").notNullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable();
        table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("submissions");
}
