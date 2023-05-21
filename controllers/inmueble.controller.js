import {pool} from '../config/database.js';

export const getInmueble = async (req, res, next) => {
    const inm = await pool.query('SELECT * FROM inmuebles');
    return res.status(200).json({code : 1, message : inm})
}

export const postInmueble = async (req, res, next) => {
    const {nombre, tipo, precio, cantCuartos, cantBaños, empresaConstructora, descripcion, ubicacion, url_imagen, estado, encargado} = req.body;

    if(nombre && tipo && precio && cantCuartos && cantBaños & empresaConstructora && descripcion && ubicacion && url_imagen && estado && encargado){
        let query = `INSERT INTO inmuebles VALUES (${nombre}, ${tipo}, ${precio}, ${cantCuartos}, ${cantBaños}, ${empresaConstructora}, ${descripcion}, ${ubicacion}, ${url_imagen}, ${estado}, ${encargado});`

        const rows = await pool.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({code : 200, message : 'Inmueble guardado correctamente :3'});
        }
        return res.status(500).json({code : 500, message : 'Ocurrio un error'});
    }
    return res.status(500).json({code : 500, message : 'Campos incompletos'});
}
