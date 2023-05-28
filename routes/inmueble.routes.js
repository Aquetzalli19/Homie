import express from 'express';
const inmueble = express.Router();
import { getInmueble, getInmuebleByLocation, postInmueble} from "../controllers/inmueble.controller.js";

inmueble.get('/', getInmueble);
inmueble.get('/:ubicacion([A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ_&%?]+)', getInmuebleByLocation);
inmueble.post('/', postInmueble);

export default inmueble