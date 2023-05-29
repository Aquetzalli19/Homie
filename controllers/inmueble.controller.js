import {pool} from '../config/database.js';

export const getInmueble = async (req, res, next) => {
    const inm = await pool.query('SELECT * FROM inmuebles');
    return res.status(200).json({code : 1, message : inm})
}

export const getInmuebleByLocation = async (req, res, next) => {
    let ubicacion = req.params.ubicacion;


    if(ubicacion){
        ubicacion.toLowerCase();
        ubicacion.replace("_", " ");

        const inm = await pool.query(`SELECT * FROM inmuebles WHERE ubicacion = '${ubicacion}'`);

        if(inm.length > 0){
            return res.status(200).json({code : 200, message : inm});
        }else{
            return res.status(404).json({code : 404, message : "inmueble no encontrado"});
    }
    }else{
        return res.status(400).json({code : 400, message : "Ubicacion no proporcionada"});
    }

}

export const getInmuebleByType = async (req, res, next) => {
    let tipo = req.params.tipo

    if(tipo){
        tipo.toLowerCase();
        tipo.replace("_", " ");

        const inm = await pool.query(`SELECT * FROM inmuebles WHERE tipo = '${tipo}'`);

        if(inm.length > 0){
            return res.status(200).json({code : 200, message : inm });
        }
        else{
            return res.status(404).json({code: 404, message : "Inmueble no encontrado"});
        }
    }else{
        return res.status(404).json({code: 404, message : "Tipo no proporcionado"});
    }
}

export const getInmueblesByPriceRange = async(req, res, next) => {
    let precioMin = req.query.precioMin;
    let precioMax = req.query.precioMax;
    if(precioMin && precioMax){
        const inm = await pool.query('SELECT * FROM inmuebles WHERE precio BETWEEN ? AND ?', [precioMin, precioMax]);

        if(inm.length > 0){
            return res.status(200).json({code : 200, message : inm});
        }else{
            return res.status(404).json({code : 404, message : "Inmueble no encontrado"});
        }

    }else{
        return res.status(400).json({code : 400,  message : "Se requieren ambos precios"})
    }
}

export const getInmuebleByAllFilters = async (req, res, next) => {
    let ubicacion = req.query.ubicacion;
    let tipo = req.query.tipo;
    let precioMin = req.query.precioMin;
    let precioMax = req.query.precioMax;

    tipo.toLowerCase();
    tipo.replace("_", " ");

    ubicacion.toLowerCase();
    ubicacion.replace("_", " ");

    

    if(ubicacion && tipo && precioMin && precioMax){
        const inm = await pool.query(`SELECT * FROM inmuebles WHERE ubicacion = '${ubicacion}' OR tipo = '${tipo}' OR precio BETWEEN ${precioMin} AND ${precioMax}`)

        if(inm.length > 0){
            return res.status(200).json({code : 200, message : inm});
        } else {
            return res.status(404).json({code : 404, message : "No existe ningun inmueble"});
        }

    }else{
        return res.status(400).json({code : 400, message : "Se requieren todos los campos"});
        
    }
}

export const postInmueble = async (req, res, next) => {
    const {nombre, tipo, precio, cantCuartos, cantBaños, empresaConstructora, descripcion, ubicacion, url_imagen, estado, encargado} = req.body;

    if(nombre && tipo && precio && cantCuartos && cantBaños && empresaConstructora && descripcion && ubicacion && url_imagen && estado && encargado){
        let query = `INSERT INTO inmuebles (nombre, tipo, precio, cantCuartos, cantBaños, empresaConstructora, descripcion, ubicacion, url_imagen, estado, encargado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

        const rows = await pool.query(query, [nombre, tipo, precio, cantCuartos, cantBaños, empresaConstructora, descripcion, ubicacion, url_imagen, estado, encargado]);

        if(rows.affectedRows == 1){
            return res.status(201).json({code : 201, message : 'Inmueble guardado correctamente :3'});
        }
        return res.status(500).json({code : 500, message : 'Ocurrio un error'});
    }
    return res.status(500).json({code : 500, message : 'Campos incompletos'});
}

