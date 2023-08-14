    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.up = function (knex) {
        return knex.schema.hasTable("habilidades").then(function (exists) {
            if (!exists) {
                return knex.schema.createTable("habilidades", function(table){
                    table.increments("habilidad_id").primary()
                    table.string("nom_habilidad").notNullable()
                

                    
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
