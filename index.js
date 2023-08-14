var express = require('express');


const connection = require('./knexfile')['development'];
const db = require('knex')(connection);

var app = express();
var port = process.env.PORT || 3001;	

app.use(express.json()),

    app.get('/', (req, res) => {
        res.json({
            saludo: "prueba de conexión"
        })
    })

// hacemos el get de la tabla empleado y la podemos visualizar  en el localhost
app.get('/empleado', (req, res) => {
    db('empleado').then((empleado) => {
        res.json(empleado)
    })
})

// hacemos un get con el id para traer de la  tabla solo la fila con el id que deseamos (ej: http://localhost:3000/tasks/3)
app.get('/empleado/:id', (req, res) => {
    const { id } = req.params
    db('empleado')
        .where({ empleado_id: id })
        .then((empleado) => {
            res.json(empleado)
        })
})

// insertar datos desde el Body en postman
app.post('/empleado', (req, res) => {
    const toCreate = req.body
    db('empleado').insert(toCreate).then((empleado) => {
        res.json(empleado)
    })
})

// modificar un campo en la base de datos desde el body
app.patch('/empleado/:id', (req, res) => {
    const { id } = req.params
    const toEdit = req.body
    db('empleado')
        .where({ empleado_id: id })
        .update(toEdit)
        .then((empleado) => {
            res.json(empleado)
        })
})

//Para borrar
app.delete('/empleado/:id', (req, res) => {
    const { id } = req.params
    db('empleado')
        .where({ empleado_id: id })
        .del()
        .then((empleado) => {
            res.json(empleado)
        })
})

// hacemos el get de la tabla empresa y la podemos visualizar  en el localhost
app.get('/empresa', (req, res) => {
    db('empresa').then((empresa) => {
        res.json(empresa)
    })
})

// hacemos un get con el id para traer de la  tabla solo la fila con el id que deseamos (ej: http://localhost:3000/tasks/3)
app.get('/empresa/:id', (req, res) => {
    const { id } = req.params
    db('empresa')
        .where({ empresa_id: id })
        .then((empresa) => {
            res.json(empresa)
        })
})

// insertar datos desde el Body en postman
app.post('/empresa', (req, res) => {
    const toCreate = req.body
    db('empresa').insert(toCreate).then((empresa) => {
        res.json(empresa)
    })
})

// modificar un campo en la base de datos desde el body
app.patch('/empresa/:id', (req, res) => {
    const { id } = req.params
    const toEdit = req.body
    db('empresa')
        .where({ empresa_id: id })
        .update(toEdit)
        .then((empresa) => {
            res.json(empresa)
        })
})

//Para borrar
app.delete('/empresa/:id', (req, res) => {
    const { id } = req.params
    db('empresa')
        .where({ empresa_id: id })
        .del()
        .then((empresa) => {
            res.json(empresa)
        })
})

// hacemos el get de la tabla habilidades y la podemos visualizar  en el localhost
app.get('/habilidades', (req, res) => {
    db('habilidades').then((habilidades) => {
        res.json(habilidades)
    })
})

// hacemos un get con el id para traer de la  tabla solo la fila con el id que deseamos (ej: http://localhost:3000/tasks/3)
app.get('/habilidades/:id', (req, res) => {
    const { id } = req.params
    db('habilidades')
        .where({ habilidades_id: id })
        .then((habilidades) => {
            res.json(habilidades)
        })
})

// insertar datos desde el Body en postman
app.post('/habilidades', (req, res) => {
    const toCreate = req.body
    db('habilidades').insert(toCreate).then((habilidades) => {
        res.json(habilidades)
    })
})

// modificar un campo en la base de datos desde el body
app.patch('/habilidades/:id', (req, res) => {
    const { id } = req.params
    const toEdit = req.body
    db('habilidades')
        .where({ habilidades_id: id })
        .update(toEdit)
        .then((habilidades) => {
            res.json(habilidades)
        })
})

//Para borrar
app.delete('/habilidades/:id', (req, res) => {
    const { id } = req.params
    db('habilidades')
        .where({ habilidades_id: id })
        .del()
        .then((habilidades) => {
            res.json(habilidades)
        })
})

// Ruta para realizar el match entre habilidades de empleados y empresas
app.post('/match', async (req, res) => {
    const { empresa_id } = req.body; // ID de la empresa que busca empleados
    try {
        const empresaHabilidades = await db('habilidades')
            .join('empresa', 'habilidades.habilidad_id', '=', 'empresa.habilidad_id')
            .where('empresa.empresa_id', '=', empresa_id)
            .select('habilidades.habilidad_id');

        const empleadosMatch = await db('empleado')
            .whereIn('habilidad_id', empresaHabilidades.map(h => h.habilidad_id))
            .select();

        res.json(empleadosMatch);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
});