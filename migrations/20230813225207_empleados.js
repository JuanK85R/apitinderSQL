/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable("empleado").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("empleado", function(table){
                table.increments("empleado_id").primary()
                table.string("nom_empleado").notNullable()
                table.string("telefono").notNullable()
                table.string("email").notNullable()
                table.specificType('habilidades', 'text[]').defaultTo('{}');
                table.integer("habilidad_id").references("habilidades.habilidad_id");
                table.decimal('precio_hora', 10, 2).notNullable();
                

                
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.hasColumn("empleado").then(function(exists){
        if(exists){
            return knex.schema.dropTable("empleado")
        }   
    })
};
