import { pool } from "../config/database.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const getUser = async (req, res, next) => {
    const user = await pool.query('SELECT * FROM users');

    return res.status(200).json({code : 200, message : user});

}

export const singInUser = async (req, res, next) => {
    const {nombre, email, password} = req.body

    //Encriptar el password
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);

    if(nombre && email && password){
        const user = await pool.query(`INSERT INTO users (nombre, email, password) VALUES ('${nombre}', '${email}', '${passwordEncriptado}')`);

        if(user.affectedRows == 1){
            return res.status(201).json({code : 201, message : "Usuario guardado correctamente"})
        }
        
        return res.status(500).json({code : 500, message : "Ocurrio un error"})

    }else{
        return res.status(400).json({code : 400, message : "Son necesarios todos los campos"});
    }

}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ code: 400, message: "Campos incompletos" });
        }

        const query = 'SELECT * FROM users WHERE email = ?';
        const rows = await pool.query(query, [email]);

        if (rows.length == 0) {
            return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
        }

        const validPassword = await bcrypt.compare(password, rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
        }

        const token = jwt.sign({
            user_id: rows[0].user_id,
            user_mail: rows[0].email
        }, "debugkey");

        return res.status(200).json({ code: 200, message: token });
    } catch (error) {
        return next(error);
    }
};

