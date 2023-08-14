/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable("empresa").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("empresa", function(table){
                table.increments("empresa_id").primary()
                table.string("nom_empresa").notNullable()
                table.decimal('total_pago', 10, 2);

                
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.hasColumn("empresa").then(function(exists){
        if(exists){
            return knex.schema.dropTable("empresa")
        }   
    })
};
