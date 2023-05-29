import express from 'express';
const inmueble = express.Router();
import { getInmueble, getInmuebleByLocation, getInmuebleByType, getInmueblesByPriceRange, getInmuebleByAllFilters,  postInmueble} from "../controllers/inmueble.controller.js";

inmueble.get('/', getInmueble);
inmueble.get('/ubicacion/:ubicacion([A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ_&%?]+)', getInmuebleByLocation);
inmueble.get('/tipo/:tipo([A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ_&%?]+)', getInmuebleByType);
inmueble.get('/filter/', getInmuebleByAllFilters)
inmueble.get('/rango/', getInmueblesByPriceRange)
inmueble.post('/', postInmueble);

export default inmueble